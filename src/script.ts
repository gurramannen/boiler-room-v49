function displayCard(): void {
const weatherSection: HTMLElement | null = document.getElementById("weather-cards") as HTMLElement;
const card: HTMLElement = document.createElement("article")
const cityName: HTMLHeadElement = document.createElement("h2");
const weather: HTMLElement = document.createElement("h3");
const temperature: HTMLElement = document.createElement("h3");

card.append(cityName);
card.classList.add("card");

cityName.classList.add("city");
cityName.textContent = "TBA";

card.append(weather);
weather.classList.add("weather");
weather.textContent = "TBA";

card.append(temperature);
temperature.classList.add("temperature");
temperature.textContent = "TBA";

weatherSection.append(card);
}

displayCard();

