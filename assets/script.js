fetch("https://api.openweathermap.org/data/2.5/forecast?q=Birmingham&appid=b8763f38b9f069958af940db06d7fbe0").then(function (res) {
    return res.json();
})
.then(function (data) {
    console.log(data);
});

// let weatherFormEl = document.querySelector("#weatherform");


// const searchEngine = function (event) {
//     event.preventDefault();

    

// }

const searchEl = document.getElementById("search");
const citySearchEl = document.getElementById("searchcity"); 

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
    // console.log(data);
    displayWeather(data);
});

}

// Current Weather conditons
const currentWeatherId = document.getElementById("currentWeather");

function displayWeather(weather) {
console.log(weather);

// Current City
const currentCity = document.createElement("h2");
currentCity.textContent = "City "+weather.name;



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

// UV Index 


currentWeatherId.append(currentCity, currentTemp, tempText, currentWind, windText, currentHum, humText);

}

function forecast() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Birmingham&appid=b8763f38b9f069958af940db06d7fbe0").then(function (res) {
        return res.json();
    })
    .then(function(data) {
    
    for (var i = 0; i < 5;i++)

    });

}


















