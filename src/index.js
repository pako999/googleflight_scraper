const app = require('./api');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Google Flights Scraper API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/`);
    console.log(`🔍 Search endpoint: http://localhost:${PORT}/api/search?origin=NYC&destination=LON&date=2026-02-15`);
});
