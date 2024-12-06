//? Mockdata
const cityWeather = [
    {
        name: "G\xf6teborg",
        weatherDescription: "Sol",
        temperatur: 18
    },
    {
        name: "Malm\xf6",
        weatherDescription: "Molning",
        temperatur: 15
    },
    {
        name: "Ume\xe5",
        weatherDescription: "Klart",
        temperatur: 10
    }
];
//? mockdata slut
function displayCard() {
    const weatherSection = document.getElementById("weather-cards");
    if (!weatherSection) {
        console.error("Elementet med id 'weather-cards' hittades inte.");
        return;
    }
    cityWeather.forEach((city)=>{
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
        temperature.textContent = `${city.temperatur}\xb0C`;
        card.append(cityName, weather, temperature);
        weatherSection.append(card);
    });
}
displayCard();
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}
// const weatherCards: Card[] = [...]; //todo add cards
saveToLocalStorage('weatherCards', weatherCards); // runs saveToLocalStorage for each card in the array
/* Get data from local storage */ function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Failed to retrieve data from local storage with key "${key}"`, error);
        return null;
    }
}
const retrievedWeatherCards = getFromLocalStorage('weatherCards');
console.log(retrievedWeatherCards); // This will log your array of cards

//# sourceMappingURL=index.86da7ba5.js.map
