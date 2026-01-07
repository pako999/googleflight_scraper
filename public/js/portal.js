// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 14);
dateInput.value = defaultDate.toISOString().split('T')[0];

// Form submission handler
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;

    if (!origin || !destination || !date) {
        alert('Please fill in all fields');
        return;
    }

    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

    // Parse airport codes (first 3 letters/word)
    const originCode = origin.split(/[\s,]/)[0].toUpperCase();
    const destCode = destination.split(/[\s,]/)[0].toUpperCase();

    // Format date for different sites
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Google Flights URL
    const googleUrl = `https://www.google.com/travel/flights?q=flights from ${encodeURIComponent(origin)} to ${encodeURIComponent(destination)} on ${year}-${month}-${day}`;
    document.getElementById('googleLink').href = googleUrl;

    // Kayak URL
    const kayakUrl = `https://www.kayak.com/flights/${originCode}-${destCode}/${year}-${month}-${day}?sort=bestflight_a`;
    document.getElementById('kayakLink').href = kayakUrl;

    // Skyscanner URL
    const skyscannerDate = `${year.slice(2)}${month}${day}`;
    const skyscannerUrl = `https://www.skyscanner.com/transport/flights/${originCode}/${destCode}/${skyscannerDate}/`;
    document.getElementById('skyscannerLink').href = skyscannerUrl;

    // Momondo URL
    const momondoUrl = `https://www.momondo.com/flight-search/${originCode}-${destCode}/${year}-${month}-${day}`;
    document.getElementById('momondoLink').href = momondoUrl;

    // Expedia URL
    const expediaUrl = `https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=one-way&leg1=from:${originCode},to:${destCode},departure:${month}/${day}/${year}TANYT`;
    document.getElementById('expediaLink').href = expediaUrl;

    // Priceline URL
    const pricelineUrl = `https://www.priceline.com/relax/at/flights/at/results/MultiCityFlightsController?adults=1&departure-date=${year}-${month}-${day}&destination=${destCode}&origin=${originCode}`;
    document.getElementById('pricelineLink').href = pricelineUrl;
});

// Track which site user clicks (optional analytics)
document.querySelectorAll('.btn-visit').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const siteName = this.parentElement.querySelector('h4').textContent;
        console.log('User clicked:', siteName);
        // Add analytics tracking here if needed
    });
});
