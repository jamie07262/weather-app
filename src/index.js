//getting user input
function displayCity(event) {
  event.preventDefault();

  let searchEl = document.querySelector(".search-engine");
  let city = searchEl.value;

  searchCity(city);
}

//integrating api
function searchCity(city) {
  const apiKey = `bd79ao40tde3dec118ca46bc3e6dd55f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayInfo);
}

//rendering weather details
function displayInfo(response) {
  const cityEl = document.querySelector(".city");
  const humidityEl = document.querySelector(".humidity");
  const windEl = document.querySelector(".wind");

  const temperatureEl = document.querySelector("#temp-value");
  const detailsEl = document.querySelector(".description");
  const iconEl = document.querySelector("#icon");

  const timeEl = document.querySelector(".current-date-time");
  let date = new Date(response.data.time * 1000);

  cityEl.innerHTML = response.data.city;
  detailsEl.innerHTML = response.data.condition.description;
  timeEl.innerHTML = currentTime(date);
  humidityEl.innerHTML = `${response.data.temperature.humidity}%`;

  windEl.innerHTML = `${response.data.wind.speed} km/h`;
  iconEl.innerHTML = `<img src= ${response.data.condition.icon_url} alt= ${response.data.condition.icon}/>`;
  temperatureEl.innerHTML = Math.round(response.data.temperature.current);

  getForecast(response.data.city);
}

//rendering data and time
function currentTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} ${hour}:${minutes}`;
  return formattedDate;
}

//getting the day for forecast
function formatDay(time) {
  let date = new Date(time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

//api for forecast
function getForecast(city) {
  const apiKey = `bd79ao40tde3dec118ca46bc3e6dd55f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//injecting forecast
function displayForecast(response) {
  const forecastEl = document.querySelector(".weather-forecast");
  let forecast = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `<div class="forecast">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <div><img class="weather-forecast-icon" src= ${
              day.condition.icon_url
            } alt = ${day.condition.icon}/></div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temp"><strong>${Math.round(
                day.temperature.maximum
              )}°C</strong></div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
          </div>`;
    }
  });

  forecastEl.innerHTML = forecast;
}

let formEl = document.querySelector(".search-form");
formEl.addEventListener("click", displayCity);

searchCity("San Fernando");

displayForecast();
