const { chromium } = require('playwright-core');

/**
 * Scrape Skyscanner for flight information
 * @param {string} origin - Origin airport code or city
 * @param {string} destination - Destination airport code or city
 * @param {string} date - Departure date in YYYY-MM-DD format
 * @returns {Promise<Array>} Flight results
 */
async function scrapeSkyscanner(origin, destination, date) {
    const browserlessKey = process.env.BROWSERLESS_KEY;

    if (!browserlessKey) {
        throw new Error('BROWSERLESS_KEY environment variable is not set');
    }

    const wsEndpoint = `wss://chrome.browserless.io?token=${browserlessKey}`;
    let browser;

    try {
        console.log('[Skyscanner] Connecting to remote browser...');
        browser = await chromium.connectOverCDP(wsEndpoint);

        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        const page = await context.newPage();

        // Skyscanner URL format
        const [year, month, day] = date.split('-');
        const skyscannerDate = `${year.slice(2)}${month}${day}`; // Format: YYMMDD
        const skyscannerUrl = `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${skyscannerDate}/`;

        console.log(`[Skyscanner] Navigating to ${skyscannerUrl}...`);
        await page.goto(skyscannerUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // Wait for results
        await page.waitForTimeout(6000); // Skyscanner loads slowly

        console.log('[Skyscanner] Scraping flight data...');

        const flights = await page.evaluate(() => {
            const results = [];

            // Skyscanner flight cards
            const flightCards = document.querySelectorAll('[data-testid="flight-card"], [class*="FlightCard"]');

            flightCards.forEach((card, index) => {
                if (index >= 10) return;

                try {
                    // Extract carrier/airline
                    let airline = '';
                    const airlineEl = card.querySelector('[data-testid="carrier-name"], [class*="LogoImage"]');
                    if (airlineEl) {
                        airline = airlineEl.getAttribute('alt') || airlineEl.textContent.trim();
                    }

                    // Extract duration
                    let duration = '';
                    const durationEl = card.querySelector('[data-testid="duration"], [class*="Duration"]');
                    if (durationEl) {
                        duration = durationEl.textContent.trim();
                    }

                    // Extract price
                    let price = '';
                    let priceValue = null;
                    const priceEl = card.querySelector('[data-testid="price"], [class*="Price"]');
                    if (priceEl) {
                        price = priceEl.textContent.trim();
                        const match = price.match(/[\d,]+/);
                        if (match) {
                            priceValue = parseFloat(match[0].replace(/,/g, ''));
                        }
                    }

                    // Extract stops
                    let type = '';
                    const stopsEl = card.querySelector('[data-testid="stops"], [class*="LegInfo"]');
                    if (stopsEl) {
                        const text = stopsEl.textContent.toLowerCase();
                        if (text.includes('direct') || text.includes('non-stop')) {
                            type = 'Non-stop';
                        } else if (text.includes('1 stop')) {
                            type = '1 stop';
                        } else if (text.includes('2')) {
                            type = '2+ stops';
                        } else {
                            type = stopsEl.textContent.trim();
                        }
                    }

                    // Extract booking URL
                    let bookingUrl = '';
                    const linkEl = card.querySelector('a[href]');
                    if (linkEl) {
                        bookingUrl = linkEl.getAttribute('href');
                        if (bookingUrl && !bookingUrl.startsWith('http')) {
                            bookingUrl = 'https://www.skyscanner.com' + bookingUrl;
                        }
                    }

                    if (airline || price) {
                        results.push({
                            airline,
                            duration,
                            price,
                            priceValue,
                            type,
                            bookingUrl,
                            source: 'Skyscanner'
                        });
                    }
                } catch (err) {
                    console.error('Error parsing Skyscanner flight:', err);
                }
            });

            return results;
        });

        console.log(`[Skyscanner] Found ${flights.length} flights`);

        await context.close();
        return flights;

    } catch (error) {
        console.error('[Skyscanner] Error scraping:', error.message);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = { scrapeSkyscanner };
