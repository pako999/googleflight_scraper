require('dotenv').config();
const express = require('express');
const path = require('path');
const { scrapeGoogleFlights } = require('./scraper');
const { applyFilters, sortFlights } = require('./filters');
const { aggregateFlights } = require('./scrapers/aggregator');
const telegram = require('./telegram');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'Google Flights Scraper API',
        status: 'running',
        version: '1.0.0',
        telegram: telegram.isEnabled() ? 'enabled' : 'disabled',
        endpoints: {
            search: '/api/search?origin=NYC&destination=LON&date=2026-02-15',
            searchWithFilters: '/api/search?origin=NYC&destination=LON&date=2026-02-15&maxStops=0&maxPrice=500',
            compare: '/api/compare?origin=NYC&destination=LON&date=2026-02-15&sources=google,kayak',
            monitor: 'POST /api/monitor'
        }
    });
});

// Flight search endpoint with filtering
app.get('/api/search', async (req, res) => {
    try {
        const { origin, destination, date, returnDate, maxStops, maxPrice, minPrice, airlines, excludeAirlines, maxDuration, sortBy, order, includeBookingUrls } = req.query;

        // Validate required parameters
        if (!origin || !destination || !date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide origin, destination, and date as query parameters',
                example: '/api/search?origin=NYC&destination=LON&date=2026-02-15'
            });
        }

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid date format',
                message: 'Date must be in YYYY-MM-DD format',
                example: '2026-02-15'
            });
        }

        // Validate date is in the future
        const searchDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (searchDate < today) {
            return res.status(400).json({
                success: false,
                error: 'Invalid date',
                message: 'Date must be in the future'
            });
        }

        console.log(`Searching flights: ${origin} → ${destination} on ${date}`);

        // Perform scraping
        const extractBookingUrls = includeBookingUrls === 'true';
        const results = await scrapeGoogleFlights(origin, destination, date, returnDate, extractBookingUrls);

        // Apply filters if provided
        const filters = {};
        if (maxStops !== undefined) filters.maxStops = maxStops;
        if (maxPrice !== undefined) filters.maxPrice = maxPrice;
        if (minPrice !== undefined) filters.minPrice = minPrice;
        if (airlines !== undefined) filters.airlines = airlines;
        if (excludeAirlines !== undefined) filters.excludeAirlines = excludeAirlines;
        if (maxDuration !== undefined) filters.maxDuration = maxDuration;

        let filteredFlights = results.flights;

        if (Object.keys(filters).length > 0) {
            filteredFlights = applyFilters(results.flights, filters);
            console.log(`Filtered from ${results.flights.length} to ${filteredFlights.length} flights`);
        }

        // Sort if requested
        if (sortBy) {
            filteredFlights = sortFlights(filteredFlights, sortBy, order || 'asc');
        }

        res.json({
            ...results,
            flights: filteredFlights,
            filtersApplied: Object.keys(filters).length > 0 ? filters : undefined,
            originalCount: results.flights.length,
            filteredCount: filteredFlights.length
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Scraping failed',
            message: error.message
        });
    }
});

// Monitor endpoint for price tracking with Telegram notifications
app.post('/api/monitor', async (req, res) => {
    try {
        const { origin, destination, date, targetPrice, filters, notify } = req.body;

        // Validate required parameters
        if (!origin || !destination || !date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide origin, destination, and date in request body'
            });
        }

        if (!targetPrice) {
            return res.status(400).json({
                success: false,
                error: 'Missing targetPrice',
                message: 'Please provide a target price to monitor for'
            });
        }

        console.log(`Monitoring flights: ${origin} → ${destination} on ${date} with target price $${targetPrice}`);

        // Perform scraping
        const results = await scrapeGoogleFlights(origin, destination, date);

        // Apply filters if provided
        let filteredFlights = results.flights;
        if (filters && Object.keys(filters).length > 0) {
            filteredFlights = applyFilters(results.flights, filters);
        }

        // Find flights below target price
        const cheaperFlights = filteredFlights.filter(flight =>
            flight.priceValue && flight.priceValue <= targetPrice
        );

        let notificationSent = false;

        // Send Telegram notification if cheaper flights found
        if (cheaperFlights.length > 0 && notify !== false) {
            notificationSent = await telegram.notifyCheaperFlights(
                { origin, destination, date },
                cheaperFlights,
                targetPrice
            );
        }

        res.json({
            success: true,
            origin,
            destination,
            date,
            targetPrice,
            totalFlights: results.flights.length,
            filteredFlights: filteredFlights.length,
            cheaperFlights: cheaperFlights.length,
            flights: cheaperFlights,
            notificationSent,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Monitor API Error:', error);

        // Send error notification via Telegram
        await telegram.notifyError(`Monitor failed: ${error.message}`);

        res.status(500).json({
            success: false,
            error: 'Monitoring failed',
            message: error.message
        });
    }
});

// Multi-source comparison endpoint
app.get('/api/compare', async (req, res) => {
    try {
        const { origin, destination, date, sources, includeBookingUrls } = req.query;

        if (!origin || !destination || !date) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide origin, destination, and date'
            });
        }

        // Parse sources (default to google only)
        const sourceList = sources ? sources.split(',') : ['google'];
        const extractBookingUrls = includeBookingUrls === 'true';

        console.log(`Comparing prices from: ${sourceList.join(', ')}`);

        // Aggregate from multiple sources
        const results = await aggregateFlights(
            origin,
            destination,
            date,
            sourceList,
            extractBookingUrls
        );

        res.json({
            success: true,
            ...results
        });

    } catch (error) {
        console.error('Compare API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Comparison failed',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Endpoint not found'
    });
});

module.exports = app;
