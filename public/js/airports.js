// Comprehensive worldwide airports database
const airports = [
    // United States - Major Hubs
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
    { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago' },
    { code: 'DFW', name: 'Dallas Fort Worth', city: 'Dallas' },
    { code: 'DEN', name: 'Denver International', city: 'Denver' },
    { code: 'JFK', name: 'New York JFK', city: 'New York' },
    { code: 'SFO', name: 'San Francisco', city: 'San Francisco' },
    { code: 'LAS', name: 'Las Vegas McCarran', city: 'Las Vegas' },
    { code: 'SEA', name: 'Seattle-Tacoma', city: 'Seattle' },
    { code: 'MCO', name: 'Orlando International', city: 'Orlando' },
    { code: 'EWR', name: 'Newark Liberty', city: 'Newark' },
    { code: 'MIA', name: 'Miami International', city: 'Miami' },
    { code: 'PHX', name: 'Phoenix Sky Harbor', city: 'Phoenix' },
    { code: 'IAH', name: 'Houston George Bush', city: 'Houston' },
    { code: 'BOS', name: 'Boston Logan', city: 'Boston' },
    { code: 'MSP', name: 'Minneapolis-St Paul', city: 'Minneapolis' },
    { code: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit' },
    { code: 'PHL', name: 'Philadelphia', city: 'Philadelphia' },
    { code: 'LGA', name: 'New York LaGuardia', city: 'New York' },
    { code: 'FLL', name: 'Fort Lauderdale', city: 'Fort Lauderdale' },
    { code: 'BWI', name: 'Baltimore/Washington', city: 'Baltimore' },
    { code: 'DCA', name: 'Washington Reagan', city: 'Washington DC' },
    { code: 'IAD', name: 'Washington Dulles', city: 'Washington DC' },
    { code: 'SLC', name: 'Salt Lake City', city: 'Salt Lake City' },
    { code: 'SAN', name: 'San Diego', city: 'San Diego' },
    { code: 'TPA', name: 'Tampa', city: 'Tampa' },
    { code: 'PDX', name: 'Portland', city: 'Portland' },
    { code: 'STL', name: 'St Louis Lambert', city: 'St Louis' },
    { code: 'HNL', name: 'Honolulu', city: 'Honolulu' },
    { code: 'AUS', name: 'Austin-Bergstrom', city: 'Austin' },
    { code: 'BNA', name: 'Nashville', city: 'Nashville' },
    { code: 'OAK', name: 'Oakland', city: 'Oakland' },
    { code: 'SJC', name: 'San Jose', city: 'San Jose' },
    { code: 'MSY', name: 'New Orleans', city: 'New Orleans' },
    { code: 'RDU', name: 'Raleigh-Durham', city: 'Raleigh' },
    { code: 'SNA', name: 'Orange County', city: 'Santa Ana' },

    // Canada
    { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto' },
    { code: 'YVR', name: 'Vancouver International', city: 'Vancouver' },
    { code: 'YUL', name: 'Montreal Trudeau', city: 'Montreal' },
    { code: 'YYC', name: 'Calgary', city: 'Calgary' },
    { code: 'YOW', name: 'Ottawa', city: 'Ottawa' },
    { code: 'YEG', name: 'Edmonton', city: 'Edmonton' },

    // United Kingdom
    { code: 'LHR', name: 'London Heathrow', city: 'London' },
    { code: 'LGW', name: 'London Gatwick', city: 'London' },
    { code: 'LCY', name: 'London City', city: 'London' },
    { code: 'STN', name: 'London Stansted', city: 'London' },
    { code: 'LTN', name: 'London Luton', city: 'London' },
    { code: 'MAN', name: 'Manchester', city: 'Manchester' },
    { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh' },
    { code: 'GLA', name: 'Glasgow', city: 'Glasgow' },
    { code: 'BHX', name: 'Birmingham', city: 'Birmingham' },
    { code: 'NCL', name: 'Newcastle', city: 'Newcastle' },

    // France
    { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
    { code: 'ORY', name: 'Paris Orly', city: 'Paris' },
    { code: 'NCE', name: 'Nice', city: 'Nice' },
    { code: 'LYS', name: 'Lyon', city: 'Lyon' },
    { code: 'MRS', name: 'Marseille', city: 'Marseille' },
    { code: 'TLS', name: 'Toulouse', city: 'Toulouse' },

    // Germany
    { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt' },
    { code: 'MUC', name: 'Munich', city: 'Munich' },
    { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf' },
    { code: 'TXL', name: 'Berlin Tegel', city: 'Berlin' },
    { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin' },
    { code: 'HAM', name: 'Hamburg', city: 'Hamburg' },
    { code: 'CGN', name: 'Cologne', city: 'Cologne' },
    { code: 'STR', name: 'Stuttgart', city: 'Stuttgart' },

    // Spain
    { code: 'MAD', name: 'Madrid Barajas', city: 'Madrid' },
    { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelona' },
    { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma' },
    { code: 'AGP', name: 'Malaga', city: 'Malaga' },
    { code: 'SVQ', name: 'Seville', city: 'Seville' },
    { code: 'VLC', name: 'Valencia', city: 'Valencia' },
    { code: 'ALC', name: 'Alicante', city: 'Alicante' },

    // Italy
    { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome' },
    { code: 'MXP', name: 'Milan Malpensa', city: 'Milan' },
    { code: 'LIN', name: 'Milan Linate', city: 'Milan' },
    { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice' },
    { code: 'NAP', name: 'Naples', city: 'Naples' },
    { code: 'BLQ', name: 'Bologna', city: 'Bologna' },
    { code: 'PSA', name: 'Pisa', city: 'Pisa' },

    // Netherlands
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },

    // Switzerland
    { code: 'ZRH', name: 'Zurich', city: 'Zurich' },
    { code: 'GVA', name: 'Geneva', city: 'Geneva' },
    { code: 'BSL', name: 'Basel', city: 'Basel' },

    // Austria
    { code: 'VIE', name: 'Vienna', city: 'Vienna' },

    // Belgium
    { code: 'BRU', name: 'Brussels', city: 'Brussels' },

    // Portugal
    { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbon' },
    { code: 'OPO', name: 'Porto', city: 'Porto' },
    { code: 'FAO', name: 'Faro', city: 'Faro' },

    // Ireland
    { code: 'DUB', name: 'Dublin', city: 'Dublin' },
    { code: 'SNN', name: 'Shannon', city: 'Shannon' },

    // Scandinavia
    { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen' },
    { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm' },
    { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo' },
    { code: 'HEL', name: 'Helsinki Vantaa', city: 'Helsinki' },
    { code: 'BGO', name: 'Bergen', city: 'Bergen' },
    { code: 'GOT', name: 'Gothenburg', city: 'Gothenburg' },

    // Eastern Europe
    { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw' },
    { code: 'PRG', name: 'Prague', city: 'Prague' },
    { code: 'BUD', name: 'Budapest', city: 'Budapest' },
    { code: 'OTP', name: 'Bucharest', city: 'Bucharest' },
    { code: 'SOF', name: 'Sofia', city: 'Sofia' },
    { code: 'ATH', name: 'Athens', city: 'Athens' },

    // Turkey
    { code: 'IST', name: 'Istanbul', city: 'Istanbul' },
    { code: 'SAW', name: 'Istanbul Sabiha', city: 'Istanbul' },
    { code: 'ESB', name: 'Ankara', city: 'Ankara' },
    { code: 'AYT', name: 'Antalya', city: 'Antalya' },

    // Middle East
    { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
    { code: 'DWC', name: 'Dubai World Central', city: 'Dubai' },
    { code: 'AUH', name: 'Abu Dhabi', city: 'Abu Dhabi' },
    { code: 'DOH', name: 'Doha Hamad', city: 'Doha' },
    { code: 'RUH', name: 'Riyadh', city: 'Riyadh' },
    { code: 'JED', name: 'Jeddah', city: 'Jeddah' },
    { code: 'TLV', name: 'Tel Aviv', city: 'Tel Aviv' },
    { code: 'AMM', name: 'Amman', city: 'Amman' },
    { code: 'CAI', name: 'Cairo', city: 'Cairo' },
    { code: 'BEY', name: 'Beirut', city: 'Beirut' },

    // Asia - East
    { code: 'NRT', name: 'Tokyo Narita', city: 'Tokyo' },
    { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo' },
    { code: 'KIX', name: 'Osaka Kansai', city: 'Osaka' },
    { code: 'NGO', name: 'Nagoya', city: 'Nagoya' },
    { code: 'FUK', name: 'Fukuoka', city: 'Fukuoka' },
    { code: 'ICN', name: 'Seoul Incheon', city: 'Seoul' },
    { code: 'GMP', name: 'Seoul Gimpo', city: 'Seoul' },
    { code: 'PEK', name: 'Beijing Capital', city: 'Beijing' },
    { code: 'PVG', name: 'Shanghai Pudong', city: 'Shanghai' },
    { code: 'SHA', name: 'Shanghai Hongqiao', city: 'Shanghai' },
    { code: 'CAN', name: 'Guangzhou', city: 'Guangzhou' },
    { code: 'HKG', name: 'Hong Kong', city: 'Hong Kong' },
    { code: 'TPE', name: 'Taipei Taoyuan', city: 'Taipei' },
    { code: 'MNL', name: 'Manila', city: 'Manila' },

    // Asia - Southeast
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
    { code: 'BKK', name: 'Bangkok Suvarnabhumi', city: 'Bangkok' },
    { code: 'DMK', name: 'Bangkok Don Mueang', city: 'Bangkok' },
    { code: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur' },
    { code: 'CGK', name: 'Jakarta', city: 'Jakarta' },
    { code: 'DPS', name: 'Bali Denpasar', city: 'Bali' },
    { code: 'HAN', name: 'Hanoi', city: 'Hanoi' },
    { code: 'SGN', name: 'Ho Chi Minh City', city: 'Ho Chi Minh' },
    { code: 'PNH', name: 'Phnom Penh', city: 'Phnom Penh' },
    { code: 'RGN', name: 'Yangon', city: 'Yangon' },

    // Asia - South
    { code: 'DEL', name: 'Delhi Indira Gandhi', city: 'Delhi' },
    { code: 'BOM', name: 'Mumbai', city: 'Mumbai' },
    { code: 'BLR', name: 'Bangalore', city: 'Bangalore' },
    { code: 'MAA', name: 'Chennai', city: 'Chennai' },
    { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad' },
    { code: 'CCU', name: 'Kolkata', city: 'Kolkata' },
    { code: 'ISB', name: 'Islamabad', city: 'Islamabad' },
    { code: 'KHI', name: 'Karachi', city: 'Karachi' },
    { code: 'CMB', name: 'Colombo', city: 'Colombo' },
    { code: 'DAC', name: 'Dhaka', city: 'Dhaka' },

    // Australia & New Zealand
    { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney' },
    { code: 'MEL', name: 'Melbourne', city: 'Melbourne' },
    { code: 'BNE', name: 'Brisbane', city: 'Brisbane' },
    { code: 'PER', name: 'Perth', city: 'Perth' },
    { code: 'ADL', name: 'Adelaide', city: 'Adelaide' },
    { code: 'AKL', name: 'Auckland', city: 'Auckland' },
    { code: 'CHC', name: 'Christchurch', city: 'Christchurch' },
    { code: 'WLG', name: 'Wellington', city: 'Wellington' },

    // South America
    { code: 'GRU', name: 'São Paulo Guarulhos', city: 'São Paulo' },
    { code: 'GIG', name: 'Rio de Janeiro', city: 'Rio de Janeiro' },
    { code: 'BSB', name: 'Brasília', city: 'Brasília' },
    { code: 'EZE', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires' },
    { code: 'BOG', name: 'Bogotá', city: 'Bogotá' },
    { code: 'LIM', name: 'Lima', city: 'Lima' },
    { code: 'SCL', name: 'Santiago', city: 'Santiago' },
    { code: 'GYE', name: 'Guayaquil', city: 'Guayaquil' },
    { code: 'CCS', name: 'Caracas', city: 'Caracas' },

    // Mexico & Central America
    { code: 'MEX', name: 'Mexico City', city: 'Mexico City' },
    { code: 'CUN', name: 'Cancún', city: 'Cancún' },
    { code: 'GDL', name: 'Guadalajara', city: 'Guadalajara' },
    { code: 'MTY', name: 'Monterrey', city: 'Monterrey' },
    { code: 'PTY', name: 'Panama City', city: 'Panama City' },
    { code: 'SJO', name: 'San José', city: 'San José' },

    // Caribbean
    { code: 'NAS', name: 'Nassau', city: 'Nassau' },
    { code: 'MBJ', name: 'Montego Bay', city: 'Montego Bay' },
    { code: 'HAV', name: 'Havana', city: 'Havana' },
    { code: 'SJU', name: 'San Juan', city: 'San Juan' },
    { code: 'PUJ', name: 'Punta Cana', city: 'Punta Cana' },

    // Africa
    { code: 'JNB', name: 'Johannesburg', city: 'Johannesburg' },
    { code: 'CPT', name: 'Cape Town', city: 'Cape Town' },
    { code: 'DUR', name: 'Durban', city: 'Durban' },
    { code: 'LOS', name: 'Lagos', city: 'Lagos' },
    { code: 'NBO', name: 'Nairobi', city: 'Nairobi' },
    { code: 'ADD', name: 'Addis Ababa', city: 'Addis Ababa' },
    { code: 'ALG', name: 'Algiers', city: 'Algiers' },
    { code: 'TUN', name: 'Tunis', city: 'Tunis' },
    { code: 'CMN', name: 'Casablanca', city: 'Casablanca' }
];

// Initialize autocomplete
function initializeAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');

    const originDatalist = createDatalist('origin-list', airports);
    const destDatalist = createDatalist('destination-list', airports);

    document.body.appendChild(originDatalist);
    document.body.appendChild(destDatalist);

    originInput.setAttribute('list', 'origin-list');
    destinationInput.setAttribute('list', 'destination-list');
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

initializeAutocomplete();
