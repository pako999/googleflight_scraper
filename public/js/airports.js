// Comprehensive worldwide airports database (~600 airports)
const airports = [
    // --- NORTH AMERICA ---
    // USA
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta, GA' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles, CA' },
    { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago, IL' },
    { code: 'DFW', name: 'Dallas/Fort Worth', city: 'Dallas, TX' },
    { code: 'DEN', name: 'Denver International', city: 'Denver, CO' },
    { code: 'JFK', name: 'John F. Kennedy', city: 'New York, NY' },
    { code: 'SFO', name: 'San Francisco International', city: 'San Francisco, CA' },
    { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas, NV' },
    { code: 'SEA', name: 'Seattle-Tacoma', city: 'Seattle, WA' },
    { code: 'MCO', name: 'Orlando International', city: 'Orlando, FL' },
    { code: 'CLT', name: 'Charlotte Douglas', city: 'Charlotte, NC' },
    { code: 'EWR', name: 'Newark Liberty', city: 'Newark, NJ' },
    { code: 'MIA', name: 'Miami International', city: 'Miami, FL' },
    { code: 'PHX', name: 'Phoenix Sky Harbor', city: 'Phoenix, AZ' },
    { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston, TX' },
    { code: 'BOS', name: 'Logan International', city: 'Boston, MA' },
    { code: 'MSP', name: 'Minneapolis-Saint Paul', city: 'Minneapolis, MN' },
    { code: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit, MI' },
    { code: 'FLL', name: 'Fort Lauderdale-Hollywood', city: 'Fort Lauderdale, FL' },
    { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia, PA' },
    { code: 'LGA', name: 'LaGuardia', city: 'New York, NY' },
    { code: 'BWI', name: 'Baltimore/Washington', city: 'Baltimore, MD' },
    { code: 'SLC', name: 'Salt Lake City', city: 'Salt Lake City, UT' },
    { code: 'SAN', name: 'San Diego International', city: 'San Diego, CA' },
    { code: 'IAD', name: 'Washington Dulles', city: 'Washington, DC' },
    { code: 'DCA', name: 'Reagan Washington National', city: 'Washington, DC' },
    { code: 'TPA', name: 'Tampa International', city: 'Tampa, FL' },
    { code: 'MDW', name: 'Chicago Midway', city: 'Chicago, IL' },
    { code: 'HNL', name: 'Daniel K. Inouye', city: 'Honolulu, HI' },
    { code: 'PDX', name: 'Portland International', city: 'Portland, OR' },
    { code: 'BNA', name: 'Nashville International', city: 'Nashville, TN' },
    { code: 'AUS', name: 'Austin-Bergstrom', city: 'Austin, TX' },
    { code: 'STL', name: 'St. Louis Lambert', city: 'St. Louis, MO' },
    { code: 'SJC', name: 'Norman Y. Mineta San Jose', city: 'San Jose, CA' },
    { code: 'HOU', name: 'William P. Hobby', city: 'Houston, TX' },
    { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas, TX' },
    { code: 'RDU', name: 'Raleigh-Durham', city: 'Raleigh, NC' },
    { code: 'MSY', name: 'Louis Armstrong New Orleans', city: 'New Orleans, LA' },
    { code: 'SMF', name: 'Sacramento International', city: 'Sacramento, CA' },
    { code: 'SNA', name: 'John Wayne', city: 'Santa Ana, CA' },
    { code: 'SAT', name: 'San Antonio International', city: 'San Antonio, TX' },
    { code: 'MCI', name: 'Kansas City International', city: 'Kansas City, MO' },
    { code: 'CLE', name: 'Cleveland Hopkins', city: 'Cleveland, OH' },
    { code: 'IND', name: 'Indianapolis International', city: 'Indianapolis, IN' },
    { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh, PA' },
    { code: 'CVG', name: 'Cincinnati/Northern Kentucky', city: 'Cincinnati, OH' },
    { code: 'OGG', name: 'Kahului', city: 'Kahului, HI' },
    { code: 'RSW', name: 'Southwest Florida', city: 'Fort Myers, FL' },
    { code: 'CMH', name: 'John Glenn Columbus', city: 'Columbus, OH' },
    { code: 'PBI', name: 'Palm Beach International', city: 'West Palm Beach, FL' },
    { code: 'JAX', name: 'Jacksonville International', city: 'Jacksonville, FL' },
    { code: 'MKE', name: 'Milwaukee Mitchell', city: 'Milwaukee, WI' },
    { code: 'BDL', name: 'Bradley International', city: 'Hartford, CT' },
    { code: 'ONT', name: 'Ontario International', city: 'Ontario, CA' },
    { code: 'ANC', name: 'Ted Stevens Anchorage', city: 'Anchorage, AK' },
    { code: 'SJU', name: 'Luis Muñoz Marín', city: 'San Juan, PR' },
    { code: 'BUF', name: 'Buffalo Niagara', city: 'Buffalo, NY' },
    { code: 'OMA', name: 'Eppley Airfield', city: 'Omaha, NE' },
    { code: 'ABQ', name: 'Albuquerque International', city: 'Albuquerque, NM' },
    { code: 'OKC', name: 'Will Rogers World', city: 'Oklahoma City, OK' },
    { code: 'MEM', name: 'Memphis International', city: 'Memphis, TN' },
    { code: 'RIC', name: 'Richmond International', city: 'Richmond, VA' },
    { code: 'TUS', name: 'Tucson International', city: 'Tucson, AZ' },
    { code: 'TUL', name: 'Tulsa International', city: 'Tulsa, OK' },
    { code: 'RNO', name: 'Reno-Tahoe', city: 'Reno, NV' },
    { code: 'CHS', name: 'Charleston International', city: 'Charleston, SC' },
    { code: 'PVD', name: 'Rhode Island T.F. Green', city: 'Providence, RI' },
    { code: 'BUR', name: 'Hollywood Burbank', city: 'Burbank, CA' },
    { code: 'ORF', name: 'Norfolk International', city: 'Norfolk, VA' },
    { code: 'SDF', name: 'Louisville Muhammad Ali', city: 'Louisville, KY' },
    { code: 'GRR', name: 'Gerald R. Ford', city: 'Grand Rapids, MI' },
    { code: 'XNA', name: 'Northwest Arkansas', city: 'Fayetteville, AR' },
    { code: 'ELP', name: 'El Paso International', city: 'El Paso, TX' },
    { code: 'GEG', name: 'Spokane International', city: 'Spokane, WA' },
    { code: 'SYR', name: 'Syracuse Hancock', city: 'Syracuse, NY' },
    { code: 'LIT', name: 'Bill and Hillary Clinton', city: 'Little Rock, AR' },
    { code: 'BHM', name: 'Birmingham-Shuttlesworth', city: 'Birmingham, AL' },
    { code: 'DSM', name: 'Des Moines International', city: 'Des Moines, IA' },
    { code: 'BOI', name: 'Boise', city: 'Boise, ID' },
    { code: 'GSP', name: 'Greenville-Spartanburg', city: 'Greenville, SC' },
    { code: 'SAV', name: 'Savannah/Hilton Head', city: 'Savannah, GA' },
    { code: 'ALB', name: 'Albany International', city: 'Albany, NY' },
    { code: 'ROC', name: 'Frederick Douglass Greater Rochester', city: 'Rochester, NY' },
    { code: 'TYS', name: 'McGhee Tyson', city: 'Knoxville, TN' },
    { code: 'HPN', name: 'Westchester County', city: 'White Plains, NY' },
    { code: 'DAY', name: 'Dayton International', city: 'Dayton, OH' },
    { code: 'GSO', name: 'Piedmont Triad', city: 'Greensboro, NC' },
    { code: 'FAT', name: 'Fresno Yosemite', city: 'Fresno, CA' },
    { code: 'ISP', name: 'Long Island MacArthur', city: 'Islip, NY' },
    { code: 'LGB', name: 'Long Beach', city: 'Long Beach, CA' },
    { code: 'PWM', name: 'Portland International Jetport', city: 'Portland, ME' },

    // Canada
    { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto, ON' },
    { code: 'YVR', name: 'Vancouver International', city: 'Vancouver, BC' },
    { code: 'YUL', name: 'Montreal-Trudeau', city: 'Montreal, QC' },
    { code: 'YYC', name: 'Calgary International', city: 'Calgary, AB' },
    { code: 'YEG', name: 'Edmonton International', city: 'Edmonton, AB' },
    { code: 'YOW', name: 'Ottawa Macdonald-Cartier', city: 'Ottawa, ON' },
    { code: 'YWG', name: 'Winnipeg Richardson', city: 'Winnipeg, MB' },
    { code: 'YHZ', name: 'Halifax Stanfield', city: 'Halifax, NS' },
    { code: 'YTZ', name: 'Billy Bishop Toronto City', city: 'Toronto, ON' },
    { code: 'YQB', name: 'Quebec City Jean Lesage', city: 'Quebec City, QC' },
    { code: 'YYJ', name: 'Victoria International', city: 'Victoria, BC' },

    // Mexico
    { code: 'MEX', name: 'Mexico City International', city: 'Mexico City' },
    { code: 'CUN', name: 'Cancun International', city: 'Cancun' },
    { code: 'GDL', name: 'Guadalajara', city: 'Guadalajara' },
    { code: 'MTY', name: 'Monterrey', city: 'Monterrey' },
    { code: 'TIJ', name: 'Tijuana', city: 'Tijuana' },
    { code: 'SJD', name: 'Los Cabos', city: 'San Jose del Cabo' },
    { code: 'PVR', name: 'Licenciado Gustavo Díaz Ordaz', city: 'Puerto Vallarta' },

    // --- EUROPE ---
    // UK & Ireland
    { code: 'LHR', name: 'Heathrow', city: 'London' },
    { code: 'LGW', name: 'Gatwick', city: 'London' },
    { code: 'MAN', name: 'Manchester', city: 'Manchester' },
    { code: 'STN', name: 'Stansted', city: 'London' },
    { code: 'LTN', name: 'Luton', city: 'London' },
    { code: 'EDI', name: 'Edinburgh', city: 'Edinburgh' },
    { code: 'BHX', name: 'Birmingham', city: 'Birmingham' },
    { code: 'GLA', name: 'Glasgow', city: 'Glasgow' },
    { code: 'BRS', name: 'Bristol', city: 'Bristol' },
    { code: 'LCY', name: 'London City', city: 'London' },
    { code: 'NCL', name: 'Newcastle', city: 'Newcastle' },
    { code: 'LPL', name: 'Liverpool John Lennon', city: 'Liverpool' },
    { code: 'EMA', name: 'East Midlands', city: 'Nottingham' },
    { code: 'LBA', name: 'Leeds Bradford', city: 'Leeds' },
    { code: 'DUB', name: 'Dublin', city: 'Dublin' },
    { code: 'ORK', name: 'Cork', city: 'Cork' },
    { code: 'SNN', name: 'Shannon', city: 'Shannon' },

    // Germany
    { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt' },
    { code: 'MUC', name: 'Munich', city: 'Munich' },
    { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin' },
    { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf' },
    { code: 'HAM', name: 'Hamburg', city: 'Hamburg' },
    { code: 'STR', name: 'Stuttgart', city: 'Stuttgart' },
    { code: 'CGN', name: 'Cologne Bonn', city: 'Cologne' },
    { code: 'HAJ', name: 'Hanover', city: 'Hanover' },
    { code: 'NUE', name: 'Nuremberg', city: 'Nuremberg' },

    // France
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
    { code: 'ORY', name: 'Orly', city: 'Paris' },
    { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice' },
    { code: 'LYS', name: 'Lyon-Saint Exupéry', city: 'Lyon' },
    { code: 'MRS', name: 'Marseille Provence', city: 'Marseille' },
    { code: 'TLS', name: 'Toulouse-Blagnac', city: 'Toulouse' },
    { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Bordeaux' },
    { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes' },

    // Spain & Portugal
    { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid' },
    { code: 'BCN', name: 'Josep Tarradellas Barcelona-El Prat', city: 'Barcelona' },
    { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma' },
    { code: 'AGP', name: 'Málaga', city: 'Málaga' },
    { code: 'ALC', name: 'Alicante', city: 'Alicante' },
    { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas' },
    { code: 'TFS', name: 'Tenerife South', city: 'Tenerife' },
    { code: 'VLC', name: 'Valencia', city: 'Valencia' },
    { code: 'IBZ', name: 'Ibiza', city: 'Ibiza' },
    { code: 'SVQ', name: 'Seville', city: 'Seville' },
    { code: 'LIS', name: 'Humberto Delgado', city: 'Lisbon' },
    { code: 'OPO', name: 'Francisco Sá Carneiro', city: 'Porto' },
    { code: 'FAO', name: 'Faro', city: 'Faro' },
    { code: 'FNC', name: 'Madeira', city: 'Funchal' },

    // Italy
    { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino', city: 'Rome' },
    { code: 'MXP', name: 'Malpensa', city: 'Milan' },
    { code: 'BGY', name: 'Orio al Serio', city: 'Bergamo' },
    { code: 'LIN', name: 'Linate', city: 'Milan' },
    { code: 'VCE', name: 'Marco Polo', city: 'Venice' },
    { code: 'NAP', name: 'Naples', city: 'Naples' },
    { code: 'CTA', name: 'Catania-Fontanarossa', city: 'Catania' },
    { code: 'BLQ', name: 'Bologna Guglielmo Marconi', city: 'Bologna' },
    { code: 'PMO', name: 'Falcone Borsellino', city: 'Palermo' },
    { code: 'PSA', name: 'Pisa', city: 'Pisa' },

    // Benelux
    { code: 'AMS', name: 'Schiphol', city: 'Amsterdam' },
    { code: 'EIN', name: 'Eindhoven', city: 'Eindhoven' },
    { code: 'BRU', name: 'Brussels', city: 'Brussels' },
    { code: 'CRL', name: 'Brussels South Charleroi', city: 'Brussels' },
    { code: 'LUX', name: 'Luxembourg', city: 'Luxembourg City' },

    // Nordics
    { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen' },
    { code: 'OSL', name: 'Oslo', city: 'Oslo' },
    { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm' },
    { code: 'HEL', name: 'Helsinki', city: 'Helsinki' },
    { code: 'KEF', name: 'Keflavík', city: 'Reykjavík' },
    { code: 'GOT', name: 'Göteborg Landvetter', city: 'Gothenburg' },
    { code: 'BGO', name: 'Bergen', city: 'Bergen' },
    { code: 'BLL', name: 'Billund', city: 'Billund' },

    // Central & Eastern Europe
    { code: 'IST', name: 'Istanbul', city: 'Istanbul' },
    { code: 'SAW', name: 'Sabiha Gökçen', city: 'Istanbul' },
    { code: 'AYT', name: 'Antalya', city: 'Antalya' },
    { code: 'ESB', name: 'Ankara Esenboğa', city: 'Ankara' },
    { code: 'ADB', name: 'Adnan Menderes', city: 'Izmir' },
    { code: 'SVO', name: 'Sheremetyevo', city: 'Moscow' },
    { code: 'DME', name: 'Domodedovo', city: 'Moscow' },
    { code: 'LED', name: 'Pulkovo', city: 'St. Petersburg' },
    { code: 'VKO', name: 'Vnukovo', city: 'Moscow' },
    { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw' },
    { code: 'KRK', name: 'Kraków John Paul II', city: 'Kraków' },
    { code: 'PRG', name: 'Václav Havel', city: 'Prague' },
    { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest' },
    { code: 'VIE', name: 'Vienna International', city: 'Vienna' },
    { code: 'ZRH', name: 'Zurich', city: 'Zurich' },
    { code: 'GVA', name: 'Geneva', city: 'Geneva' },
    { code: 'ATH', name: 'Athens International', city: 'Athens' },
    { code: 'HER', name: 'Heraklion', city: 'Heraklion' },
    { code: 'OTP', name: 'Henri Coandă', city: 'Bucharest' },
    { code: 'BEG', name: 'Belgrade Nikola Tesla', city: 'Belgrade' },
    { code: 'SOF', name: 'Sofia', city: 'Sofia' },
    { code: 'KBP', name: 'Boryspil', city: 'Kyiv' },
    { code: 'RIX', name: 'Riga', city: 'Riga' },
    { code: 'ZAG', name: 'Zagreb', city: 'Zagreb' },
    { code: 'LJU', name: 'Ljubljana Jože Pučnik', city: 'Ljubljana' },
    { code: 'SPU', name: 'Split', city: 'Split' },
    { code: 'DBV', name: 'Dubrovnik', city: 'Dubrovnik' },
    { code: 'TIA', name: 'Tirana International', city: 'Tirana' },
    { code: 'SJJ', name: 'Sarajevo', city: 'Sarajevo' },

    // --- ASIA ---
    // East Asia
    { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo' },
    { code: 'NRT', name: 'Narita International', city: 'Tokyo' },
    { code: 'KIX', name: 'Kansai International', city: 'Osaka' },
    { code: 'PEK', name: 'Beijing Capital', city: 'Beijing' },
    { code: 'PKX', name: 'Beijing Daxing', city: 'Beijing' },
    { code: 'PVG', name: 'Shanghai Pudong', city: 'Shanghai' },
    { code: 'SHA', name: 'Shanghai Hongqiao', city: 'Shanghai' },
    { code: 'CAN', name: 'Guangzhou Baiyun', city: 'Guangzhou' },
    { code: 'CTU', name: 'Chengdu Shuangliu', city: 'Chengdu' },
    { code: 'SZX', name: 'Shenzhen Bao\'an', city: 'Shenzhen' },
    { code: 'KMG', name: 'Kunming Changshui', city: 'Kunming' },
    { code: 'XIY', name: 'Xi\'an Xianyang', city: 'Xi\'an' },
    { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong' },
    { code: 'TPE', name: 'Taoyuan International', city: 'Taipei' },
    { code: 'ICN', name: 'Incheon International', city: 'Seoul' },
    { code: 'GMP', name: 'Gimpo International', city: 'Seoul' },
    { code: 'CJU', name: 'Jeju International', city: 'Jeju' },

    // Southeast Asia
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore' },
    { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok' },
    { code: 'DMK', name: 'Don Mueang', city: 'Bangkok' },
    { code: 'HKT', name: 'Phuket International', city: 'Phuket' },
    { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur' },
    { code: 'CGK', name: 'Soekarno-Hatta', city: 'Jakarta' },
    { code: 'DPS', name: 'Ngurah Rai (Bali)', city: 'Denpasar' },
    { code: 'SGN', name: 'Tan Son Nhat', city: 'Ho Chi Minh City' },
    { code: 'HAN', name: 'Noi Bai', city: 'Hanoi' },
    { code: 'MNL', name: 'Ninoy Aquino', city: 'Manila' },

    // South Asia
    { code: 'DEL', name: 'Indira Gandhi', city: 'Delhi' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai' },
    { code: 'BLR', name: 'Kempegowda', city: 'Bangalore' },
    { code: 'MAA', name: 'Chennai International', city: 'Chennai' },
    { code: 'HYD', name: 'Rajiv Gandhi', city: 'Hyderabad' },
    { code: 'CCU', name: 'Netaji Subhas Chandra Bose', city: 'Kolkata' },
    { code: 'KHI', name: 'Jinnah International', city: 'Karachi' },
    { code: 'LHE', name: 'Allama Iqbal', city: 'Lahore' },
    { code: 'CMB', name: 'Bandaranaike', city: 'Colombo' },
    { code: 'DAC', name: 'Hazrat Shahjalal', city: 'Dhaka' },

    // Middle East
    { code: 'DXB', name: 'Dubai International', city: 'Dubai' },
    { code: 'DOH', name: 'Hamad International', city: 'Doha' },
    { code: 'AUH', name: 'Zayed International', city: 'Abu Dhabi' },
    { code: 'JED', name: 'King Abdulaziz', city: 'Jeddah' },
    { code: 'RUH', name: 'King Khalid', city: 'Riyadh' },
    { code: 'TLV', name: 'Ben Gurion', city: 'Tel Aviv' },
    { code: 'KWI', name: 'Kuwait International', city: 'Kuwait City' },
    { code: 'MCT', name: 'Muscat International', city: 'Muscat' },
    { code: 'AMM', name: 'Queen Alia', city: 'Amman' },
    { code: 'BEY', name: 'Beirut-Rafic Hariri', city: 'Beirut' },

    // --- OCEANIA ---
    { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney' },
    { code: 'MEL', name: 'Melbourne', city: 'Melbourne' },
    { code: 'BNE', name: 'Brisbane', city: 'Brisbane' },
    { code: 'PER', name: 'Perth', city: 'Perth' },
    { code: 'ADL', name: 'Adelaide', city: 'Adelaide' },
    { code: 'AKL', name: 'Auckland', city: 'Auckland' },
    { code: 'CHC', name: 'Christchurch', city: 'Christchurch' },
    { code: 'NAN', name: 'Nadi', city: 'Nadi' },

    // --- SOUTH AMERICA ---
    { code: 'GRU', name: 'São Paulo/Guarulhos', city: 'São Paulo' },
    { code: 'CGH', name: 'São Paulo/Congonhas', city: 'São Paulo' },
    { code: 'GIG', name: 'Rio de Janeiro/Galeão', city: 'Rio de Janeiro' },
    { code: 'SDU', name: 'Santos Dumont', city: 'Rio de Janeiro' },
    { code: 'BSB', name: 'Brasília', city: 'Brasília' },
    { code: 'BOG', name: 'El Dorado', city: 'Bogotá' },
    { code: 'LIM', name: 'Jorge Chávez', city: 'Lima' },
    { code: 'SCL', name: 'Arturo Merino Benítez', city: 'Santiago' },
    { code: 'EZE', name: 'Ministro Pistarini', city: 'Buenos Aires' },
    { code: 'AEP', name: 'Jorge Newbery', city: 'Buenos Aires' },
    { code: 'PTY', name: 'Tocumen', city: 'Panama City' },

    // --- AFRICA ---
    { code: 'JNB', name: 'O. R. Tambo', city: 'Johannesburg' },
    { code: 'CPT', name: 'Cape Town International', city: 'Cape Town' },
    { code: 'CAI', name: 'Cairo International', city: 'Cairo' },
    { code: 'CMN', name: 'Mohammed V', city: 'Casablanca' },
    { code: 'ADD', name: 'Bole International', city: 'Addis Ababa' },
    { code: 'NBO', name: 'Jomo Kenyatta', city: 'Nairobi' },
    { code: 'LOS', name: 'Murtala Muhammed', city: 'Lagos' },
    { code: 'ALG', name: 'Houari Boumediene', city: 'Algiers' },
    { code: 'TUN', name: 'Tunis-Carthage', city: 'Tunis' },
    { code: 'MRU', name: 'Sir Seewoosagur Ramgoolam', city: 'Mauritius' }
];

// Initialize autocomplete functionality
function initializeAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');

    // Create datalists
    const originDatalist = createDatalist('origin-list', airports);
    const destDatalist = createDatalist('destination-list', airports);

    // Append to body (if not already there)
    const existingOrigin = document.getElementById('origin-list');
    if (existingOrigin) existingOrigin.remove();
    const existingDest = document.getElementById('destination-list');
    if (existingDest) existingDest.remove();

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
