function displayCard() {
    const weatherSection = document.getElementById("weather-cards");
    const card = document.createElement("article");
    const cityName = document.createElement("h2");
    const weather = document.createElement("h3");
    const temperature = document.createElement("h3");
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

//# sourceMappingURL=index.86da7ba5.js.map
