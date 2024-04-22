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
        return weather.dt; // Return the timestamp if needed
    } catch (error) {
        console.error("Error:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateUI(weather) {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = weather.name;
    document.querySelector(".temp").innerHTML = Math.round(weather.main.temp) + `&deg;C`;
    document.querySelector(".humidity").innerHTML = weather.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = weather.wind.speed + ` km/h`;

    // Adjusting for timezone: weather.timezone gives offset in seconds from UTC
    const localTime = new Date((weather.dt * 1000) + (weather.timezone * 1000)); // Convert to milliseconds

    const hour = localTime.getHours(); // Get the local current hour in 24-hour format

    // Determine if it's day or night
    let partOfDay = 'day';
    if (hour >= 19 || hour < 6) { // Use night image after 7 PM or before 6 AM
        partOfDay = 'night';
    }
    
    // Set the image path based on the weather type and part of the day
    const weatherType = weather.weather[0].main;
    let imagePath = `/images/images/${weatherType}/${partOfDay}.png`; // Updated image path setting

    weatherIcon.src = imagePath;
    document.querySelector(".weather").style.display = "block";
    console.log(weatherType);
}

// Event listener for the search button click
searchBtn.addEventListener("click", function () {
    triggerSearch();
});

// Event listener for keypress in the search box
searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {  // Check if the key pressed is the Enter key
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
