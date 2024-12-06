
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
                case 'Sol' || 'Klart':
                    return '☀️';
                case 'Moln':
                    return '🌥️';
                case 'Delvis molnigt':
                    return '🌤️';
                default:
                    return '';
            }
        })(),
    }));
}

const cardsWithIcons = assignIconsToCards(cards);
console.log(cardsWithIcons);