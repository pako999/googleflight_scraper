/**
 * Flight filtering utilities
 */

/**
 * Apply filters to flight results
 * @param {Array} flights - Array of flight objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered flights
 */
function applyFilters(flights, filters = {}) {
    if (!flights || flights.length === 0) {
        return [];
    }

    let filtered = [...flights];

    // Filter by maximum stops
    if (filters.maxStops !== undefined) {
        const maxStops = parseInt(filters.maxStops);
        filtered = filtered.filter(flight => {
            if (flight.type === 'Non-stop' || flight.type === 'Nonstop') {
                return maxStops >= 0;
            }
            if (flight.type === '1 stop') {
                return maxStops >= 1;
            }
            if (flight.type === '2+ stops') {
                return maxStops >= 2;
            }
            return true; // Include if type is unknown
        });
    }

    // Filter by maximum price
    if (filters.maxPrice !== undefined) {
        const maxPrice = parseFloat(filters.maxPrice);
        filtered = filtered.filter(flight => {
            if (flight.priceValue) {
                return flight.priceValue <= maxPrice;
            }
            return true; // Include if price can't be determined
        });
    }

    // Filter by minimum price
    if (filters.minPrice !== undefined) {
        const minPrice = parseFloat(filters.minPrice);
        filtered = filtered.filter(flight => {
            if (flight.priceValue) {
                return flight.priceValue >= minPrice;
            }
            return true;
        });
    }

    // Filter by airlines (case-insensitive partial match)
    if (filters.airlines) {
        const airlineList = Array.isArray(filters.airlines)
            ? filters.airlines
            : filters.airlines.split(',').map(a => a.trim());

        filtered = filtered.filter(flight => {
            if (!flight.airline) return false;
            return airlineList.some(airline =>
                flight.airline.toLowerCase().includes(airline.toLowerCase())
            );
        });
    }

    // Filter by exclude airlines
    if (filters.excludeAirlines) {
        const excludeList = Array.isArray(filters.excludeAirlines)
            ? filters.excludeAirlines
            : filters.excludeAirlines.split(',').map(a => a.trim());

        filtered = filtered.filter(flight => {
            if (!flight.airline) return true;
            return !excludeList.some(airline =>
                flight.airline.toLowerCase().includes(airline.toLowerCase())
            );
        });
    }

    // Filter by maximum duration (in hours)
    if (filters.maxDuration !== undefined) {
        const maxDurationHours = parseFloat(filters.maxDuration);
        filtered = filtered.filter(flight => {
            if (!flight.duration) return true;

            // Parse duration like "7 hr 30 min" to hours
            const hourMatch = flight.duration.match(/(\d+)\s*hr/);
            const minMatch = flight.duration.match(/(\d+)\s*min/);

            const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
            const minutes = minMatch ? parseInt(minMatch[1]) : 0;
            const totalHours = hours + (minutes / 60);

            return totalHours <= maxDurationHours;
        });
    }

    return filtered;
}

/**
 * Sort flights by various criteria
 * @param {Array} flights - Array of flight objects
 * @param {string} sortBy - Sort criteria: 'price', 'duration', 'stops'
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted flights
 */
function sortFlights(flights, sortBy = 'price', order = 'asc') {
    if (!flights || flights.length === 0) {
        return [];
    }

    const sorted = [...flights];

    sorted.sort((a, b) => {
        let compareValue = 0;

        switch (sortBy) {
            case 'price':
                compareValue = (a.priceValue || 0) - (b.priceValue || 0);
                break;

            case 'duration':
                const aDuration = parseDurationToMinutes(a.duration);
                const bDuration = parseDurationToMinutes(b.duration);
                compareValue = aDuration - bDuration;
                break;

            case 'stops':
                const aStops = parseStops(a.type);
                const bStops = parseStops(b.type);
                compareValue = aStops - bStops;
                break;

            default:
                compareValue = 0;
        }

        return order === 'desc' ? -compareValue : compareValue;
    });

    return sorted;
}

/**
 * Parse duration string to total minutes
 * @param {string} duration - Duration like "7 hr 30 min"
 * @returns {number} Total minutes
 */
function parseDurationToMinutes(duration) {
    if (!duration) return 0;

    const hourMatch = duration.match(/(\d+)\s*hr/);
    const minMatch = duration.match(/(\d+)\s*min/);

    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minMatch ? parseInt(minMatch[1]) : 0;

    return hours * 60 + minutes;
}

/**
 * Parse stop type to number
 * @param {string} type - Type like "Non-stop", "1 stop", etc.
 * @returns {number} Number of stops
 */
function parseStops(type) {
    if (!type) return 999;
    if (type.toLowerCase().includes('non-stop') || type.toLowerCase().includes('nonstop')) {
        return 0;
    }
    if (type.includes('1 stop')) {
        return 1;
    }
    if (type.includes('2')) {
        return 2;
    }
    return 999;
}

/**
 * Extract numeric value from price string
 * @param {string} priceStr - Price like "$450" or "450 USD"
 * @returns {number|null} Numeric price value
 */
function extractPriceValue(priceStr) {
    if (!priceStr) return null;

    // Remove currency symbols and extract number
    const match = priceStr.match(/[\d,]+\.?\d*/);
    if (match) {
        return parseFloat(match[0].replace(/,/g, ''));
    }

    return null;
}

module.exports = {
    applyFilters,
    sortFlights,
    extractPriceValue,
    parseDurationToMinutes,
    parseStops
};
