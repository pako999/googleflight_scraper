require('dotenv').config();
const { chromium } = require('playwright-core');

/**
 * Scrapes Google Flights for flight information
 * @param {string} origin - Origin airport code or city name
 * @param {string} destination - Destination airport code or city name
 * @param {string} date - Departure date in YYYY-MM-DD format
 * @param {boolean} extractBookingUrls - Whether to extract booking provider URLs (slower but includes deep links)
 * @returns {Promise<Object>} Flight results in JSON format
 */
async function scrapeGoogleFlights(origin, destination, date, extractBookingUrls = false) {
  const browserlessKey = process.env.BROWSERLESS_KEY;

  if (!browserlessKey) {
    throw new Error('BROWSERLESS_KEY environment variable is not set');
  }

  const wsEndpoint = `wss://chrome.browserless.io?token=${browserlessKey}`;

  let browser;

  try {
    console.log('Connecting to remote browser...');
    browser = await chromium.connectOverCDP(wsEndpoint);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();

    console.log('Navigating to Google Flights...');
    await page.goto('https://www.google.com/travel/flights', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Handle cookie consent popup if it appears
    try {
      console.log('Checking for cookie consent...');
      const acceptButton = page.locator('button:has-text("Accept all"), button:has-text("I agree"), button:has-text("Agree")').first();
      if (await acceptButton.isVisible({ timeout: 5000 })) {
        console.log('Accepting cookies...');
        await acceptButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('No cookie consent found or already accepted');
    }

    console.log('Entering flight details...');

    // Click on origin input
    const originInput = page.locator('input[placeholder*="Where from"]').first();
    await originInput.click();
    await page.waitForTimeout(500);
    await originInput.fill(origin);
    await page.waitForTimeout(1000);

    // Select first suggestion
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Click on destination input
    const destinationInput = page.locator('input[placeholder*="Where to"]').first();
    await destinationInput.click();
    await page.waitForTimeout(500);
    await destinationInput.fill(destination);
    await page.waitForTimeout(1000);

    // Select first suggestion
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Click on date input
    const dateInput = page.locator('input[placeholder*="Departure"]').first();
    await dateInput.click();
    await page.waitForTimeout(1000);

    // Convert date format and select the date
    const [year, month, day] = date.split('-');
    const dateStr = `${parseInt(month)}/${parseInt(day)}/${year}`;

    // Type the date directly
    await dateInput.fill(dateStr);
    await page.waitForTimeout(500);

    // Click Done button in date picker if visible
    try {
      const doneButton = page.locator('button:has-text("Done")').first();
      if (await doneButton.isVisible({ timeout: 2000 })) {
        await doneButton.click();
      }
    } catch (e) {
      console.log('Done button not found, continuing...');
    }

    await page.waitForTimeout(1000);

    // Click Search/Explore button
    console.log('Searching for flights...');
    const searchButton = page.locator('button:has-text("Search"), button:has-text("Explore")').first();
    await searchButton.click();

    // Wait for flight results to load
    console.log('Waiting for flight results...');
    try {
      // Wait for the results container with longer timeout
      await page.waitForSelector('[jsname="IWWDBc"]', { timeout: 60000 });

      // Additional wait for results to fully render
      await page.waitForTimeout(5000);

      console.log('Flight results loaded successfully');
    } catch (error) {
      console.log('Timeout waiting for results. Checking if any flights are visible...');
      // Continue anyway - might have some results
    }

    console.log('Scraping flight data...');

    // Scrape flight results
    const flights = await page.evaluate(() => {
      const results = [];

      // Helper function to extract numeric price
      function extractPriceValue(priceStr) {
        if (!priceStr) return null;
        const match = priceStr.match(/[\d,]+\.?\d*/);
        if (match) {
          return parseFloat(match[0].replace(/,/g, ''));
        }
        return null;
      }

      // Flight list containers
      const flightElements = document.querySelectorAll('[jsname="IWWDBc"]');

      flightElements.forEach((flightEl, index) => {
        if (index >= 10) return; // Limit to first 10 results

        try {
          // Airline name
          let airline = '';
          const airlineEl = flightEl.querySelector('[jsname="zRe5xc"]');
          if (airlineEl) {
            airline = airlineEl.textContent.trim();
          }

          // Flight duration
          let duration = '';
          const durationEl = flightEl.querySelector('[aria-label*="Total duration"]');
          if (durationEl) {
            const match = durationEl.getAttribute('aria-label').match(/Total duration (\d+ hr(?: \d+ min)?)/);
            if (match) {
              duration = match[1];
            }
          }

          // Price
          let price = '';
          let priceValue = null;
          const priceEl = flightEl.querySelector('[jsname="qCDwBb"]');
          if (priceEl) {
            price = priceEl.textContent.trim();
            priceValue = extractPriceValue(price);
          }

          // Flight type (Non-stop, 1 stop, etc.)
          let type = '';
          const typeEl = flightEl.querySelector('[jsname="OgQvJf"]');
          if (typeEl) {
            const text = typeEl.textContent.trim();
            if (text.includes('Nonstop')) {
              type = 'Non-stop';
            } else if (text.includes('1 stop')) {
              type = '1 stop';
            } else if (text.includes('2+ stops')) {
              type = '2+ stops';
            } else {
              type = text;
            }
          }

          // Only add if we have meaningful data
          if (airline || duration || price) {
            results.push({
              airline,
              duration,
              price,
              priceValue,
              type
            });
          }
        } catch (err) {
          console.error('Error parsing flight:', err);
        }
      });

      return results;
    });

    console.log(`Found ${flights.length} flights`);

    // Extract booking URLs if requested
    if (extractBookingUrls && flights.length > 0) {
      console.log('Extracting booking URLs...');

      for (let i = 0; i < Math.min(flights.length, 5); i++) {  // Limit to first 5 flights
        try {
          // Click on the flight to open booking options
          const flightElements = await page.$$('[jsname="IWWDBc"]');
          if (flightElements[i]) {
            await flightElements[i].click();
            await page.waitForTimeout(2000); // Wait for booking modal to load

            // Extract booking providers
            const bookingOptions = await page.evaluate(() => {
              const options = [];

              // Look for booking provider links (varies by UI)
              const providerElements = document.querySelectorAll('a[href*="book"], a[jsname], [role="link"]');

              providerElements.forEach(el => {
                const href = el.getAttribute('href');
                const text = el.textContent.trim();

                // Filter for actual booking links
                if (href && (href.includes('http') || href.startsWith('/url?'))) {
                  // Extract price from provider option if available
                  const priceMatch = text.match(/\$[\d,]+/);

                  // Try to identify the provider name
                  let provider = 'Unknown';
                  if (text.includes('Expedia')) provider = 'Expedia';
                  else if (text.includes('Priceline')) provider = 'Priceline';
                  else if (text.includes('Booking.com')) provider = 'Booking.com';
                  else if (text.includes('Kayak')) provider = 'Kayak';
                  else if (text.toLowerCase().includes('airline')) provider = 'Airline Direct';
                  else if (text.length > 0 && text.length < 30) provider = text;

                  if (provider !== 'Unknown' || priceMatch) {
                    options.push({
                      provider,
                      url: href.startsWith('/url?')
                        ? 'https://www.google.com' + href
                        : href,
                      price: priceMatch ? priceMatch[0] : null
                    });
                  }
                }
              });

              return options;
            });

            if (bookingOptions.length > 0) {
              flights[i].bookingOptions = bookingOptions;
              console.log(`  Flight ${i + 1}: Found ${bookingOptions.length} booking options`);
            }

            // Close the modal/go back
            await page.keyboard.press('Escape');
            await page.waitForTimeout(500);
          }
        } catch (err) {
          console.error(`Error extracting booking URLs for flight ${i}:`, err.message);
        }
      }
    }

    await context.close();

    return {
      success: true,
      origin,
      destination,
      date,
      flights,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error scraping flights:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// If run directly (not imported as module)
if (require.main === module) {
  const origin = process.argv[2] || 'New York';
  const destination = process.argv[3] || 'London';
  const date = process.argv[4] || '2026-02-15';

  scrapeGoogleFlights(origin, destination, date)
    .then(results => {
      console.log('\n=== Flight Results ===');
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(error => {
      console.error('Scraping failed:', error.message);
      process.exit(1);
    });
}

module.exports = { scrapeGoogleFlights };
