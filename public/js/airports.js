// Popular airports data
const airports = [
    { code: 'JFK', name: 'New York JFK', city: 'New York' },
    { code: 'LGA', name: 'New York LaGuardia', city: 'New York' },
    { code: 'EWR', name: 'Newark', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles' },
    { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago' },
    { code: 'MIA', name: 'Miami', city: 'Miami' },
    { code: 'LHR', name: 'London Heathrow', city: 'London' },
    { code: 'LGW', name: 'London Gatwick', city: 'London' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
    { code: 'ORY', name: 'Paris Orly', city: 'Paris' },
    { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
    { code: 'BCN', name: 'Barcelona', city: 'Barcelona' },
    { code: 'MAD', name: 'Madrid', city: 'Madrid' },
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
    { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt' },
    { code: 'MUC', name: 'Munich', city: 'Munich' },
    { code: 'DXB', name: 'Dubai', city: 'Dubai' },
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
    { code: 'HKG', name: 'Hong Kong', city: 'Hong Kong' },
    { code: 'NRT', name: 'Tokyo Narita', city: 'Tokyo' },
    { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo' },
    { code: 'ICN', name: 'Seoul Incheon', city: 'Seoul' },
    { code: 'SYD', name: 'Sydney', city: 'Sydney' },
    { code: 'MEL', name: 'Melbourne', city: 'Melbourne' },
    { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto' },
    { code: 'YVR', name: 'Vancouver', city: 'Vancouver' },
    { code: 'SFO', name: 'San Francisco', city: 'San Francisco' },
    { code: 'SEA', name: 'Seattle', city: 'Seattle' },
    { code: 'BOS', name: 'Boston', city: 'Boston' },
    { code: 'DFW', name: 'Dallas Fort Worth', city: 'Dallas' },
    { code: 'ATL', name: 'Atlanta', city: 'Atlanta' },
    { code: 'DEN', name: 'Denver', city: 'Denver' },
    { code: 'LAS', name: 'Las Vegas', city: 'Las Vegas' },
    { code: 'PHX', name: 'Phoenix', city: 'Phoenix' },
    { code: 'IAH', name: 'Houston', city: 'Houston' },
    { code: 'MCO', name: 'Orlando', city: 'Orlando' },
    { code: 'FLL', name: 'Fort Lauderdale', city: 'Fort Lauderdale' },
    { code: 'BKK', name: 'Bangkok Suvarnabhumi', city: 'Bangkok' },
    { code: 'IST', name: 'Istanbul', city: 'Istanbul' },
    { code: 'DOH', name: 'Doha', city: 'Doha' },
    { code: 'ZRH', name: 'Zurich', city: 'Zurich' },
    { code: 'VIE', name: 'Vienna', city: 'Vienna' },
    { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen' },
    { code: 'OSL', name: 'Oslo', city: 'Oslo' },
    { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm' },
    { code: 'LIS', name: 'Lisbon', city: 'Lisbon' },
    { code: 'DUB', name: 'Dublin', city: 'Dublin' },
    { code: 'MAN', name: 'Manchester', city: 'Manchester' },
    { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh' }
];

// Initialize autocomplete functionality
function initializeAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');

    // Create datalists
    const originDatalist = createDatalist('origin-list', airports);
    const destDatalist = createDatalist('destination-list', airports);

    // Append to body
    document.body.appendChild(originDatalist);
    document.body.appendChild(destDatalist);

    // Link inputs to datalists
    originInput.setAttribute('list', 'origin-list');
    destinationInput.setAttribute('list', 'destination-list');

    // Add autocomplete attributes
    originInput.setAttribute('autocomplete', 'off');
    destinationInput.setAttribute('autocomplete', 'off');
}

function createDatalist(id, airports) {
    const datalist = document.createElement('datalist');
    datalist.id = id;

    airports.forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.code;
        option.textContent = `${airport.code} - ${airport.name}, ${airport.city}`;
        datalist.appendChild(option);
    });

    return datalist;
}

// Call on page load
initializeAutocomplete();
