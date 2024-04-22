const apiKey = '4abe666d851d3d5cf8e8d6693f2ea568';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Global variable to store weather data
let globalWeatherData = {};

async function checkWeather(cityName) {
    try {
        const response = await fetch(url + cityName + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const weather = await response.json();
        globalWeatherData = weather; // Store the fetched data globally

        updateUI(weather);
        timeProcess(weather); // Update the UI using the fetched weather data
        return weather.dt; // Return the timestamp if needed
    } catch (error) {
        console.error("Error:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateUI(weather) {
    document.querySelector(".city").innerHTML = weather.name;
    document.querySelector(".temp").innerHTML = Math.round(weather.main.temp) + `&deg;C`;
    document.querySelector(".humidity").innerHTML = weather.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = weather.wind.speed + ` km/h`;

    let imagePath = '/images/images/';
    const weatherType = weather.weather[0].main;
    imagePath += `${weatherType}/day.png`; // Simplified image path setting

    weatherIcon.src = imagePath;
    document.querySelector(".weather").style.display = "block";

    console.log("Weather Type:", weatherType);
    console.log("Timestamp:", weather.dt);
}


function timeProcess(weather) {
    if (weather.dt) {
        const date = new Date(weather.dt * 1000); // Convert epoch time to milliseconds
        const formattedDate = date.toLocaleString(); // Format the date and time in a human-readable form
        console.log("Processed Date and Time:", formattedDate);
        // You can further manipulate or display this date in your UI
    } else {
        console.log("No valid timestamp available.");
    }
    
}


searchBtn.addEventListener("click", function () {
    const cityName = searchBox.value.trim();
    if (!cityName) {
        alert("Please enter the city name before submitting.");
        return;
    }
    checkWeather(cityName);
    searchBox.value = ''; // Clear the search box after the search
});
