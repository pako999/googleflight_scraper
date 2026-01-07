const { chromium } = require('playwright-core');

/**
 * Scrape Kayak for flight information
 * @param {string} origin - Origin airport code or city
 * @param {string} destination - Destination airport code or city
 * @param {string} date - Departure date in YYYY-MM-DD format
 * @returns {Promise<Array>} Flight results
 */
async function scrapeKayak(origin, destination, date) {
    const browserlessKey = process.env.BROWSERLESS_KEY;

    if (!browserlessKey) {
        throw new Error('BROWSERLESS_KEY environment variable is not set');
    }

    const wsEndpoint = `wss://chrome.browserless.io?token=${browserlessKey}`;
    let browser;

    try {
        console.log('[Kayak] Connecting to remote browser...');
        browser = await chromium.connectOverCDP(wsEndpoint);

        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        const page = await context.newPage();

        // Convert date to Kayak format (YYYY-MM-DD is already correct)
        const kayakUrl = `https://www.kayak.com/flights/${origin}-${destination}/${date}?sort=bestflight_a`;

        console.log(`[Kayak] Navigating to ${kayakUrl}...`);
        await page.goto(kayakUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // Wait for results to load
        await page.waitForTimeout(5000); // Kayak loads dynamically

        console.log('[Kayak] Scraping flight data...');

        // Scrape flights from Kayak
        const flights = await page.evaluate(() => {
            const results = [];

            // Kayak uses specific class names (may need adjustment)
            const flightCards = document.querySelectorAll('[class*="nrc6"]');

            flightCards.forEach((card, index) => {
                if (index >= 10) return; // Limit results

                try {
                    // Extract airline
                    let airline = '';
                    const airlineEl = card.querySelector('[class*="c_cgF"], [class*="airline"]');
                    if (airlineEl) {
                        airline = airlineEl.textContent.trim();
                    }

                    // Extract duration
                    let duration = '';
                    const durationEl = card.querySelector('[class*="vmXl"], [class*="duration"]');
                    if (durationEl) {
                        duration = durationEl.textContent.trim();
                    }

                    // Extract price
                    let price = '';
                    let priceValue = null;
                    const priceEl = card.querySelector('[class*="price"], [class*="f8F1"]');
                    if (priceEl) {
                        price = priceEl.textContent.trim();
                        const match = price.match(/[\d,]+/);
                        if (match) {
                            priceValue = parseFloat(match[0].replace(/,/g, ''));
                        }
                    }

                    // Extract stops
                    let type = '';
                    const stopsEl = card.querySelector('[class*="stops"], [class*="JWEO"]');
                    if (stopsEl) {
                        const text = stopsEl.textContent.trim();
                        if (text.includes('nonstop')) {
                            type = 'Non-stop';
                        } else if (text.includes('1 stop')) {
                            type = '1 stop';
                        } else if (text.includes('2+')) {
                            type = '2+ stops';
                        } else {
                            type = text;
                        }
                    }

                    // Extract booking URL
                    let bookingUrl = '';
                    const linkEl = card.querySelector('a[href]');
                    if (linkEl) {
                        bookingUrl = linkEl.getAttribute('href');
                        if (bookingUrl && !bookingUrl.startsWith('http')) {
                            bookingUrl = 'https://www.kayak.com' + bookingUrl;
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
                            source: 'Kayak'
                        });
                    }
                } catch (err) {
                    console.error('Error parsing Kayak flight:', err);
                }
            });

            return results;
        });

        console.log(`[Kayak] Found ${flights.length} flights`);

        await context.close();
        return flights;

    } catch (error) {
        console.error('[Kayak] Error scraping:', error.message);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = { scrapeKayak };
