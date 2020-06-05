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
let tomorrow;
let tomorrowTempDegrees
let dayAfterTomorow
let dayAfterTomorowDegrees
let twoDaysLater;
let twoDaysLaterDegrees;
let dayOfWeek;
let dayOfMonth;
let month;
let hours;
let minutes;
let tempFeels;

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
let tomorrowTemperatureSpan = document.querySelector('.day1-temperature span')
let dayAfterTomorowWeekday = document.querySelector('.day2-weekday');
let dayAfterTomorowIcon = document.querySelector('.day2-icon');
let dayAfterTomorowTemperature = document.querySelector('.day2-temperature');
let dayAfterTomorowTemperatureSpan = document.querySelector('.day2-temperature span');
let twoDaysLaterWeekday = document.querySelector('.day3-weekday');
let twoDaysLaterIcon = document.querySelector('.day3-icon');
let twoDaysLaterTemperature = document.querySelector('.day3-temperature');
let twoDaysLaterTemperatureSpan = document.querySelector('.day3-temperature span');

let changeBackgroundButton = document.querySelector('.change-background');
let changeLanguageButton = document.querySelector('.change-language');
let changeDegreesButton = document.querySelector('.change-degree');

let currentPostion = document.querySelector('.coordinates');

// Time calculations

let getMonthName = function(dateObj) {
    let number = dateObj.getMonth();
    let abbr = {
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
        10:['November', 'Listopad'],
        11:['December', 'Grudzień']
    }    
    if (tempaeraturDescription.textContent.slice(0,2) ==='Og'){
        month = abbr[number][1];
        return abbr[number][1];
    } else {
    month = abbr[number][0];
    return abbr[number][0];
    }
}

let getDayOfweek = function(dateObj) {
    let number = dateObj.getDay();
    let abbr = {
        0: ['Su.', 'Nd.'],
        1: ['Mo.', 'Pn.'],
        2: ['Tu.', 'Wt.'],
        3: ['We.', 'Śr.'],
        4: ['Th.', 'Czw.'],
        5: ['Fr.', 'Pt.'],
        6: ['Sa.', 'So.'],
    }    
    if (tempaeraturDescription.textContent.slice(0,2) ==='Og'){
        console.log(abbr[number][1]);
        dayOfWeek = abbr[number][1];
        return abbr[number][1];
    } else {
    console.log(abbr[number][0]);
    dayOfWeek = abbr[number][0];
    return abbr[number][0];
    }
}

dayOfWeek = getDayOfweek(currentDate);
dayOfMonth = currentDate.getDate();
month = getMonthName(currentDate);
hours = currentDate.getHours();
minutes = currentDate.getMinutes();
futureDays(dayOfWeek);

presentTime.textContent = `${hours}:${minutes}`;
presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

// Forecats data
function futureDays(abbr){
    switch(abbr){
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
            tomorrow ='Saturday';
            dayAfterTomorow = 'Sunday';
            twoDaysLater ='Monday';
            break;
        case 'Sa.':
            tomorrow = 'Sunday';
            dayAfterTomorow ='Monday';
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
    }
}
// Degree calculations
function convertToCelsius(kelvins){
    return Math.round(kelvins - 272.15);
}
function convertToFahrenheit(kelvins){
    return Math.round((kelvins * 9)/ 5 - 459.67);
}
function feelsLike(fDegrees){
        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${convertToCelsius(fDegrees)} C`;
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
            temperaturDegree.textContent = convertToCelsius(temp);
            tempaeraturDescription.textContent = `Generally ${description}`;
            tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
            tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
            locationTimezone.textContent = `${country}\\${region}`;
            
            currentPostion.innerHTML = `Longitude: ${Math.round(long)} <br> Latitude: ${Math.round(lat)}`;


            tempFeels = data.main.feels_like;
            document.body.style.backgroundImage = `url(background/${iconID}.jpg)`
        });

        fetch(dailyApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            tomorrowWeekday.innerHTML = tomorrow;
            tomorrowTempDegrees = data.daily[1].temp.day;
            tomorrowIcon.innerHTML = `<img src="./icons/${data.daily[1].weather[0].icon}.png"/>`;
            tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`
            dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
            dayAfterTomorowDegrees = data.daily[2].temp.day;
            dayAfterTomorowIcon.innerHTML = `<img src="./icons/${data.daily[2].weather[0].icon}.png"/>`;
            dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`;
            twoDaysLaterWeekday.innerHTML = twoDaysLater;
            twoDaysLaterDegrees = data.daily[3].temp.day;
            twoDaysLaterIcon.innerHTML = `<img src="./icons/${data.daily[3].weather[0].icon}.png"/>`;
            twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;
        });

    });
}
changeDegreesButton.addEventListener('click',() =>{
    if(temperatureSpan.textContent === 'F'){
        temperatureSpan.textContent = 'C';
        temperaturDegree.textContent = convertToCelsius(temp);
        tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`
        dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`;
        twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;
    } else if (temperatureSpan.textContent === 'C'){
        temperatureSpan.textContent = 'F';
        temperaturDegree.textContent = convertToFahrenheit(temp);
        tomorrowTemperature.innerHTML = `${convertToFahrenheit(tomorrowTempDegrees)}`
        dayAfterTomorowTemperature.innerHTML = `${convertToFahrenheit(dayAfterTomorowDegrees)}`;
        twoDaysLaterTemperature.innerHTML = `${convertToFahrenheit(twoDaysLaterDegrees)}`;
    }
});

changeLanguageButton.addEventListener('click',() =>{
    if (tempaeraturDescription.textContent.slice(0,3) ==='Gen'){
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
    .then(data => {

        let localTime = new Date;
        localTime.setUTCSeconds(localTime.getUTCSeconds() - 7200 + data.city.timezone);
        currentDate = localTime;
        console.log(localTime)

        dayOfWeek = getDayOfweek(localTime);
        futureDays(dayOfWeek);
        dayOfMonth = localTime.getDate();
        month = getMonthName(localTime);
        hours = localTime.getHours();
        minutes = localTime.getMinutes();


        presentTime.textContent = `${hours}:${minutes}`;
        presentDate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

        console.log(data)
        country = data.city.country;
        region = data.city.name;
        locationTimezone.textContent = `${country}\\${region}`;

        description = data.list[0].weather[0].description;
        tempaeraturDescription.textContent = `Generally ${description}`;

        temp  =convertToCelsius(data.list[0].main.temp);
        temperaturDegree.textContent = temp;

        windSpeed = data.list[0].wind.speed;
        tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
        humidity = data.list[0].main.humidity;
        tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;

        iconID = data.list[0].weather[0].icon;
        iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;

        iconID = data.list[0].weather[0].icon;
        document.body.style.backgroundImage = `url(background/${iconID}.jpg)`
        tempFeels = data.list[0].main.feels_like;

        tomorrowWeekday.innerHTML = tomorrow;
        tomorrowTempDegrees = data.list[8].main.temp;
        tomorrowIcon.innerHTML = `<img src="./icons/${data.list[8].weather[0].icon}.png"/>`;
        tomorrowTemperature.innerHTML = `${convertToCelsius(tomorrowTempDegrees)}`
        dayAfterTomorowWeekday.innerHTML = dayAfterTomorow;
        dayAfterTomorowDegrees = data.list[16].main.temp;
        dayAfterTomorowIcon.innerHTML = `<img src="./icons/${data.list[16].weather[0].icon}.png"/>`;
        dayAfterTomorowTemperature.innerHTML = `${convertToCelsius(dayAfterTomorowDegrees)}`
        twoDaysLaterWeekday.innerHTML = twoDaysLater; 
        twoDaysLaterDegrees = data.list[24].main.temp;
        twoDaysLaterIcon.innerHTML = `<img src="./icons/${data.list[24].weather[0].icon}.png"/>`;
        twoDaysLaterTemperature.innerHTML = `${convertToCelsius(twoDaysLaterDegrees)}`;

    })
})
