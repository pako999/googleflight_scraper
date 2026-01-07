require('dotenv').config();

/**
 * Telegram notification service
 */
class TelegramService {
    constructor() {
        this.botToken = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        this.enabled = !!(this.botToken && this.chatId);
    }

    /**
     * Check if Telegram is configured
     * @returns {boolean}
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Send a text message
     * @param {string} message - Message to send
     * @returns {Promise<boolean>} Success status
     */
    async sendMessage(message) {
        if (!this.enabled) {
            console.log('Telegram not configured, skipping notification');
            return false;
        }

        try {
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });

            const data = await response.json();

            if (!data.ok) {
                console.error('Telegram API error:', data);
                return false;
            }

            console.log('Telegram notification sent successfully');
            return true;
        } catch (error) {
            console.error('Error sending Telegram message:', error);
            return false;
        }
    }

    /**
     * Send notification about cheaper flights found
     * @param {Object} searchParams - Search parameters
     * @param {Array} cheaperFlights - Array of flights below target price
     * @param {number} targetPrice - Target price threshold
     * @returns {Promise<boolean>}
     */
    async notifyCheaperFlights(searchParams, cheaperFlights, targetPrice) {
        if (!this.enabled || !cheaperFlights || cheaperFlights.length === 0) {
            return false;
        }

        const { origin, destination, date } = searchParams;

        // Sort by price
        const sorted = [...cheaperFlights].sort((a, b) => a.priceValue - b.priceValue);
        const bestFlight = sorted[0];

        let message = `✈️ <b>Cheaper Flight Found!</b>\n\n`;
        message += `📍 Route: ${origin} → ${destination}\n`;
        message += `📅 Date: ${date}\n`;
        message += `🎯 Target Price: $${targetPrice}\n\n`;
        message += `💰 <b>Best Price: ${bestFlight.price}</b>\n`;
        message += `🏢 Airline: ${bestFlight.airline}\n`;
        message += `⏱ Duration: ${bestFlight.duration}\n`;
        message += `🛫 Type: ${bestFlight.type}\n\n`;

        if (sorted.length > 1) {
            message += `Found ${sorted.length} flights below target price!\n\n`;
            message += `Other options:\n`;
            sorted.slice(1, 4).forEach((flight, idx) => {
                message += `${idx + 2}. ${flight.price} - ${flight.airline} (${flight.type})\n`;
            });
        }

        message += `\n🔗 Search on Google Flights`;

        return await this.sendMessage(message);
    }

    /**
     * Send notification about flight search results
     * @param {Object} searchParams - Search parameters
     * @param {Array} flights - Array of flights
     * @returns {Promise<boolean>}
     */
    async notifySearchResults(searchParams, flights) {
        if (!this.enabled || !flights || flights.length === 0) {
            return false;
        }

        const { origin, destination, date } = searchParams;

        // Get cheapest flight
        const sorted = [...flights]
            .filter(f => f.priceValue)
            .sort((a, b) => a.priceValue - b.priceValue);

        if (sorted.length === 0) {
            return false;
        }

        const cheapest = sorted[0];

        let message = `✈️ <b>Flight Search Results</b>\n\n`;
        message += `📍 Route: ${origin} → ${destination}\n`;
        message += `📅 Date: ${date}\n`;
        message += `📊 Found ${flights.length} flights\n\n`;
        message += `💰 <b>Cheapest: ${cheapest.price}</b>\n`;
        message += `🏢 ${cheapest.airline}\n`;
        message += `⏱ ${cheapest.duration}\n`;
        message += `🛫 ${cheapest.type}`;

        return await this.sendMessage(message);
    }

    /**
     * Send error notification
     * @param {string} errorMessage - Error message
     * @returns {Promise<boolean>}
     */
    async notifyError(errorMessage) {
        if (!this.enabled) {
            return false;
        }

        const message = `❌ <b>Flight Scraper Error</b>\n\n${errorMessage}`;
        return await this.sendMessage(message);
    }
}

module.exports = new TelegramService();
