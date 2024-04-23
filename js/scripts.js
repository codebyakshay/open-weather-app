
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Global variable to store weather data
let globalWeatherData = {};

async function checkWeather(cityName) {
    try {
        const response = await fetch(weatherUrl + cityName + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const weather = await response.json();
        globalWeatherData = weather; // Store the fetched data globally
        updateUI(weather);
        return weather;

    } catch (error) {
        console.error("Error:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateUI(weather) {

    var city = weather.name;
    getLocalTime(city, weather);
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = weather.name;
    document.querySelector(".temp").innerHTML = Math.round(weather.main.temp) + `&deg;C`;
    document.querySelector(".humidity").innerHTML = weather.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = weather.wind.speed + ` km/h`;
    document.querySelector(".weather").style.display = "block";
    
    
}

async function getLocalTime(city, weather) {
    const timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=&location=`;
    try {
        
        const response = await fetch(timeUrl + city);
        const timeData = await response.json();
        const timeInHours = parseInt(timeData.time_24.split(':')[0], 10);
        const imageUrl = 'images/'
        const weatherType = weather.weather[0].main;
        const weatherIcon = document.querySelector(".weather-icon");
        // Checking the time range and logging the appropriate message
        if (timeInHours >= 6 && timeInHours <= 17) {
            weatherIcon.src = ``;
            weatherIcon.src = `${imageUrl}${weatherType}/day.png`;
            weatherIcon.setAttribute("title", weatherType + " day");

        } else {
            weatherIcon.src = ``;
            weatherIcon.src = `${imageUrl}${weatherType}/night.png`;
            weatherIcon.setAttribute("title", weatherType + " night");
        }

    } catch (error) {
        console.error('Failed to fetch time data:', error);
    }
}


// Event listener for the search button click
searchBtn.addEventListener("click", function () {
    triggerSearch();
});

// Event listener for keypress in the search box
searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        triggerSearch();
    }
});

// Function to handle the search trigger
function triggerSearch() {
    const cityName = searchBox.value;
    if (!cityName) {
        alert("Please enter the city name before submitting.");
        return;
    }

    checkWeather(cityName);
    searchBox.value = ''; // Clear the search box after the search
}
