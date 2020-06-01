window.addEventListener('load', () => {
    let long;
    let lat;
    let key;
    let currentDate = new Date();

    let tempaeraturDescription = document.querySelector('.temperature-description');
    let temperaturDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let presentDate = document.querySelector('.present-date');
    let presentTime = document.querySelector('.present-time');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let iconElement = document.querySelector(".weather-icon");

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
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                const description = `${data.weather[0].description}
                                    Feels Like: Yet o be implemented
                                    Wind Speed: ${windSpeed} m/s
                                    Humidity: ${humidity} %` ;
                                    
                const country = data.sys.country;
                const region = data.name;
                const iconID = data.weather[0].icon;

                iconElement.innerHTML = `<img src="./icons/${iconID}.png"/>`;
                temperaturDegree.textContent = temp;
                tempaeraturDescription.textContent = description;
                locationTimezone.textContent = `${country}\\${region}`;
                    // Formula for Celsius
                    let celsius = Math.round(temp - 272.15);
                    // Formula for fahrenheit
                    let fahrenheit = Math.round((temp * 9)/ 5 - 459.67);

                temperatureSection.addEventListener('click',() =>{
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
                })
            });
        });
    }
})