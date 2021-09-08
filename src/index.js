const form = document.getElementById('input-form');
const weatherData = document.getElementById('weather-data');
let convert = false;
let temp = 0;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;
  createApi(location);
});

const createApi = (location) => {

  const defaultUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const realUrl = defaultUrl + location + "&APPID=3ac2771651cac45621767706203925fe";
  getWeather(realUrl)
    .then(conditions => {
      (conditions);
      getTempAndOthers(conditions);
    }).catch(err => {
      console.error(err);
  });
};

const getWeather = async (realUrl) => {

  const response = await fetch(realUrl);
  const conditions = await response.json();
  return conditions;
};

const getTempAndOthers = (conditions) => {
  temp = Math.floor((conditions.main.temp) - 273);
  let skyline = conditions.weather[0]["description"]
  display(temp, skyline);
  fetchGiphy(skyline);
  return [temp, skyline];
};

const fetchGiphy = async (skyline) => {
  const response = await fetch(`https://g.tenor.com/v1/search?q=${skyline}&key=ONCEBFE5IF6H&limit=4`);
  const giphy = await response.json();
  const iframe = document.getElementById('giphyId');
  iframe.setAttribute('src', giphy.results[0].media[0].gif.url);
};

const display = (temp, skyline) => {
  const displayTemp = document.querySelector('#temperature');
  const displaySky = document.querySelector('#sky');
  const btn = document.querySelector('.toggleBtn');
  const unit = document.querySelector('.unit');
  if (convert == false) {
    btn.innerHTML = "Convert to Farhrenheit";
    unit.innerHTML = ` &deg;C`; 
  } else {
    btn.innerHTML = "Convert to Celsius";
    unit.innerHTML = ` &deg;F`; 
  }
  displayTemp.textContent = temp;
  displaySky.textContent = skyline;
  displayTemp.appendChild(unit);
  weatherData.append(displayTemp, btn, displaySky);
};

const btn = document.querySelector('.toggleBtn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (convert == false) {
    temp = Math.floor(((temp) * 1.8) + 32);
    convert = true;
  } else {
    temp = Math.floor(((temp) - 32) / 1.8);
    convert = false;
  }
  display(temp);
});

