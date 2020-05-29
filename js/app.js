window.addEventListener('load', () => {
    let long;
    let lat;
    let key;
    let tempaeraturDescription = document.querySelector('.temperature-description');
    let tempaeraturDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');

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
            .then(data =>{
                console.log(data);
                const { temp } = data.main;
                const description = data.weather[0].description;
                const country = data.sys.country;
                // // const region = data.main[name];
                // console.log(region)
                // console.log(country)
                // Set Dom Elements from the API
                tempaeraturDegree.textContent = temp;
                tempaeraturDescription.textContent = description;
                locationTimezone.textContent = country;
                    // Formula for Celsius
                    let celsius = temp - 272.15;
                    let fahrenheit = Math.round((temp * 9)/ 5 - 459.67);

                temperatureSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === 'K'){
                        temperatureSpan.textContent = 'C';
                        tempaeraturDegree.textContent = celsius
                    } else if (temperatureSpan.textContent === 'C'){
                        temperatureSpan.textContent = 'F';
                        tempaeraturDegree.textContent = fahrenheit;
                    } else {
                        temperatureSpan.textContent = 'K';
                        tempaeraturDegree.textContent = temp;
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