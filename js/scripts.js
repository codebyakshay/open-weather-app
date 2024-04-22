const apiKey = '4abe666d851d3d5cf8e8d6693f2ea568';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    try {
        const response = await fetch(url + cityName + `&appid=${apiKey}`);
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {

            const weather = await response.json();
            const time = weather.dt;
            document.querySelector(".city").innerHTML = weather.name;
            document.querySelector(".temp").innerHTML = Math.round(weather.main.temp) + `&deg;C`;
            document.querySelector(".humidity").innerHTML = weather.main.humidity + `%`;
            document.querySelector(".wind").innerHTML = weather.wind.speed + ` km/h`;


            let imagePath = '/images/images/'
            let weatherType = weather.weather[0].main
            switch (weatherType) {

                case "Clear":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;

                case "Clouds":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;
                    
                case "Snow":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;

                case "Rain":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;

                case "Drizzle":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;
                
                case "Thunderstorm":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;

                case "Fog":
                    imagePath = imagePath + `${weather.weather[0].main}.png`
                    break;


                default:
                    imagePath = imagePath + "Clear.png"
                    break;
            }

            weatherIcon.src = imagePath;
            document.querySelector(".weather").style.display = "block";
            
            console.log(time);
            
        }
        function convertUnixTimeToReadable(time) {
            const date = new Date(unixTimestamp * 1000);
        
        
            const formattedDate = date.toLocaleDateString();  
            const formattedTime = date.toLocaleTimeString(); 
            console.log(`${formattedDate} ${formattedTime}`);
            return `${formattedDate} ${formattedTime}`;
        }
         
    }
    
    catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }

}


searchBtn.addEventListener("click", function () {
    const cityName = searchBox.value;
    if (!cityName) {
        alert("Please enter the city name before submitting.");
    } else {
        checkWeather(cityName);
        convertUnixTimeToReadable(time);  
        searchBox.value = ''; 
    }
});

