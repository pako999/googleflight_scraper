const { scrapeGoogleFlights } = require('../scraper');
const { scrapeKayak } = require('./kayak');
const { scrapeSkyscanner } = require('./skyscanner');

/**
 * Aggregate flight results from multiple sources
 * @param {string} origin - Origin airport code or city
 * @param {string} destination - Destination airport code or city
 * @param {string} date - Departure date in YYYY-MM-DD format
 * @param {Array<string>} sources - Array of sources to scrape: ['google', 'kayak', 'skyscanner']
 * @param {boolean} extractBookingUrls - Whether to extract booking URLs from Google Flights
 * @returns {Promise<Object>} Aggregated results
 */
async function aggregateFlights(origin, destination, date, sources = ['google'], extractBookingUrls = false) {
    console.log(`\n=== Starting Multi-Source Aggregation ===`);
    console.log(`Route: ${origin} → ${destination}`);
    console.log(`Date: ${date}`);
    console.log(`Sources: ${sources.join(', ')}`);
    console.log(`Booking URLs: ${extractBookingUrls ? 'Yes' : 'No'}\n`);

    const results = {
        origin,
        destination,
        date,
        sources: [],
        allFlights: [],
        bestDeals: [],
        summary: {},
        timestamp: new Date().toISOString()
    };

    const scrapers = [];

    // Queue up scrapers based on requested sources
    if (sources.includes('google')) {
        scrapers.push({
            name: 'Google Flights',
            promise: scrapeGoogleFlights(origin, destination, date, extractBookingUrls)
        });
    }

    if (sources.includes('kayak')) {
        scrapers.push({
            name: 'Kayak',
            promise: scrapeKayak(origin, destination, date)
        });
    }

    if (sources.includes('skyscanner')) {
        scrapers.push({
            name: 'Skyscanner',
            promise: scrapeSkyscanner(origin, destination, date)
        });
    }

    // Run all scrapers in parallel
    const scraperResults = await Promise.allSettled(
        scrapers.map(s => s.promise)
    );

    // Process results from each source
    scraperResults.forEach((result, index) => {
        const sourceName = scrapers[index].name;

        if (result.status === 'fulfilled') {
            let flights = [];

            // Handle different response formats
            if (sourceName === 'Google Flights' && result.value.flights) {
                flights = result.value.flights.map(f => ({ ...f, source: 'Google Flights' }));
            } else if (Array.isArray(result.value)) {
                flights = result.value;
            }

            results.sources.push({
                name: sourceName,
                count: flights.length,
                status: 'success'
            });

            results.allFlights.push(...flights);
        } else {
            console.error(`[${sourceName}] Failed:`, result.reason.message);
            results.sources.push({
                name: sourceName,
                count: 0,
                status: 'failed',
                error: result.reason.message
            });
        }
    });

    // De-duplicate and merge similar flights
    results.allFlights = deduplicateFlights(results.allFlights);

    // Find best deals
    results.bestDeals = findBestDeals(results.allFlights);

    // Generate summary
    results.summary = {
        totalFlights: results.allFlights.length,
        sourcesChecked: results.sources.length,
        sourcesSuccessful: results.sources.filter(s => s.status === 'success').length,
        cheapestPrice: results.bestDeals.cheapest?.priceValue || null,
        fastestDuration: results.bestDeals.fastest?.duration || null,
        nonStopAvailable: results.allFlights.some(f => f.type === 'Non-stop')
    };

    console.log(`\n=== Aggregation Complete ===`);
    console.log(`Total flights found: ${results.summary.totalFlights}`);
    console.log(`Cheapest: ${results.bestDeals.cheapest?.price || 'N/A'}`);
    console.log(`=============================\n`);

    return results;
}

/**
 * Remove duplicate flights based on airline, duration, and price
 */
function deduplicateFlights(flights) {
    const seen = new Map();
    const unique = [];

    flights.forEach(flight => {
        // Create a key based on airline, duration, and price
        const key = `${flight.airline}-${flight.duration}-${flight.priceValue}`;

        if (!seen.has(key)) {
            seen.set(key, true);
            unique.push(flight);
        } else {
            // If duplicate, merge booking options if available
            const existing = unique.find(f =>
                f.airline === flight.airline &&
                f.duration === flight.duration &&
                f.priceValue === flight.priceValue
            );

            if (existing && flight.bookingUrl && !existing.bookingUrl) {
                existing.bookingUrl = flight.bookingUrl;
            }

            if (existing && flight.bookingOptions && !existing.bookingOptions) {
                existing.bookingOptions = flight.bookingOptions;
            }
        }
    });

    return unique;
}

/**
 * Find best deals in the flight list
 */
function findBestDeals(flights) {
    if (flights.length === 0) {
        return {
            cheapest: null,
            fastest: null,
            bestValue: null
        };
    }

    // Filter flights with valid price
    const withPrice = flights.filter(f => f.priceValue);

    // Cheapest flight
    const cheapest = withPrice.length > 0
        ? withPrice.reduce((min, f) => f.priceValue < min.priceValue ? f : min)
        : null;

    // Fastest flight (parse duration)
    const fastest = flights.reduce((min, f) => {
        const current = parseDurationToMinutes(f.duration);
        const minDuration = parseDurationToMinutes(min.duration);
        return current < minDuration ? f : min;
    });

    // Best value (cheapest non-stop)
    const nonStopFlights = withPrice.filter(f =>
        f.type === 'Non-stop' || f.type === 'Nonstop'
    );
    const bestValue = nonStopFlights.length > 0
        ? nonStopFlights.reduce((min, f) => f.priceValue < min.priceValue ? f : min)
        : cheapest;

    return {
        cheapest,
        fastest,
        bestValue
    };
}

/**
 * Parse duration string to minutes
 */
function parseDurationToMinutes(duration) {
    if (!duration) return 999999;

    const hourMatch = duration.match(/(\d+)\s*h/i);
    const minMatch = duration.match(/(\d+)\s*m/i);

    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minMatch ? parseInt(minMatch[1]) : 0;

    return hours * 60 + minutes;
}

module.exports = { aggregateFlights };
