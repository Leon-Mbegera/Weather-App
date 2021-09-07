const form = document.getElementById('input-form');
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
      getTemp(conditions);
    }).catch(err => {
      console.error(err);
  });
};

const getWeather = async (realUrl) => {

  const response = await fetch(realUrl);
  const conditions = await response.json();
  return conditions;
};

const getTemp = (conditions) => {
  const temp = conditions.main.temp;
};