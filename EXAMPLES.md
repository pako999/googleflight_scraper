# Example Usage

This file demonstrates how to use the Google Flights Scraper API with various filtering options and Telegram notifications.

## Basic Search

```bash
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15"
```

## Search with Filters

### Non-stop flights only
```bash
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&maxStops=0"
```

### Price filtering
```bash
# Maximum price $500
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&maxPrice=500"

# Price range $300-$500
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&minPrice=300&maxPrice=500"
```

### Airline filtering
```bash
# Specific airlines only
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&airlines=British%20Airways,American%20Airlines"

# Exclude specific airlines
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&excludeAirlines=Spirit,Frontier"
```

### Duration filtering
```bash
# Maximum 8 hours
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&maxDuration=8"
```

### Combined filters
```bash
# Non-stop, under $500, maximum 8 hours, sorted by price
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&maxStops=0&maxPrice=500&maxDuration=8&sortBy=price&order=asc"
```

## Price Monitoring with Telegram

### Monitor for cheaper flights
```bash
curl -X POST "http://localhost:3000/api/monitor" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "NYC",
    "destination": "LON",
    "date": "2026-02-15",
    "targetPrice": 400
  }'
```

### Monitor with filters
```bash
curl -X POST "http://localhost:3000/api/monitor" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "NYC",
    "destination": "LON",
    "date": "2026-02-15",
    "targetPrice": 400,
    "filters": {
      "maxStops": 0,
      "airlines": ["British Airways", "American Airlines"]
    }
  }'
```

### Monitor without sending notification
```bash
curl -X POST "http://localhost:3000/api/monitor" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "NYC",
    "destination": "LON",
    "date": "2026-02-15",
    "targetPrice": 400,
    "notify": false
  }'
```

## Direct Script Usage

```bash
# Basic usage
node src/scraper.js "New York" "London" "2026-02-15"

# Different routes
node src/scraper.js "LAX" "Tokyo" "2026-03-01"
node src/scraper.js "Miami" "Paris" "2026-04-15"
```

## Response Examples

### Successful Search
```json
{
  "success": true,
  "origin": "NYC",
  "destination": "LON",
  "date": "2026-02-15",
  "flights": [
    {
      "airline": "British Airways",
      "duration": "7 hr 30 min",
      "price": "$450",
      "priceValue": 450,
      "type": "Non-stop"
    },
    {
      "airline": "American Airlines",
      "duration": "8 hr 15 min",
      "price": "$425",
      "priceValue": 425,
      "type": "Non-stop"
    }
  ],
  "filtersApplied": {
    "maxStops": 0,
    "maxPrice": 500
  },
  "originalCount": 15,
  "filteredCount": 2,
  "timestamp": "2026-01-07T20:44:09.123Z"
}
```

### Monitor Response with Cheaper Flights
```json
{
  "success": true,
  "origin": "NYC",
  "destination": "LON",
  "date": "2026-02-15",
  "targetPrice": 400,
  "totalFlights": 15,
  "filteredFlights": 10,
  "cheaperFlights": 2,
  "flights": [
    {
      "airline": "Norwegian Air",
      "duration": "7 hr 45 min",
      "price": "$380",
      "priceValue": 380,
      "type": "Non-stop"
    }
  ],
  "notificationSent": true,
  "timestamp": "2026-01-07T20:44:09.123Z"
}
```

## Available Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `origin` | string | Origin city or airport code (required) | NYC, New York, JFK |
| `destination` | string | Destination city or airport code (required) | LON, London, LHR |
| `date` | string | Departure date YYYY-MM-DD (required) | 2026-02-15 |
| `maxStops` | number | Maximum number of stops | 0, 1, 2 |
| `maxPrice` | number | Maximum price in USD | 500 |
| `minPrice` | number | Minimum price in USD | 300 |
| `airlines` | string | Comma-separated list of airlines to include | British Airways,American |
| `excludeAirlines` | string | Comma-separated list of airlines to exclude | Spirit,Frontier |
| `maxDuration` | number | Maximum flight duration in hours | 8 |
| `sortBy` | string | Sort field: price, duration, stops | price |
| `order` | string | Sort order: asc or desc | asc |

## Telegram Notification Format

When cheaper flights are found, you'll receive a message like:

```
✈️ Cheaper Flight Found!

📍 Route: NYC → LON
📅 Date: 2026-02-15
🎯 Target Price: $400

💰 Best Price: $380
🏢 Airline: Norwegian Air
⏱ Duration: 7 hr 45 min
🛫 Type: Non-stop

Found 2 flights below target price!

Other options:
2. $395 - British Airways (Non-stop)

🔗 Search on Google Flights
```
