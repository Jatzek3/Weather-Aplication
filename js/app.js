/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
let long; let lat; let key; let country; let region; let iconID; let temp;
let windSpeed; let humidity; let timeOfDay;
let tomorrow; let tomorrowTempDegrees; let dayAfterTomorow;
let dayAfterTomorowDegrees; let twoDaysLater; let season;
let twoDaysLaterDegrees; let dayOfWeek; let dayOfMonth; let month;
let hours; let minutes; let tempFeels; let marker; let mymap;
let description;
let currentDate = new Date();

const tempaeraturDescription = document.querySelector('.temperature-description-general');
const tempaeraturDescriptionFeelsLike = document.querySelector('.temperature-description-feels-like');
const tempaeraturDescriptionWindSpeed = document.querySelector('.temperature-description-wind-speed');
const tempaeraturDescriptionHumidity = document.querySelector('.temperature-description-humidity');

const temperaturDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const presentDate = document.querySelector('.present-date');
const presentTime = document.querySelector('.present-time');
const temperatureSpan = document.querySelector('.temperature-section span');
const iconElement = document.querySelector('.weather-icon');

const submitButton = document.querySelector('.submit-button');
const inputValue = document.querySelector('.inputValue');

const tomorrowWeekday = document.querySelector('.day1-weekday');
const tomorrowIcon = document.querySelector('.day1-icon');
const tomorrowTemperature = document.querySelector('.day1-temperature');
const dayAfterTomorowWeekday = document.querySelector('.day2-weekday');
const dayAfterTomorowIcon = document.querySelector('.day2-icon');
const dayAfterTomorowTemperature = document.querySelector('.day2-temperature');
const twoDaysLaterWeekday = document.querySelector('.day3-weekday');
const twoDaysLaterIcon = document.querySelector('.day3-icon');
const twoDaysLaterTemperature = document.querySelector('.day3-temperature');

const changeBackgroundButton = document.querySelector('.change-background');
const changeLanguageButton = document.querySelector('.change-language');
const changeDegreesButton = document.querySelector('.change-degree');

const currentPostion = document.querySelector('.coordinates');

// Time calculations

function getMonthName(dateObj) {
  const number = dateObj.getMonth();
  const abbr = {
    0: ['January', 'Styczeń'],
    1: ['February', 'Luty'],
    2: ['March', 'Marzec'],
    3: ['April', 'Kwiecień'],
    4: ['May', 'Maj'],
    5: ['June', 'Czerwiec'],
    6: ['July', 'Lipiec'],
    7: ['August', 'Sierpień'],
    8: ['September', 'Wrzesień'],
    9: ['October', 'Październik'],
    10: ['November', 'Listopad'],
    11: ['December', 'Grudzień'],
  };
  if (tempaeraturDescription.textContent.slice(0, 2) === 'Og') {
    month = abbr[number][1];
    return abbr[number][1];
  }
  month = abbr[number][0];
  return abbr[number][0];
}
function getDayOfweek(dateObj) {
  const number = dateObj.getDay();
  const abbr = {
    0: ['Su.', 'Nd.'],
    1: ['Mo.', 'Pn.'],
    2: ['Tu.', 'Wt.'],
    3: ['We.', 'Śr.'],
    4: ['Th.', 'Czw.'],
    5: ['Fr.', 'Pt.'],
    6: ['Sa.', 'So.'],
  };
  if (tempaeraturDescription.textContent.slice(0, 2) === 'Og') {
    dayOfWeek = abbr[number][1];
    return abbr[number][1];
  }
  dayOfWeek = abbr[number][0];
  return abbr[number][0];
}
function generateDate(dateObj) {
  dayOfWeek = getDayOfweek(dateObj);
  dayOfMonth = dateObj.getDate();
  month = getMonthName(dateObj);
  hours = dateObj.getHours();
  minutes = dateObj.getMinutes();
}
function convertToCelsius(kelvins) {
  return Math.round(kelvins - 272.15);
}
function convertToFahrenheit(kelvins) {
  return Math.round((kelvins * 9) / 5 - 459.67);
}
function futureDays(abbr) {
  switch (abbr) {
    case 'Su.':
      tomorrow = 'Monday';
      dayAfterTomorow = 'Tuesday';
      twoDaysLater = 'Wednesday';
      break;
    case 'Mo.':
      tomorrow = 'Tuesday';
      dayAfterTomorow = 'Wednesday';
      twoDaysLater = 'Thursday';
      break;
    case 'Tu.':
      tomorrow = 'Wednesday';
      dayAfterTomorow = 'Thursday';
      twoDaysLater = 'Friday';
      break;
    case 'We.':
      tomorrow = 'Thursday';
      dayAfterTomorow = 'Friday';
      twoDaysLater = 'Saturday';
      break;
    case 'Th.':
      tomorrow = 'Friday';
      dayAfterTomorow = 'Saturday';
      twoDaysLater = 'Sunday';
      break;
    case 'Fr.':
      tomorrow = 'Saturday';
      dayAfterTomorow = 'Sunday';
      twoDaysLater = 'Monday';
      break;
    case 'Sa.':
      tomorrow = 'Sunday';
      dayAfterTomorow = 'Monday';
      twoDaysLater = 'Tuesday';
      break;
    case 'Nd.':
      tomorrow = 'Poniedziałek';
      dayAfterTomorow = 'Wtorek';
      twoDaysLater = 'Środa';
      break;
    case 'Pn.':
      tomorrow = 'Wtorek';
      dayAfterTomorow = 'Środa';
      twoDaysLater = 'Czwartek';
      break;
    case 'Wt.':
      tomorrow = 'Środa';
      dayAfterTomorow = 'Czwartek';
      twoDaysLater = 'Piątek';
      break;
    case 'Śr.':
      tomorrow = 'Czwartek';
      dayAfterTomorow = 'Piątek';
      twoDaysLater = 'Sobota';
      break;
    case 'Czw.':
      tomorrow = 'Piątek';
      dayAfterTomorow = 'Sobota';
      twoDaysLater = 'Niedziela';
      break;
    case 'Pt.':
      tomorrow = 'Sobota';
      dayAfterTomorow = 'Nidziela';
      twoDaysLater = 'Poniedziek';
      break;
    case 'So.':
      tomorrow = 'Niedziela';
      dayAfterTomorow = 'Poniedziale';
      twoDaysLater = 'Wtorek';
      break;
    default:
  }
}
function getTimeOfDay(dateObj) {
  if (dateObj.getHours() > 5 && dateObj.getHours() < 9) {
    timeOfDay = 'sunrise';
    return timeOfDay;
  } if (dateObj.getHours() >= 9 && dateObj.getHours() < 18) {
    timeOfDay = 'day';
    return timeOfDay;
  } if (dateObj.getHours() >= 18 && dateObj.getHours() < 23) {
    timeOfDay = 'sunrise';
    return timeOfDay;
  }
  timeOfDay = 'night';
  return timeOfDay;
}
function changeLanguage() {
  if (tempaeraturDescription.textContent.slice(0, 3) === 'Gen') {
    tempaeraturDescription.textContent = `Ogólnie ${description}`;
    tempaeraturDescriptionFeelsLike.textContent = `Temperatura Oczuwalna: ${convertToCelsius(tempFeels)} C`;
    tempaeraturDescriptionWindSpeed.textContent = `Prędkość Wiatru:" ${windSpeed} m/s`;
    tempaeraturDescriptionHumidity.textContent = `Wilgotność ${humidity} %`;
    getMonthName(currentDate);
    getDayOfweek(currentDate);
    presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;
    futureDays(dayOfWeek);
    tomorrowWeekday.innerHTML = tomorrow;
    dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
    twoDaysLaterWeekday.innerHTML = twoDaysLater;
  } else {
    tempaeraturDescription.textContent = `Generally ${description}`;
    tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${convertToCelsius(tempFeels)} C`;
    tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
    tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
    getMonthName(currentDate);
    getDayOfweek(currentDate);
    presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;
    futureDays(dayOfWeek);
    tomorrowWeekday.innerHTML = tomorrow;
    dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
    twoDaysLaterWeekday.innerHTML = twoDaysLater;
    console.log(description);
  }
}

function generateMap(latitude, longitude) {
  mymap = L.map('mapid').setView([longitude, latitude], 0);
  marker = L.marker([longitude, latitude]).addTo(mymap);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
}

function feelsLike(fDegrees) {
  return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${convertToCelsius(fDegrees)} C`;
}

function getSeason(dateObj) {
  if (dateObj.getMonth() >= 2 && dateObj.getMonth() < 5) {
    season = 'Spring';
  } else if (dateObj.getMonth() >= 5 && dateObj.getMonth() < 8) {
    season = 'Summer';
  } else if (dateObj.getMonth() >= 8 && dateObj.getMonth() > 10) {
    season = 'Autumn';
  } else {
    season = 'Winter';
  }
}
generateDate(currentDate);
futureDays(dayOfWeek);
getTimeOfDay(currentDate);
getSeason(currentDate);
presentTime.textContent = `${hours}:${minutes}`;
presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

changeDegreesButton.addEventListener('click', changeDegrees);


changeLanguageButton.addEventListener('click', changeLanguage);
changeBackgroundButton.addEventListener('click', () => {
  const allbackground = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
  const item = allbackground[Math.floor(Math.random() * allbackground.length)];
  document.body.style.backgroundImage = `url(background/${item}.jpg)`;
});
// Input field

submitButton.addEventListener('click', () => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue.value}&appid=8aa363e5bc059e6feaf9240302052c40`)
    .then((response) => response.json())
    .then((data) => parseDataSearch(data));
});


function parseDataSearch(data) {
  lat = data.city.coord.lat;
  long = data.city.coord.lon;
  const localTime = new Date();
  localTime.setUTCSeconds(localTime.getUTCSeconds() - 7200 + data.city.timezone);
  currentDate = localTime;
  dayOfWeek = getDayOfweek(localTime);
  futureDays(dayOfWeek);
  dayOfMonth = localTime.getDate();
  month = getMonthName(localTime);
  hours = localTime.getHours();
  minutes = localTime.getMinutes();


  presentTime.textContent = `${hours}:${minutes}`;
  presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

  country = data.city.country;
  region = data.city.name;
  locationTimezone.textContent = `${country}\\${region}`;

  description = data.list[0].weather[0].description;
  tempaeraturDescription.textContent = `Generally ${description}`;
  temp = data.list[0].main.temp;
  temperaturDegree.textContent = convertToCelsius(temp);
  windSpeed = data.list[0].wind.speed;
  tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
  humidity = data.list[0].main.humidity;
  tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;

  iconID = data.list[0].weather[0].icon;
  iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;
  iconID = data.list[0].weather[0].icon;
  document.body.style.backgroundImage = `url(background/${iconID}.jpg)`;
  tempFeels = data.list[0].main.feels_like;

  tomorrowWeekday.innerHTML = tomorrow;
  tomorrowTempDegrees = data.list[8].main.temp;
  tomorrowIcon.innerHTML = `<img src="./icons/${data.list[8].weather[0].icon}.png"/>`;
  tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`;
  dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
  dayAfterTomorowDegrees = data.list[16].main.temp;
  dayAfterTomorowIcon.innerHTML = `<img src="./icons/${data.list[16].weather[0].icon}.png"/>`;
  dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`;
  twoDaysLaterWeekday.innerHTML = twoDaysLater;
  twoDaysLaterDegrees = data.list[24].main.temp;
  twoDaysLaterIcon.innerHTML = `<img src="./icons/${data.list[24].weather[0].icon}.png"/>`;
  twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;


  marker.setLatLng([lat, long]);
  currentPostion.innerHTML = `Longitude: ${Math.round(long)}" ${Math.abs(Math.floor((long % 1) * 100))}'<br> Latitude: ${Math.round(lat)}"${Math.abs(Math.floor((lat % 1) * 100))}'`;
}
function parseDataStart(data) {
  temp = data.main.temp;
  description = data.weather[0].description;
  windSpeed = data.wind.speed;
  humidity = data.main.humidity;
  country = data.sys.country;
  region = data.name;
  iconID = data.weather[0].icon;


  iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;
  temperaturDegree.textContent = convertToCelsius(temp);
  tempaeraturDescription.textContent = `Generally ${description}`;
  tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
  tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
  locationTimezone.textContent = `${country}\\${region}`;

  currentPostion.innerHTML = `Longitude: ${Math.round(long)}" ${Math.abs(Math.floor((long % 1) * 100))}'<br> Latitude: ${Math.round(lat)}"${Math.abs(Math.floor((lat % 1) * 100))}'`;

  tempFeels = data.main.feels_like;
  document.body.style.backgroundImage = `url(background/${iconID}.jpg)`;
  generateMap(long, lat);
  return description;
}
function parseForecast(data) {
  tomorrowWeekday.innerHTML = tomorrow;
  tomorrowTempDegrees = data.daily[1].temp.day;
  tomorrowIcon.innerHTML = `<img src="./icons/${data.daily[1].weather[0].icon}.png"/>`;
  tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`;
  dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
  dayAfterTomorowDegrees = data.daily[2].temp.day;
  dayAfterTomorowIcon.innerHTML = `<img src="./icons/${data.daily[2].weather[0].icon}.png"/>`;
  dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`;
  twoDaysLaterWeekday.innerHTML = twoDaysLater;
  twoDaysLaterDegrees = data.daily[3].temp.day;
  twoDaysLaterIcon.innerHTML = `<img src="./icons/${data.daily[3].weather[0].icon}.png"/>`;
  twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;
}


function changeDegrees() {
  if (temperatureSpan.textContent === 'Farenheit') {
    temperatureSpan.textContent = 'Celsius';
    temperaturDegree.textContent = convertToCelsius(temp);
    tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`;
    dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`;
    twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;
  } else if (temperatureSpan.textContent === 'Celsius') {
    temperatureSpan.textContent = 'Farenheit';
    temperaturDegree.textContent = convertToFahrenheit(temp);
    tomorrowTemperature.innerHTML = `${convertToFahrenheit(tomorrowTempDegrees)}`;
    dayAfterTomorowTemperature.innerHTML = `${convertToFahrenheit(dayAfterTomorowDegrees)}`;
    twoDaysLaterTemperature.innerHTML = `${convertToFahrenheit(twoDaysLaterDegrees)}`;
  }
}

function parseFlickerData(data) {
  if (data.photos.photo.len === 0) {
    return 'No photos found';
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((postion) => {
    long = postion.coords.longitude;
    lat = postion.coords.latitude;
    key = '8aa363e5bc059e6feaf9240302052c40';
    const flickerKey = 'b9a53aa9b6e3ed91e9176b65393a1de4';

    console.log(currentDate);

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    const dailyApi = ` https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;
    const flickerApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickerKey}&tags=wallpaper&text=${timeOfDay}+${season}+&format=json&nojsoncallback=1`; // ${decription} undefined ?
    console.log(flickerApi);
    console.log(description);

    fetch(api)
      .then((response) => response.json())
      .then((data) => parseDataStart(data));

    fetch(dailyApi)
      .then((response) => response.json())
      .then((data) => parseForecast(data))


      .then(fetch(flickerApi)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        }));
  });
}
