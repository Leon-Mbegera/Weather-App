const form = document.getElementById('input-form');
const weatherData = document.getElementById('weather-data');
let convert = false;
let temp = 0;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;
  createApi(location);
  fetchGiphy();
});

const createApi = (location) => {

  const defaultUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const realUrl = defaultUrl + location + "&APPID=3ac2771651cac45621767706203925fe";
  getWeather(realUrl)
    .then(conditions => {
      console.log(conditions);
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
  temp = (conditions.main.temp) - 273;
  let skyline = conditions.weather[0]["description"].split(" ")
  skyline = skyline[skyline.length - 1];
  display(temp, skyline);
  return [temp, skyline];
};

const fetchGiphy = async (skyline) => {
  const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=EE5yfxyw3zulUNXYsVkOAtVgrlzAqqJr&s='+'weather+'+skyline);
  const giphy = await response.json();
  console.log(giphy);
  const iframe = document.getElementById('giphyId');
  iframe.setAttribute('src', giphy.data.embed_url);
};

const display = (temp, skyline, toggleTemp) => {
  const displayTemp = document.querySelector('#temperature');
  const displaySky = document.querySelector('#sky');
  const btn = document.querySelector('.toggleBtn');
  btn.innerHTML = "Convert";
  displayTemp.textContent = temp;
  displaySky.textContent = skyline;
  weatherData.append(displayTemp, btn, displaySky);
};

const btn = document.querySelector('.toggleBtn');
btn.innerHTML = "Convert";
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (convert == false) {
    temp = ((temp) * 1.8) + 32;
    convert = true;
    console.log(convert);
  } else {
    temp = ((temp) - 32) / 1.8;
    convert = false;
    console.log(convert);
  }
  console.log(temp);
  display(temp);
});

const displayAfterConvertion = (toggleTemp) => {
  const displayTemp = document.querySelector('#temperature');
  displayTemp.innerHTML = toggleTemp();
  weatherData.append(displayTemp);
};


const toggleTemp = (temp, btn) => {
  // const availedTemp = document.querySelector('#temperature').value;
  
  return temp;
};