
const form = document.getElementById('input-form');
form.addEventListener('click', (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;
  console.log(location);
  createApi(location);
});

const createApi = (location) => {
  const defaultUrl = "api.openweathermap.org/data/2.5/weather?q=";
  const realUrl = defaultUrl + location + "&APPID=3ac2771651cac45621767706203925fe";
  // console.log(realUrl);
};
