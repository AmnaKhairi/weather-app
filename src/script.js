function formatDate() {
  let now = new Date();
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
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${day} ${hours}:${minutes}`;
  return currentDate;
}

function showForecastTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  city.innerHTML = search.value;

  let apiKey = "d70dfa639c84bf5107d94fdd98d51b92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(showForecast);
}

function showFarenheit(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

function showCelcius(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(celciusTemperature);
}

function showCurrentTemperature(response) {
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  let weatherDescription = response.data.weather["0"].description;
  let icon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  celciusTemperature = response.data.main.temp;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  icon.setAttribute("alt", weatherDescription);
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = weatherDescription;
  humidity.innerHTML = `Humidity ${currentHumidity}%`;
  windspeed.innerHTML = `Wind ${wind}m/s`;
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "d70dfa639c84bf5107d94fdd98d51b92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPosition);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(showForecast);
}

function showPosition(response) {
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  let weatherDescription = response.data.weather["0"].description;
  let iconCode = response.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  celciusTemperature = response.data.main.temp;

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  icon.setAttribute("alt", weatherDescription);
  description.innerHTML = weatherDescription;
  humidity.innerHTML = `Humidity ${currentHumidity}%`;
  windspeed.innerHTML = `Wind ${wind}m/s`;
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function Default() {
  let apiKey = "d70dfa639c84bf5107d94fdd98d51b92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDefault);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(showForecast);
}

function showDefault(response) {
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  let weatherDescription = response.data.weather["0"].description;
  let iconCode = response.data.weather[0].icon;
  celciusTemperature = response.data.main.temp;

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  icon.setAttribute("alt", weatherDescription);
  description.innerHTML = weatherDescription;
  humidity.innerHTML = `Humidity ${currentHumidity}%`;
  windspeed.innerHTML = `Wind ${wind}m/s`;
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecastElement");

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
    <div class="row forecast-time">${showForecastTime(forecast.dt * 1000)}</div>
    <div class="row"><strong>${Math.round(
      forecast.main.temp_max
    )}°</strong>${Math.round(forecast.main.temp_min)}°</div>
    <img class="row" id="icon" src="https://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="">
  </div>
  `;
  }
}

//date

let date = document.querySelector("#date");
date.innerHTML = formatDate();

//city name

let search = document.querySelector("#search");
let city = document.querySelector("#city");
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

//current button
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", handlePosition);

//precipitation, humidity and wind
let windspeed = document.querySelector("#windspeed");
let humidity = document.querySelector("#humidity");
let description = document.querySelector("#description");

let temperature = document.querySelector("#temperature");

//default
if (search.value.length === 0) {
  Default();
}

//unit conversion
let celcius = document.querySelector("#celcius");
let celciusTemperature = null;
celcius.addEventListener("click", showCelcius);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);
