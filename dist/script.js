"use strict";
//? Mockdata
const apiKey = "f5d21086c0e96fb934d7912aa22ea60e";
// Array of all cities
const cities = [
    { name: "Göteborg", lat: 57.7089, long: 11.9746 },
    { name: "Malmö", lat: 55.6050, long: 13.0038 },
    { name: "Linköping", lat: 58.4109, long: 15.6216 },
    { name: "Skellefteå", lat: 64.7500, long: 20.9500 },
    { name: "Umeå", lat: 63.8258, long: 20.2630 },
    { name: "Helsingborg", lat: 59.3333, long: 18.0667 },
    { name: "Stockholm", lat: 59.3333, long: 18.0667 }
];
// Global variable to store weather data
let globalWeatherData = [];
let errorMessage = document.getElementById("error-message");
let dataList = document.getElementById("data-list");
// Function to fetch data for a specific city
async function fetchCityWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=${apiKey}&units=metric&lang=sv`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
            switch (response.status) {
                case 400:
                    errorMessage.textContent = "Oops! Something went wrong with your request. An error has been sent to our IT. Please try again later.";
                    console.error("Invalid request (400). Check your URL.");
                    break;
                case 401:
                    errorMessage.textContent = "Access denied. An error has been sent to our IT. Please try again later.";
                    console.error("Unauthorized access (401). Invalid API key.");
                    break;
                case 404:
                    errorMessage.textContent = "We couldn't find what you're looking for. An error has been sent to our IT. Please try again later.";
                    console.error("Resource not found (404).");
                    break;
                case 429:
                    errorMessage.textContent = "You're making too many requests! Please wait a while before trying again.";
                    console.error("Too many requests (429). Max limit of 1000 searches per day reached.");
                    break;
                case 500:
                    errorMessage.textContent = "Something went wrong on our end. An error has been sent to our IT. Please try again later.";
                    console.error("Server error (500). Try again later.");
                    break;
                default:
                    errorMessage.textContent = "An unexpected error occurred. Please try again.";
                    console.error(`Unexpected error (${response.status}).`);
                    break;
            }
            return {
                name: city.name,
                temperature: "N/A",
                weatherDescription: "Error fetching data"
            };
        }
        const data = await response.json();
        return {
            name: city.name,
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description
        };
    }
    catch (error) {
        console.error(`Error fetching weather for ${city.name}:`, error);
        return {
            name: city.name,
            temperature: "N/A",
            weatherDescription: "Error fetching data"
        };
    }
}
// Fetch weather data for all cities
async function fetchAllCitiesWeather() {
    // Töm globalWeatherData innan vi fyller den med ny data
    globalWeatherData = [];
    // Loop över alla städer och hämta deras väderdata
    for (const city of cities) {
        const cityWeather = await fetchCityWeather(city);
        // Lägg till den hämtade datan till globalWeatherData
        globalWeatherData.push(cityWeather);
        // Logga för att kontrollera datan
        console.log(`Weather for ${cityWeather.name}: ${cityWeather.temperature}°C, ${cityWeather.weatherDescription}`);
    }
    // När vi har hämtat vädret för alla städer, visa väderkort
    displayCard();
}
// Kalla på funktionen för att hämta väderdata
fetchAllCitiesWeather();
function displayCard() {
    const weatherSection = document.getElementById("weather-cards");
    if (!weatherSection) {
        console.error("Elementet med id 'weather-cards' hittades inte.");
        return;
    }
    // Loop genom den verkliga väderdatan
    globalWeatherData.forEach((city) => {
        const card = document.createElement("article");
        const cityName = document.createElement("h2");
        const weather = document.createElement("p");
        const temperature = document.createElement("p");
        card.classList.add("card");
        cityName.classList.add("city");
        cityName.textContent = city.name;
        weather.classList.add("weather");
        weather.textContent = city.weatherDescription;
        temperature.classList.add("temperature");
        temperature.textContent = `${city.temperature}°C`;
        card.append(cityName, weather, temperature);
        weatherSection.append(card);
    });
}
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}
const weatherCards = cityWeather; //todo add cards
saveToLocalStorage('weatherCards', weatherCards); // runs saveToLocalStorage for each card in the array
/* Get data from local storage */
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    catch (error) {
        console.error(`Failed to retrieve data from local storage with key "${key}"`, error);
        return null;
    }
}
const retrievedWeatherCards = getFromLocalStorage('weatherCards');
console.log(retrievedWeatherCards); // This will log your array of cards
// todo: Function to assign icons to array objects
function assignIconsToCards(cards) {
    return cards.map((card) => ({
        ...card,
        icon: (() => {
            switch (card.weatherDescription) {
                case 'Regn':
                    return '🌧️';
                case 'Sol':
                case 'Klart':
                    return '☀️';
                case 'Molnigt':
                    return '🌥️';
                case 'Delvis molnigt':
                    return '🌤️';
                case 'Dimma':
                    return '🌫️';
                case 'Åska':
                    return '🌩️';
                case 'Snö':
                    return '❄️';
                case 'Storm':
                    return '⛈️🌪️';
                case 'Blåsigt':
                    return '💨';
                default:
                    return '';
            }
        })(),
    }));
}
const cardsWithIcons = assignIconsToCards(weatherCards);
console.log(cardsWithIcons);
displayCard(cardsWithIcons); //! runs the function and displays the cards
