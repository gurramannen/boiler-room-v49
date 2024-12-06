//? Mockdata
type CityWeather = {
    name: string;
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
      weatherDescription: "Molning",
      temperatur: 15, 
    },
    {
      name: "Umeå",
      weatherDescription: "Klart",
      temperatur: 10, 
    },
  ];
  //? mockdata slut

function displayCard(): void {
    const weatherSection = document.getElementById("weather-cards") as HTMLElement | null;
    if (!weatherSection) {
      console.error("Elementet med id 'weather-cards' hittades inte.");
      return;
    }

    cityWeather.forEach((city) => { 
        const card: HTMLElement = document.createElement("article")
        const cityName: HTMLHeadingElement = document.createElement("h2");
        const weather: HTMLParagraphElement = document.createElement("p");
        const temperature: HTMLParagraphElement = document.createElement("p");

        card.classList.add("card");

        cityName.classList.add("city");
        cityName.textContent = city.name;

        weather.classList.add("weather");
        weather.textContent = city.weatherDescription;

        temperature.classList.add("temperature");
        temperature.textContent = `${city.temperatur}°C`;
        
        card.append(cityName, weather, temperature);
        weatherSection.append(card);
    });
}

displayCard();


type Card = { //! Card interface type, temporary
    city: string,
    icon?: string,
    weather: string,
    temperature: string,
    humidity?: string,
    wind?: string
}

// mock-array with weather cards // todo gör så att icon läggs in
const cards: Card[] = [
    {
        city: 'Göteborg',
        weather: 'Regn',
        temperature: '5 °C',
    },
    {
        city: 'Malmö',
        weather: 'Sol',
        temperature: '8 °C',
    }
]


function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}

const weatherCards: Card[] = cards; //todo add cards
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

const retrievedWeatherCards = getFromLocalStorage<Card[]>('weatherCards');
console.log(retrievedWeatherCards); // This will log your array of cards



// todo: Function to assign icons to array objects
function assignIconsToCards(cards: Card[]): Card[] { // todo: Replace placeholder strings with actual
    return cards.map((card) => ({
        ...card,
        icon: (() => {
            switch (card.weather) {
                case 'Regn':
                    return '🌧️';
                case 'Sol':
                case 'Klart':
                    return '☀️';
                case 'Moln':
                    return '🌥️';
                case 'Delvis molnigt':
                    return '🌤️';
                case 'Dimma':
                    return '🌫️';
                case 'Storm':
                default:
                    return '';
            }
        })(),
    }));
}

const cardsWithIcons = assignIconsToCards(cards);
console.log(cardsWithIcons);