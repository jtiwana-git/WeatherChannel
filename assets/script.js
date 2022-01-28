

const searchEl = document.getElementById("search");
const citySearchEl = document.getElementById("searchcity");
const dayOneEl = document.getElementById("dayone");
const dayTwoEl = document.getElementById("daytwo");
const dayThreeEl = document.getElementById("daythree");
const dayFourEl = document.getElementById("dayfour");
const dayFiveEl = document.getElementById("dayfive");
const currentIconId = document.getElementById("currentIcon");


searchEl.addEventListener("click", (event)=>{
    event.preventDefault();
    const city = citySearchEl.value;
    console.log(city);
    getCurrentWeather(city);
  

});



function getCurrentWeather(city){
console.log(city);

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8763f38b9f069958af940db06d7fbe0&units=metric`).then(function (res) {
    return res.json();
})
.then(function (data) {
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    displayWeather(data);
    daily(lon, lat);
});

}

// Current Weather conditons
const currentWeatherId = document.getElementById("currentWeather");

function displayWeather(weather) {
console.log(weather);

// Current Icon
currentIconId.setAttribute("src", `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
currentWeatherId.append(currentIconId);


// Current City
const currentCity = document.createElement("h2");
currentCity.textContent = "City "+weather.name;

// date

const currentDate = document.createElement("h2");
currentDate.textContent = "Date "+weather.dt*1000(format("DDDD DDD MMM YY"));



// Current City Temp
const currentTemp = document.createElement("h5");
const tempText = document.createElement("p");
currentTemp.textContent = "Temp";
tempText.textContent = weather.main.temp;

// Current City Wind 
const currentWind = document.createElement("h2");
const windText = document.createElement("p");
currentWind.textContent = "Wind";
windText.textContent = weather.wind.speed+" MPH";

// Current City Humidty
const currentHum = document.createElement("h2");
const humText = document.createElement("p");
currentHum.textContent = "Humidity";
humText.textContent = weather.main.humidity+" %";

currentWeatherId.append(currentCity, currentTemp, currentDate, tempText, currentWind, windText, currentHum, humText);

}

const forecastSearch = citySearchEl.value;
const forecastEl = document.querySelector(".forecast");

function daily(lon, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=b8763f38b9f069958af940db06d7fbe0&units=metric`).then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        displayForecast(data);
        // UV Index Current
        const uvIndex = document.createElement("p");
        uvIndex.textContent=data.current.uvi;
        currentWeatherId.append(uvIndex);
  

})
}
function displayForecast(data){
    const forecast = 5;
        for (var i=0;i < forecast; i++){
    const iconImage = document.createElement("img");
    const column = document.createElement("div");
    column.setAttribute("class", "col-5");
    const dailyTemp = document.createElement("p");
    const dailyHum =document.createElement("p");
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    
    dailyTemp.setAttribute("class","card-text");
    dailyHum.setAttribute("class","card-text");

    dailyTemp.textContent = data.daily[i].temp.day;
    dailyHum.textContent = data.daily[i].humidity;
    iconImage.setAttribute("src", `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`)
    cardBody.append(dailyTemp, dailyHum);
    card.append(iconImage, cardBody);
    column.append(card)
    forecastEl.append(column);


    }


}



    
    
    




















