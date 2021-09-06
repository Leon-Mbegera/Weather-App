
const form = document.getElementById('input-form');
form.addEventListener('click', (e) => {
  e.preventDefault();
  const location = document.getElementById('location');
  createApi(location);
});
