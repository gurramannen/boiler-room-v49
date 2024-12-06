// mock-array with weather cards // todo gör så att icon läggs in
const cards = [
    {
        city: "G\xf6teborg",
        weather: 'Regn',
        temperature: "5 \xb0C"
    },
    {
        city: "Malm\xf6",
        weather: 'Sol',
        temperature: "8 \xb0C"
    }
];
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data to local storage with key "${key}"`, error);
    }
}
const weatherCards = cards; //todo add cards
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
                switch(card.weather){
                    case 'Regn':
                        return "\uD83C\uDF27\uFE0F";
                    case 'Sol':
                    case 'Klart':
                        return "\u2600\uFE0F";
                    case 'Moln':
                        return "\uD83C\uDF25\uFE0F";
                    case 'Delvis molnigt':
                        return "\uD83C\uDF24\uFE0F";
                    case 'Dimma':
                        return "\uD83C\uDF2B\uFE0F";
                    case 'Storm':
                    default:
                        return '';
                }
            })()
        }));
}
const cardsWithIcons = assignIconsToCards(cards);
console.log(cardsWithIcons);

//# sourceMappingURL=index.86da7ba5.js.map
