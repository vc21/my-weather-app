function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let today = document.querySelector("#today-date");
today.innerHTML = formatDate(now);

// function showFarenheit(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("h2");
//   temperature.innerHTML = 35;
// }

// function showCelsius(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("h2");
//   temperature.innerHTML = 15;
// }

// let celsius = document.querySelector("#showCelsius");
// let farenheit = document.querySelector("#showFarenheit");

// celsius.addEventListener("click", showCelsius);
// farenheit.addEventListener("click", showFarenheit);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "a96ad8d4fafd71a92299a6c0f7bd0e88";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a96ad8d4fafd71a92299a6c0f7bd0e88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Berlin");
