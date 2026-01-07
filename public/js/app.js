// Set default date
const dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 14);
dateInput.value = today.toISOString().split('T')[0];
dateInput.min = new Date().toISOString().split('T')[0];

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;

    // Show results section with loading
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    try {
        // Call API
        const params = new URLSearchParams({
            origin,
            destination,
            date,
            sources: 'google',  // Start with just Google for speed
            includeBookingUrls: 'true'
        });

        const response = await fetch(`/api/compare?${params}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Search failed');
        }

        // Display results
        displayResults(data, origin, destination);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('errorMessage').textContent = error.message;
    }
});

function displayResults(data, origin, destination) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Title
    document.getElementById('resultsTitle').textContent = `${origin} → ${destination}`;

    // Summary
    const summary = data.summary || {};
    document.getElementById('resultsSummary').innerHTML = `
        <p><strong>${summary.totalFlights || 0} flights found</strong> • 
        Checked ${summary.sourcesSuccessful || 1} source(s)</p>
        ${summary.cheapestPrice ? `<p>Best price: <strong>$${summary.cheapestPrice}</strong></p>` : ''}
    `;

    // Flights
    const flights = data.allFlights || [];
    const flightCards = document.getElementById('flightCards');

    if (flights.length === 0) {
        flightCards.innerHTML = '<p style="color:white;text-align:center;">No flights found. Try different dates or routes.</p>';
        return;
    }

    // Sort by price
    flights.sort((a, b) => (a.priceValue || 999999) - (b.priceValue || 999999));

    // Create cards
    flightCards.innerHTML = flights.map(flight => createFlightCard(flight)).join('');
}

function createFlightCard(flight) {
    const isNonStop = flight.type === 'Non-stop' || flight.type === 'Nonstop';
    const badgeClass = isNonStop ? 'badge-nonstop' : 'badge-stops';
    const price = flight.price || `$${flight.priceValue || 'N/A'}`;

    // Build booking URL
    let bookingUrl = flight.bookingUrl || '#';
    if (flight.bookingOptions && flight.bookingOptions.length > 0) {
        bookingUrl = flight.bookingOptions[0].url;
    }

    return `
        <div class="flight-card">
            <div class="flight-header">
                <div class="flight-airline">${flight.airline || 'Unknown'}</div>
                <div class="flight-price">${price}</div>
            </div>
            <span class="flight-badge ${badgeClass}">${flight.type || 'Unknown'}</span>
            <div class="flight-details">
                ${flight.duration ? `<span>⏱️ ${flight.duration}</span>` : ''}
                <span>via ${flight.source || 'Google Flights'}</span>
            </div>
            ${bookingUrl !== '#' ? `
                <a href="${bookingUrl}" target="_blank" rel="noopener" class="btn-book">
                    Book Now →
                </a>
            ` : ''}
        </div>
    `;
}
