type City = {
    name: string;
    lat: number;
    long: number;
  };
  
const cities = [
    { name: "Göteborg", lat: 57.7089, long: 11.9746 },
    { name: "Malmö", lat: 55.6050, long: 13.0038 },
    { name: "Linköping", lat: 58.4109, long: 15.6216 },
    { name: "Skellefteå", lat: 64.7500, long: 20.9500 },
    { name: "Umeå", lat: 63.8258, long: 20.2630 },
  ];
  console.log(cities);

type Card = { //! Card interface type, temporary
    city: string,
    icon?: string,
    weather: string,
    temperature: string,
    humidity?: string,
    wind?: string
}


function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}

const weatherCards: Card[] = [...]; //todo add cards
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

const citySelect = document.getElementById("city-select") as HTMLSelectElement;

// Kontrollera att elementet faktiskt hittas
if (!citySelect) {
  throw new Error("Elementet med id 'city-select' hittades inte.");
}

citySelect.addEventListener("change", () => {
    const selectedCityName = citySelect.value;
    const selectedCity = cities.find((city) => city.name === selectedCityName);
  
    if (selectedCity) {
      fetchWeather(selectedCity.lat, selectedCity.long);
    }
  });

const initialCity = cities[0];
fetchWeather(initialCity.lat, initialCity.long);
