window.addEventListener('load', () => {
    let long;
    let lat;
    let key;
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

    let changeDegreesButton = document.querySelector('.change-degree');
    let changeLanguageButton = document.querySelector('.change-language');

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


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (postion => {
            long = postion.coords.longitude;
            lat = postion.coords.latitude;
            key = '8aa363e5bc059e6feaf9240302052c40';
            console.log(currentDate)

            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            console.log(api);
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temp } = data.main;
                const description = `${data.weather[0].description}`
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                const feelsLike = function(fDegrees){
                    if (temperatureSpan.textContent === 'C'){
                        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like ${Math.floor(fDegrees - 272.15)} C`;
                    } else if (temperatureSpan.textContent === 'F') {
                        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${Math.round((fDegrees * 9)/ 5 - 459.67)} F`;
                    } else {
                        return tempaeraturDescriptionFeelsLike.textContent = `Feels Like: ${fDegrees} K`
                    }
                };

                                    
                const country = data.sys.country;
                const region = data.name;
                const iconID = data.weather[0].icon;

                iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;
                temperaturDegree.textContent = temp;
                tempaeraturDescription.textContent = `Generally ${description}`;
                tempaeraturDescriptionWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
                tempaeraturDescriptionHumidity.textContent = `Humidity: ${humidity} %`;
                locationTimezone.textContent = `${country}\\${region}`;
                    // Formula for Celsius
                    let celsius = Math.round(temp - 272.15);
                    // Formula for fahrenheit
                    let fahrenheit = Math.round((temp * 9)/ 5 - 459.67);

                changeDegreesButton.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === 'K'){
                        temperatureSpan.textContent = 'C';
                        temperaturDegree.textContent = celsius
                    } else if (temperatureSpan.textContent === 'C'){
                        temperatureSpan.textContent = 'F';
                        temperaturDegree.textContent = fahrenheit;
                    } else {
                        temperatureSpan.textContent = 'K';
                        temperaturDegree.textContent = temp;
                    }
                    feelsLike(data.main.feels_like);
                })
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
                        feelsLike(data.main.feels_like);
                        }
                })
                feelsLike(data.main.feels_like);
            });
        });
    }
})