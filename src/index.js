const form = document.getElementById('input-form');
const weatherData = document.getElementById('weather-data');
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
  let temp = conditions.main.temp;
  let skyline = conditions.weather[0]["description"];
  return [temp, skyline];
};

const fetchGiphy = async (skyline) => {
  const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=EE5yfxyw3zulUNXYsVkOAtVgrlzAqqJr&s=' + skyline);
  const giphy = await response.json();
  console.log(giphy);
  const iframe = document.getElementById('giphyId');
  iframe.setAttribute('src', giphy.data.embed_url);
};

const display = (temp) => {
  const displayTemp = document.getElementById('temp');
  displayTemp.innerHTML = temp;
  weatherData.append(displayTemp);
}
