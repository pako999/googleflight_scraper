// DOM Elements
const searchForm = document.getElementById('searchForm');
const filterToggle = document.getElementById('filterToggle');
const filtersPanel = document.getElementById('filtersPanel');
const resultsSection = document.getElementById('resultsSection');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const flightResults = document.getElementById('flightResults');
const resultsTitle = document.getElementById('resultsTitle');
const resultsSummary = document.getElementById('resultsSummary');

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 14);
dateInput.value = defaultDate.toISOString().split('T')[0];

// Toggle filters
filterToggle.addEventListener('click', () => {
    const isHidden = filtersPanel.style.display === 'none';
    filtersPanel.style.display = isHidden ? 'block' : 'none';
    filterToggle.querySelector('span').textContent = isHidden ? 'Hide Filters' : 'Advanced Filters';
});

// Handle form submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const origin = formData.get('origin');
    const destination = formData.get('destination');
    const date = formData.get('date');
    const maxStops = formData.get('maxStops');
    const maxPrice = formData.get('maxPrice');
    const sources = formData.get('sources') || 'google';

    // Show loading state
    resultsSection.style.display = 'block';
    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    flightResults.innerHTML = '';

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    try {
        // Build API URL
        const params = new URLSearchParams({
            origin,
            destination,
            date,
            sources,
            includeBookingUrls: 'true'
        });

        if (maxStops) params.append('maxStops', maxStops);
        if (maxPrice) params.append('maxPrice', maxPrice);

        // Call API
        const response = await fetch(`/api/compare?${params}`);
        const data = await response.json();

        loadingState.style.display = 'none';

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to fetch flights');
        }

        // Display results
        displayResults(data, origin, destination, date);

    } catch (error) {
        console.error('Search error:', error);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        errorMessage.textContent = error.message;
    }
});

// Display flight results
function displayResults(data, origin, destination, date) {
    resultsTitle.textContent = `${origin} → ${destination}`;

    // Summary
    const summary = data.summary || {};
    resultsSummary.innerHTML = `
        <div>Found ${summary.totalFlights || 0} flights • 
        Checked ${summary.sourcesSuccessful || 0} source(s)</div>
        ${summary.cheapestPrice ? `<div>Best price: $${summary.cheapestPrice}</div>` : ''}
    `;

    // Display flights
    const flights = data.allFlights || [];

    if (flights.length === 0) {
        flightResults.innerHTML = `
            <div class="error-message">
                <h3>No flights found</h3>
                <p>Try adjusting your search parameters or dates.</p>
            </div>
        `;
        return;
    }

    // Sort by price (cheapest first)
    flights.sort((a, b) => (a.priceValue || 999999) - (b.priceValue || 999999));

    flightResults.innerHTML = flights.map(flight => createFlightCard(flight)).join('');
}

// Create flight card HTML
function createFlightCard(flight) {
    const isNonStop = flight.type === 'Non-stop' || flight.type === 'Nonstop';
    const badgeClass = isNonStop ? 'badge-nonstop' : 'badge-stops';
    const price = flight.price || `$${flight.priceValue || 'N/A'}`;

    // Booking options HTML
    let bookingHTML = '';

    if (flight.bookingOptions && flight.bookingOptions.length > 0) {
        const bookingLinks = flight.bookingOptions
            .map(opt => `
                <a href="${opt.url}" target="_blank" rel="noopener noreferrer" class="booking-link">
                    <span>${opt.provider}</span>
                    <span>${opt.price || 'View'} →</span>
                </a>
            `)
            .join('');

        bookingHTML = `
            <div class="booking-options">
                <h4>Book with:</h4>
                <div class="booking-links">
                    ${bookingLinks}
                </div>
            </div>
        `;
    } else if (flight.bookingUrl) {
        bookingHTML = `
            <a href="${flight.bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn-book">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
                Book Now
            </a>
        `;
    }

    return `
        <div class="flight-card">
            <div class="flight-header">
                <div>
                    <div class="flight-airline">${flight.airline || 'Unknown Airline'}</div>
                    <div class="flight-source">via ${flight.source || 'Google Flights'}</div>
                </div>
                <div class="flight-price">${price}</div>
            </div>
            
            <span class="flight-badge ${badgeClass}">${flight.type || 'Unknown'}</span>
            
            <div class="flight-details">
                ${flight.duration ? `
                    <div class="flight-detail">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        ${flight.duration}
                    </div>
                ` : ''}
            </div>
            
            ${bookingHTML}
        </div>
    `;
}

// Track analytics (optional)
function trackBookingClick(provider, price) {
    console.log('Booking click:', provider, price);
    // Add analytics tracking here if needed
}
