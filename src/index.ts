// Import the API key
const apiKey: string = "f5d21086c0e96fb934d7912aa22ea60e";

type City = {
    name: string,
    lat: number,
    long: number
};

// Array of all cities
const cities: City[] = [
    { name: "Göteborg", lat: 57.7089, long: 11.9746 },
    { name: "Malmö", lat: 55.6050, long: 13.0038 },
    { name: "Linköping", lat: 58.4109, long: 15.6216 },
    { name: "Skellefteå", lat: 64.7500, long: 20.9500 },
    { name: "Umeå", lat: 63.8258, long: 20.2630 },
];

// Global variable to store weather data
let globalWeatherData: { name: string, temperature: string, weatherDescription: string }[] = [];

let errorMessage: HTMLElement = document.getElementById("error-message")!;
let dataList: HTMLElement = document.getElementById("data-list")!;

// Function to fetch data for a specific city
async function fetchCityWeather(city: City) {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=${apiKey}&units=metric&lang=sv`;
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

        // Save data globally
        return {
        globalWeatherData.push({
            name: city.name,
            temperature: data.main.temp.toString(),
            weatherDescription: data.weather[0].description
        })};

        // return {
        //     name: city.name,
        //     temperature: data.main.temp.toString(),
        //     weatherDescription: data.weather[0].description
        // };

    } catch (error) {
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
    for (const city of cities) {
        const cityWeather = await fetchCityWeather(city);

        // Optionally, log or display the data for each city
        console.log(`Weather for ${cityWeather.name}: ${cityWeather.temperature}°C, ${cityWeather.weatherDescription}`);

        // Update the UI with the fetched data
        const listItem = document.createElement("li");
        listItem.textContent = `${cityWeather.name}: ${cityWeather.temperature}°C, ${cityWeather.weatherDescription}`;
        dataList.appendChild(listItem);
    }

    // After all data has been fetched, you can log or process the global data
    console.log(globalWeatherData);
}

// Call the function to fetch all cities weather data
fetchAllCitiesWeather();
