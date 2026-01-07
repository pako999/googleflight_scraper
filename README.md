# Google Flights Scraper 🛫

A lightweight Node.js scraper for Google Flights using Playwright-core and Browserless.io. Features advanced filtering, price monitoring, and Telegram notifications. Deploys easily to free hosting platforms like Render or Railway.

## Features

- ✈️ Scrapes flight data from Google Flights (airline, duration, price, stops)
- 🔍 Advanced filtering (number of stops, airlines, price range, departure times)
- 📱 Telegram notifications for cheaper flights
- 🌐 Uses remote browser via Browserless.io (no local browser needed)
- 🐳 Docker-ready for easy deployment
- 🚀 RESTful API with Express.js
- 💰 Optimized for free tier hosting

## Prerequisites

1. **Browserless.io Account**: Sign up at [browserless.io](https://browserless.io) and get your free API key
2. **Telegram Bot** (optional): Create a bot via [@BotFather](https://t.me/botfather) for notifications
3. **Node.js**: Version 18 or higher

## Installation

### Local Setup

```bash
# Navigate to project directory
cd googleflight_scraper

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API keys
# BROWSERLESS_KEY=your_browserless_key_here
# TELEGRAM_BOT_TOKEN=your_telegram_bot_token (optional)
# TELEGRAM_CHAT_ID=your_telegram_chat_id (optional)
```

## Usage

### Option 1: Direct Script

Run the scraper directly with command-line arguments:

```bash
node src/scraper.js "New York" "London" "2026-02-15"
```

### Option 2: API Server

Start the Express API server:

```bash
npm start
```

Then make HTTP requests:

```bash
# Basic search
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15"

# With filters
curl "http://localhost:3000/api/search?origin=NYC&destination=LON&date=2026-02-15&maxStops=0&maxPrice=500"

# Monitor prices (with Telegram notifications)
curl -X POST "http://localhost:3000/api/monitor" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "NYC",
    "destination": "LON",
    "date": "2026-02-15",
    "targetPrice": 400,
    "filters": {
      "maxStops": 0
    }
  }'
```

**Response format:**
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
    }
  ],
  "timestamp": "2026-01-07T20:44:09.123Z"
}
```

## Deployment

### Deploy to Render

1. **Create account** at [render.com](https://render.com)
2. **Create new Web Service**
   - Connect your GitHub repository
   - Runtime: Docker
   - Branch: main
3. **Add Environment Variables**
   - `BROWSERLESS_KEY`: Your Browserless.io API key
   - `TELEGRAM_BOT_TOKEN`: (optional) Your Telegram bot token
   - `TELEGRAM_CHAT_ID`: (optional) Your Telegram chat ID
4. **Deploy** 🚀

### Deploy to Railway

1. **Create account** at [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Add Environment Variables** (same as above)
4. **Deploy** 🚀

## API Endpoints

### `GET /`
Health check endpoint

### `GET /api/search`
Search for flights with optional filters

**Query Parameters:**
- `origin` (required): Origin airport code or city name
- `destination` (required): Destination airport code or city name
- `date` (required): Departure date in YYYY-MM-DD format
- `maxStops` (optional): Maximum number of stops (0 for non-stop, 1, 2)
- `maxPrice` (optional): Maximum price in USD
- `airlines` (optional): Comma-separated list of preferred airlines

**Example:**
```
/api/search?origin=NYC&destination=LON&date=2026-02-15&maxStops=0&maxPrice=500
```

### `POST /api/monitor`
Monitor flight prices and send Telegram notifications when cheaper flights are found

**Body:**
```json
{
  "origin": "NYC",
  "destination": "LON",
  "date": "2026-02-15",
  "targetPrice": 400,
  "filters": {
    "maxStops": 0,
    "airlines": ["British Airways", "American Airlines"]
  }
}
```

## Telegram Bot Setup

1. **Create a bot**: Message [@BotFather](https://t.me/botfather) on Telegram and use `/newbot`
2. **Get your bot token**: BotFather will provide a token like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
3. **Get your chat ID**: 
   - Start a chat with your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat.id` in the response
4. **Add to .env**:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `BROWSERLESS_KEY` | Your Browserless.io API key | Yes | - |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | No | - |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID for notifications | No | - |
| `PORT` | Port for API server | No | 3000 |

## Filtering Options

The scraper supports several filters to help you find the perfect flight:

- **Max Stops**: Limit results to non-stop (0), direct (1 stop), or any number
- **Max Price**: Set a maximum price threshold
- **Airlines**: Filter by specific airlines
- **Departure/Arrival Times**: (Coming soon)

## Project Structure

```
googleflight_scraper/
├── src/
│   ├── index.js           # Main entry point
│   ├── api.js             # Express API server
│   ├── scraper.js         # Core scraping logic
│   ├── filters.js         # Flight filtering logic
│   └── telegram.js        # Telegram notification service
├── .env.example           # Environment variables template
├── .dockerignore          # Docker ignore rules
├── .gitignore             # Git ignore rules
├── Dockerfile             # Docker configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Troubleshooting

### "BROWSERLESS_KEY environment variable is not set"
Make sure you've created a `.env` file with your Browserless.io API key.

### Scraping times out
- Google Flights can be slow to load. The default timeout is 30 seconds.
- Check your Browserless.io account limits (free tier: 6 hours/month)

### Telegram notifications not working
- Verify your `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are correct
- Make sure you've started a chat with your bot first
- Check the bot has permission to send messages

## Cost Breakdown (Free Tier) 💰

- **Browserless.io**: 6 hours/month free
- **Render or Railway**: Free tier for web services
- **Telegram Bot**: Completely free
- **Total**: $0/month for moderate usage

## License

MIT

---

**Note**: This scraper is for educational purposes. Please review Google's Terms of Service before using in production.