//? Mockdata
type CityWeather = {
    name: string;
    weatherDescription: string;
    temperatur: number; 
  };

const cityWeather : CityWeather[] = [
    {
      name: "Göteborg",
      weatherDescription: "Sunny with a few clouds",
      temperatur: 18, 
    },
    {
      name: "Malmö",
      weatherDescription: "Overcast with light rain",
      temperatur: 15, 
    },
    {
      name: "Umeå",
      weatherDescription: "Clear sky",
      temperatur: 10, 
    },
  ];

function displayCard(): void {
    const weatherSection = document.getElementById("weather-cards") as HTMLElement | null;
    if (!weatherSection) {
      console.error("Elementet med id 'weather-cards' hittades inte.");
      return;
    }

    cityWeather.forEach((city) => { //!väntar på Benji
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

