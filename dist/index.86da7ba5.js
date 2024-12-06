//? Mockdata
const cityWeather = [
    {
        name: "G\xf6teborg",
        weatherDescription: "Sol",
        temperatur: 18
    },
    {
        name: "Malm\xf6",
        weatherDescription: "Molnigt",
        temperatur: 15
    },
    {
        name: "Ume\xe5",
        weatherDescription: "Klart",
        temperatur: 10
    }
];
//? mockdata slut
function displayCard(array) {
    console.log("displayCard is running for", array); //! test, remove this before production
    const weatherSection = document.getElementById("weather-cards");
    if (!weatherSection) {
        console.error("Elementet med id 'weather-cards' hittades inte.");
        return;
    }
    array.forEach((city)=>{
        const card = document.createElement("article");
        const cityName = document.createElement("h2");
        const weather = document.createElement("p");
        const temperature = document.createElement("p");
        card.classList.add("card");
        cityName.classList.add("city");
        cityName.textContent = city.name;
        if (city.icon) {
            const icon = document.createElement("p");
            icon.classList.add("icon");
            icon.textContent = city.icon;
            card.appendChild(icon);
        }
        weather.classList.add("weather");
        weather.textContent = city.weatherDescription;
        temperature.classList.add("temperature");
        temperature.textContent = `${city.temperatur}\xb0C`;
        card.append(cityName, weather, temperature);
        weatherSection.append(card);
    });
}
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}
const weatherCards = cityWeather; //todo add cards
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
// todo: Function to assign icons to array objects
function assignIconsToCards(cards) {
    return cards.map((card)=>({
            ...card,
            icon: (()=>{
                switch(card.weatherDescription){
                    case 'Regn':
                        return "\uD83C\uDF27\uFE0F";
                    case 'Sol':
                    case 'Klart':
                        return "\u2600\uFE0F";
                    case 'Molnigt':
                        return "\uD83C\uDF25\uFE0F";
                    case 'Delvis molnigt':
                        return "\uD83C\uDF24\uFE0F";
                    case 'Dimma':
                        return "\uD83C\uDF2B\uFE0F";
                    case "\xc5ska":
                        return "\uD83C\uDF29\uFE0F";
                    case "Sn\xf6":
                        return "\u2744\uFE0F";
                    case 'Storm':
                        return "\u26C8\uFE0F\uD83C\uDF2A\uFE0F";
                    case "Bl\xe5sigt":
                        return "\uD83D\uDCA8";
                    default:
                        return '';
                }
            })()
        }));
}
const cardsWithIcons = assignIconsToCards(weatherCards);
console.log(cardsWithIcons);
displayCard(cardsWithIcons); //! runs the function and displays the cards

//# sourceMappingURL=index.86da7ba5.js.map
