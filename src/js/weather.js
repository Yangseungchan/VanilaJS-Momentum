const weather = document.querySelector(".js-weather");
const weatherInfo = document.querySelector(".weather-infos");
const weatherIcon = document.querySelector(".weather-icon");
const COORDS = "coords";
const API_KEY = "bb038fa718d10354c7e2eabb0e475786";

const THUNDER_ICON = '<i class="fas fa-bolt fa-lg"></i>'; // 200 ~ 232
const DRIZZLE_ICON = '<i class="fas fa-tint fa-lg"></i>'; // 300 ~ 321
const MRAIN_ICON = '<i class="fas fa-cloud-rain fa-lg"></i>'; // 500, 501, 511~531
const HRAIN_ICON = '<i class="fas fa-cloud-showers-heavy fa-lg"></i>'; // 502~504
const SNOW_ICON = '<i class="far fa-snowflake fa-lg"></i>'; // 600 ~ 622
const SMOG_ICON = '<i class="fas fa-smog fa-lg"></i>'; // 701~762
const STORM_ICON = '<i class="fas fa-wind fa-lg"></i>'; // 771, 781(actually windy )
const SUNNY_ICON = '<i class="fas fa-sun fa-2x"></i>'; // 800
const CLOUD_ICON = '<i class="fas fa-cloud fa-lg"></i>'; // 801 ~ 804

function getWeatherIcon(id) {
  if (id >= 200 && id <= 232) {
    return THUNDER_ICON;
  } else if (id >= 300 && id <= 321) {
    return DRIZZLE_ICON;
  } else if (id === 500 || id === 501 || (id >= 511 && id <= 531)) {
    return MRAIN_ICON;
  } else if (id >= 502 && id <= 504) {
    return HRAIN_ICON;
  } else if (id >= 600 && id <= 622) {
    return SNOW_ICON;
  } else if (id >= 701 && id <= 762) {
    return SMOG_ICON;
  } else if (id >= 771 && id <= 781) {
    return STORM_ICON;
  } else if (id === 800) {
    return SUNNY_ICON;
  } else if (id >= 801 && id <= 804) {
    return CLOUD_ICON;
  } else {
    return SUNNY_ICON;
  }
}

function composeWeather(highTemp, lowTemp, currentTemp, place) {
  const placeName = document.createElement("span");
  placeName.classList.add("place-name");
  placeName.innerText = place;

  const currentTempSpan = document.createElement("span");
  currentTempSpan.classList.add("weather-infos_current_temp");
  currentTempSpan.innerText = currentTemp + "°C";

  weatherInfo.appendChild(currentTempSpan);
  weatherInfo.appendChild(placeName);

  const highlowContainer = document.createElement("div");
  highlowContainer.classList.add("weather-infos_high_low_temp");

  const highTempSpan = document.createElement("span");
  highTempSpan.classList.add("weather-infos_high_temp");
  highTempSpan.innerText = highTemp + "°C";

  const lowTempSpan = document.createElement("span");
  lowTempSpan.classList.add("weather-infos_low_temp");
  lowTempSpan.innerText = lowTemp + "°C";

  highlowContainer.appendChild(highTempSpan);
  highlowContainer.appendChild(lowTempSpan);

  weatherInfo.appendChild(highlowContainer);
}

function getWeather(lat, long) {
  let highTemp, lowTemp, place, currentTemp;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric
    `)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      currentTemp = Math.floor(json.main.temp);
      lowTemp = Math.floor(json.main.temp_min);
      highTemp = Math.floor(json.main.temp_max);
      place = json.name;

      let weatherId = json.weather[0].id;

      // weatherId = 800;
      const weatherIconHTML = getWeatherIcon(weatherId);
      weatherIcon.innerHTML = weatherIconHTML;
      // weather.innerHTML = `${currentTemp} at ${place}`;
      // console.log(highTemp, lowTemp, weatherIcon, place, currentTemp);
      composeWeather(highTemp, lowTemp, currentTemp, place);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
