let long;
let lat;
let key;
let country;
let region;
let iconID;
let temp;
let description;
let windSpeed;
let humidity;

let currentDate = new Date();

let tempaeraturDescription = document.querySelector('.temperature-description-general');
let tempaeraturDescriptionFeelsLike = document.querySelector('.temperature-description-feels-like');
let tempaeraturDescriptionWindSpeed = document.querySelector('.temperature-description-wind-speed');
let tempaeraturDescriptionHumidity = document.querySelector('.temperature-description-humidity');

let temperaturDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let presentDate = document.querySelector('.present-date');
let presentTime = document.querySelector('.present-time');
let temperatureSection = document.querySelector('.temperature-section');
let temperatureSpan = document.querySelector('.temperature-section span');
let iconElement = document.querySelector(".weather-icon");

let submitButton = document.querySelector('.submit-button')
let inputValue = document.querySelector('.inputValue')

let tomorrowWeekday = document.querySelector('.day1-weekday');
let tomorrowIcon = document.querySelector('.day1-icon');
let tomorrowTemperature = document.querySelector('.day1-temperature')
let dayAfterTomorowWeekday = document.querySelector('.day2-weekday');
let dayAfterTomorowIcon = document.querySelector('.day2-icon');
let dayAfterTomorowTemperature = document.querySelector('.day2-temperature');
let twoDaysLaterWeekday = document.querySelector('.day3-weekday');
let twoDaysLaterIcon = document.querySelector('.day3-icon');
let twoDaysLaterTemperature = document.querySelector('.day3-temperature');

let changeBackgroundButton = document.querySelector('.change-background');
let changeLanguageButton = document.querySelector('.change-language');
let changeDegreesButton = document.querySelector('.change-degree');

let currentPostion = document.querySelector('.coordinates');

// Time calculations

let getMonthName = function(dateObj) {
    let number = dateObj.getMonth();
    let abbr = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10:'November',
        11: 'December',
    }
    return abbr[number];
}

let getDayOfweek = function(dateObj) {
    let number = dateObj.getDay();
    let abbr = {
        0: 'Su.',
        1: 'Mo.',
        2: 'Tu.',
        3: 'We.',
        4: 'Th.',
        5: 'Fr.',
        6: 'Sa.',
    }
    return abbr[number];
}

let dayOfWeek = getDayOfweek(currentDate);
let dayOfMonth = currentDate.getDate();
let month = getMonthName(currentDate);
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

presentTime.textContent = `${hours}:${minutes}`;
presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

// Forecats data
let tomorrow;
let dayAfterTomorow
let twoDaysLater;

switch(dayOfWeek){
    case 'Su.':
        tomorrow = 'Mo.';
        dayAfterTomorow = 'Tu.';
        twoDaysLater = 'We.';
        break;
    case 'Mo.':
        tomorrow = 'Tu.';
        dayAfterTomorow = 'We.';
        twoDaysLater = 'Th.';
        break;
    case 'Tu.':
        tomorrow = 'We.';
        dayAfterTomorow = 'Th.';
        twoDaysLater = 'Fr.';
        break;
    case 'We.':
        tomorrow = 'Th.';
        dayAfterTomorow = 'Fr.';
        twoDaysLater = 'Sa.';
        break;
    case 'Th.':
        tomorrow = 'Fr.';
        dayAfterTomorow = 'Sa.';
        twoDaysLater = 'Su.';
        break;
    case 'Fr.':
        tomorrow ='Sa.';
        dayAfterTomorow = 'Su.';
        twoDaysLater ='Mo.';
        break;
    case 'Sa.':
        tomorrow = 'Su.';
        dayAfterTomorow ='Mo.';
        twoDaysLater = 'Tu.';
        break;     
}


// Degree calculations
function convertToCelsius(kelvins){
    return Math.round(kelvins - 272.15);
}
function convertToFahrenheit(kelvins){
    return Math.round((kelvins * 9)/ 5 - 459.67);
}
function feelsLike(fDegrees){
    if (temperatureSpan.textContent === 'C'){
        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like ${convertToCelsius(fDegrees)} C`;
    } else if (temperatureSpan.textContent === 'F') {
        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${convertToFahrenheit(fDegrees)} F`;
    } else {
        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${fDegrees} K`
    }
};

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition
    (postion => {
        long = postion.coords.longitude;
        lat = postion.coords.latitude;
        key = '8aa363e5bc059e6feaf9240302052c40';
        
        console.log(currentDate)

        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
        let dailyApi = ` https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;
        // let googleMapsApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuOL0Tzq6q9NAmt4xJOf8PqB4zYwBqvu4&callback=initMap"
        console.log(api);
        console.log(dailyApi);
        
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            temp  = data.main.temp;
            description = `${data.weather[0].description}`
            windSpeed = data.wind.speed;
            humidity = data.main.humidity;
                                
            country = data.sys.country;
            region = data.name;
            iconID = data.weather[0].icon;

            iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;
            temperaturDegree.textContent = temp;
            tempaeraturDescription.textContent = `Generally ${description}`;
            tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
            tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
            locationTimezone.textContent = `${country}\\${region}`;
            
            currentPostion.innerHTML = `Longitude: ${Math.round(long)} <br> Latitude: ${Math.round(lat)}`;


            feelsLike(data.main.feels_like);
            document.body.style.backgroundImage = `url(background/${iconID}.jpg)`
        });

        fetch(dailyApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            tomorrowWeekday.innerHTML = tomorrow;
            tomorrowIcon.innerHTML = `<img src="./icons/${data.daily[1].weather[0].icon}.png"/>`;
            tomorrowTemperature.innerHTML = `${convertToCelsius(data.daily[1].temp.day)} C`
            dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
            dayAfterTomorowIcon.innerHTML = `<img src="./icons/${data.daily[2].weather[0].icon}.png"/>`;
            dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(data.daily[2].temp.day)} C`
            twoDaysLaterWeekday.innerHTML = twoDaysLater;
            twoDaysLaterIcon.innerHTML = `<img src="./icons/${data.daily[3].weather[0].icon}.png"/>`;
            twoDaysLaterTemperature.innerHTML = `${convertToCelsius(data.daily[3].temp.day)} C`;
        });

    });
}
changeDegreesButton.addEventListener('click',() =>{
    if(temperatureSpan.textContent === 'K'){
        temperatureSpan.textContent = 'C';
        temperaturDegree.textContent = convertToCelsius(temp)
    } else if (temperatureSpan.textContent === 'C'){
        temperatureSpan.textContent = 'F';
        temperaturDegree.textContent = convertToFahrenheit(temp);
    } else {
        temperatureSpan.textContent = 'K';
        temperaturDegree.textContent = temp;
    }
});
changeLanguageButton.addEventListener('click',() =>{
    if (tempaeraturDescription.textContent.slice(0,3) ==='Gen'){
        tempaeraturDescription.textContent = `Ogólnie ${description}`;
        tempaeraturDescriptionFeelsLike.textContent = tempaeraturDescriptionFeelsLike.textContent.replace('Feels Like:', 'Temperatura Odczuwalna:');
        tempaeraturDescriptionWindSpeed.textContent = `Prędkość Wiatru:" ${windSpeed} m/s`;
        tempaeraturDescriptionHumidity.textContent = `Wilgotność ${humidity} %`
        } else {
        temperaturDegree.textContent = temp;
        tempaeraturDescription.textContent = `Generally ${description}`;
        tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
        tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
        }
});
changeBackgroundButton.addEventListener('click', () => {
    let allbackground = ['01d', '01n', '02d', '02n', '03d', '03n', '04d','04n','09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
    let item = allbackground[Math.floor(Math.random() * allbackground.length)];
    document.body.style.backgroundImage = `url(background/${item}.jpg)`;
})
// Input field

submitButton.addEventListener('click', function(){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue.value}&appid=8aa363e5bc059e6feaf9240302052c40`)
    .then(response => response.json())
    .then(data => 
    // Place the code for weather Here
        console.log(data))


    .catch(err => alert("Wrong city name!"))
})