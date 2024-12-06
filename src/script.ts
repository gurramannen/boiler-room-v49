//? Mockdata
type CityWeather = {
    name: string;
    icon?: string;
    weatherDescription: string;
    temperatur: number; 
  };

const cityWeather : CityWeather[] = [
    {
      name: "Göteborg",
      weatherDescription: "Sol",
      temperatur: 18, 
    },
    {
      name: "Malmö",
      weatherDescription: "Molnigt",
      temperatur: 15, 
    },
    {
      name: "Umeå",
      weatherDescription: "Klart",
      temperatur: 10, 
    },
  ];
  //? mockdata slut

function displayCard(array: CityWeather[]): void {
    console.log("displayCard is running for", array); //! test, remove this before production
    
    const weatherSection = document.getElementById("weather-cards") as HTMLElement | null;
    if (!weatherSection) {
      console.error("Elementet med id 'weather-cards' hittades inte.");
      return;
    }

    array.forEach((city) => { 
        const card: HTMLElement = document.createElement("article")
        const cityName: HTMLHeadingElement = document.createElement("h2");
        const weather: HTMLParagraphElement = document.createElement("p");
        const temperature: HTMLParagraphElement = document.createElement("p");

        card.classList.add("card");

        cityName.classList.add("city");
        cityName.textContent = city.name;

        if (city.icon) {
            const icon: HTMLParagraphElement = document.createElement("p");
            icon.classList.add("icon");
            icon.textContent = city.icon;
            card.appendChild(icon);
        }

        weather.classList.add("weather");
        weather.textContent = city.weatherDescription;

        temperature.classList.add("temperature");
        temperature.textContent = `${city.temperatur}°C`;
        
        card.append(cityName, weather, temperature);
        weatherSection.append(card);
    });
}



function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}

const weatherCards: CityWeather[] = cityWeather; //todo add cards
saveToLocalStorage('weatherCards', weatherCards); // runs saveToLocalStorage for each card in the array


/* Get data from local storage */
function getFromLocalStorage<T>(key: string): T | null {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) as T : null;
    } catch (error) {
        console.error(`Failed to retrieve data from local storage with key "${key}"`, error);
        return null;
    }
}

const retrievedWeatherCards = getFromLocalStorage<CityWeather[]>('weatherCards');
console.log(retrievedWeatherCards); // This will log your array of cards



// todo: Function to assign icons to array objects
function assignIconsToCards(cards: CityWeather[]): CityWeather[] { // todo: Replace placeholder strings with actual
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