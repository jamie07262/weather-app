function displayCity(event) {
  event.preventDefault();

  let searchEl = document.querySelector("#search-engine");
  let city = searchEl.value;

  const apiKey = `45c3d6bd4taca0f84e6675fodff345f4`;
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

  cityEl.innerHTML = response.data.city;
  detailsEl.innerHTML = response.data.condition.description;
  humidityEl.innerHTML = response.data.temperature.humidity + `%`;

  windEl.innerHTML = response.data.wind.speed + ` km/h`;
  iconEl.innerHTML = `<img src= ${response.data.condition.icon_url} alt= ${response.data.condition.icon}/>`;
  temperatureEl.innerHTML = Math.round(response.data.temperature.current);
}

//rendering data and time
function currentTime() {
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
  let hour = now.getHours();
  let minutes = now.getMinutes();

  const timeEl = document.querySelector(".current-date-time");
  timeEl.innerHTML = `${day} ${hour}:${minutes}`;
}

let formEl = document.querySelector(".search-form");
formEl.addEventListener("click", displayCity);

currentTime();
