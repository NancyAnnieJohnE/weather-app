const apiKey = 'd18584a3b74c9a3dd395788846483b1e';

const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const getWeatherBtn = document.getElementById('getWeather');
const resultDiv = document.getElementById('result');

const countryStates = {
  India: [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Puducherry'
  ],
  USA: [
    'California',
    'Texas',
    'Florida',
    'New York',
    'Illinois',
    'Pennsylvania'
  ],
  UK: [
    'England',
    'Scotland',
    'Wales',
    'Northern Ireland',
    'London',
    'Manchester'
  ],
  Canada: [
    'Ontario',
    'Quebec',
    'British Columbia',
    'Alberta',
    'Manitoba',
    'Nova Scotia'
  ],
  Australia: [
    'New South Wales',
    'Victoria',
    'Queensland',
    'Western Australia',
    'South Australia',
    'Tasmania'
  ],
  Germany: [
    'Bavaria',
    'Berlin',
    'Hamburg',
    'Hesse',
    'Saxony',
    'Thuringia'
  ],
  France: [
    'Île-de-France',
    'Provence-Alpes-Côte d\'Azur',
    'Nouvelle-Aquitaine',
    'Occitanie',
    'Auvergne-Rhône-Alpes',
    'Hauts-de-France'
  ],
  Japan: [
    'Tokyo',
    'Osaka',
    'Hokkaido',
    'Kyoto',
    'Okinawa',
    'Fukuoka'
  ],
  Brazil: [
    'São Paulo',
    'Rio de Janeiro',
    'Bahia',
    'Paraná',
    'Minas Gerais',
    'Ceará'
  ],
  SouthAfrica: [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo'
  ]
};

countrySelect.addEventListener('change', () => {
  const country = countrySelect.value;
  resultDiv.textContent = '';
  resetBackground();
  if (country && countryStates[country]) {
    populateStates(countryStates[country]);
    stateSelect.disabled = false;
    getWeatherBtn.disabled = true;
  } else {
    stateSelect.innerHTML = '<option value="">--Select State/City--</option>';
    stateSelect.disabled = true;
    getWeatherBtn.disabled = true;
  }
});

stateSelect.addEventListener('change', () => {
  getWeatherBtn.disabled = !stateSelect.value;
  resultDiv.textContent = '';
  resetBackground();
});

getWeatherBtn.addEventListener('click', () => {
  const city = stateSelect.value;
  if (!city) {
    alert('Please select a state/city.');
    return;
  }
  fetchWeather(city);
});

function populateStates(states) {
  stateSelect.innerHTML = '<option value="">--Select State/City--</option>';
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}

function fetchWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
  
  console.log('Fetching weather for:', location);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Location not found.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Weather data received:', data);
      const tempC = data.main.temp;
      const tempF = (tempC * 9/5 + 32).toFixed(2);
      resultDiv.textContent = `Temperature in ${data.name}: ${tempC}°C / ${tempF}°F`;
      changeBackground(tempC);
    })
    .catch(err => {
      console.error('Error fetching weather:', err);
      resultDiv.textContent = err.message;
      resetBackground();
    });
}

function changeBackground(temp) {
  console.log('changeBackground called with temp:', temp);
  temp = Number(temp);
  let bgImage = '';

if (temp < 0) bgImage = 'images/frost.jpg';
else if (temp >= 0 && temp < 10) bgImage = 'images/snowy.jpg';          // Snow (0 to <10)
else if (temp >= 10 && temp < 13) bgImage = 'images/fogandmist.jpg';    // Fog and Mist (10 to <13)
else if (temp >= 13 && temp < 15) bgImage = 'images/storm.jpg';         // Storm (13 to <15)
else if (temp >= 15 && temp < 17) bgImage = 'images/heavyrain.jpg';     // Heavy Rain (15 to <17)
else if (temp >= 17 && temp < 20) bgImage = 'images/lightrain.jpg';     // Light Rain (17 to <20)
else if (temp >= 20 && temp < 24) bgImage = 'images/windy.jpg';         // Windy (20 to <23)
else if (temp >= 24 && temp < 35) bgImage = 'images/sunny.jpg';         // Sunny (23 to <30)
else if (temp >= 35) bgImage = 'images/hot.jpg';                        // Hot (30 and above)


  console.log('Setting background image:', bgImage);

  // Remove background color when setting image
  document.body.style.backgroundColor = 'transparent';

  // Add cache buster param to force reload
  const cacheBuster = new Date().getTime();
  document.body.style.backgroundImage = `url('${bgImage}?v=${cacheBuster}')`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center center';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';
}

function resetBackground() {
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#87ceeb';  // sky blue
}
