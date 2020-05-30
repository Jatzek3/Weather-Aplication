window.addEventListener('load', () => {
    let long;
    let lat;
    let key;

    let iconElement = document.querySelector(".weather-icon");
    let tempaeraturDescription = document.querySelector('.temperature-description');
    let temperaturDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (postion => {
            long = postion.coords.longitude;
            lat = postion.coords.latitude;
            key = '8aa363e5bc059e6feaf9240302052c40';

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
    // function seticons(icon, iconID){
    //     const skycons = new Skycons({color: "white"});
    //     const currennt = 
    // }
})