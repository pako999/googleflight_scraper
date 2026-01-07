// Set default date
const dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 14);
dateInput.value = today.toISOString().split('T')[0];
dateInput.min = new Date().toISOString().split('T')[0];

// Trip Type Toggle
const returnDateGroup = document.getElementById('returnDateGroup');
const returnDateInput = document.getElementById('returnDate');
const tripTypeInputs = document.querySelectorAll('input[name="tripType"]');

tripTypeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        if (e.target.value === 'roundTrip') {
            returnDateGroup.style.display = 'flex';
            returnDateInput.required = true;
            // Set default return date to 7 days after departure
            if (dateInput.value) {
                const depDate = new Date(dateInput.value);
                depDate.setDate(depDate.getDate() + 7);
                returnDateInput.value = depDate.toISOString().split('T')[0];
            }
        } else {
            returnDateGroup.style.display = 'none';
            returnDateInput.required = false;
            returnDateInput.value = '';
        }
    });
});

// Update return date min when departure changes
dateInput.addEventListener('change', () => {
    returnDateInput.min = dateInput.value;
    if (returnDateInput.value && returnDateInput.value < dateInput.value) {
        returnDateInput.value = dateInput.value;
    }
});

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const returnDate = document.getElementById('returnDate').value;
    const tripType = document.querySelector('input[name="tripType"]:checked').value;

    // Validation
    if (tripType === 'roundTrip' && !returnDate) {
        alert('Please select a return date for round trip');
        return;
    }

    // Get passenger info
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const cabinClass = document.getElementById('cabinClass').value;

    // Get filter values
    const maxStops = document.getElementById('maxStops').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const sources = document.getElementById('sources').value;
    const sortBy = document.getElementById('sortBy').value;

    // Show results section with loading
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    try {
        // Build API parameters
        const params = new URLSearchParams({
            origin,
            destination,
            date,
            sources,
            includeBookingUrls: 'true'
        });

        if (tripType === 'roundTrip' && returnDate) {
            params.append('returnDate', returnDate);
        }

        if (maxStops) params.append('maxStops', maxStops);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (sortBy) params.append('sortBy', sortBy);

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

    // Get passenger info for display
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const cabinClass = document.getElementById('cabinClass').value;
    const cabinClassText = cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1);

    // Title with passenger info
    const totalPax = parseInt(adults) + parseInt(children);
    const paxText = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;
    document.getElementById('resultsTitle').textContent = `${origin} → ${destination}`;

    // Summary
    const summary = data.summary || {};
    document.getElementById('resultsSummary').innerHTML = `
        <p><strong>${paxText}</strong> • ${cabinClassText}</p>
        <p><strong>${summary.totalFlights || 0} flights found</strong> • 
        Checked ${summary.sourcesSuccessful || 1} source(s)</p>
        ${summary.cheapestPrice ? `<p>Best price: <strong>$${summary.cheapestPrice}</strong></p>` : ''}
    `;

    // Flights
    const flights = data.allFlights || [];
    const flightCards = document.getElementById('flightCards');

    if (flights.length === 0) {
        let message = '<p style="color:white;text-align:center;">No flights found. Try different dates or routes.</p>';

        // Show debug screenshot if available
        if (data.debugScreenshot) {
            message += `
                <div style="margin-top: 20px; text-align: center;">
                    <p style="color:#ffd700; margin-bottom: 10px;">⚠️ Debug: What the scraper saw:</p>
                    <img src="data:image/png;base64,${data.debugScreenshot}" style="max-width: 100%; border-radius: 8px; border: 2px solid #ffd700;">
                </div>
            `;
        }

        flightCards.innerHTML = message;
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
