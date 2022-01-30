

const searchEl = document.getElementById("search");
let citySearchEl = document.getElementById("searchcity");
const currentIconId = document.getElementById("currentIcon");
const local_Key = "CitySearches";


searchEl.addEventListener("click", (event)=>{
    event.preventDefault();
    const city = citySearchEl.value;
    console.log(city);
    getCurrentWeather(city);
    storage(citySearchEl);
  

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
// currentWeatherId.append();


// Current City
const currentCity = document.createElement("h4");
currentCity.textContent = "City "+weather.name;

// date
const currentDate =  document.createElement("h4")
currentDate.textContent= moment(weather.dt.value).format("DD MMM YYYY");
// Current City Temp
const currentTemp = document.createElement("h5");
const tempText = document.createElement("h5");
tempText.textContent = "Temp: " + weather.main.temp+"°F";
// Current City Wind 
const currentWind = document.createElement("h5");
const windText = document.createElement("h5");
windText.textContent = "Wind: " +  weather.wind.speed+" MPH";
// Current City Humidty
const currentHum = document.createElement("h5");
const humText = document.createElement("h5");
humText.textContent =  "Humidity: " +weather.main.humidity+" %";

currentWeatherId.append(currentIconId, currentCity, currentDate, currentTemp,tempText, currentWind, windText, currentHum, humText);

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
        const uvIndex = document.createElement("h5")
        uvIndex.textContent="UV: " +data.current.uvi+ " %";
        const uvIndexNum = data.current.uvi;
      
        // Changing uv colors based on uv index levels
        if(uvIndexNum <=2){
            console.log("Levels 0 to 2");
            uvIndex.style.color = "green";
        }else if(uvIndexNum >=3 && uvIndexNum<=5){
            console.log("Levels 3 to 5");
            uvIndex.style.color = "orange";
    
        }else if(uvIndexNum >6 && uvIndexNum <=7){
            console.log("Levels 6 to 7");
            uvIndex.style.color = "orangered";
        }else if(uvIndexNum >=8 && uvIndexNum <=10){
            console.log("Levels 8 to 10");
            uvIndex.style.color = "purple";
           
        }
        else if(uvIndexNum >11){
            console.log("Levels 11+");
                   };


        currentWeatherId.append(uvIndex);
  

})
}
function displayForecast(data){
    const forecast = 5;
        for (var i=0;i < forecast; i++){
    
    const iconImage = document.createElement("img");
    const column = document.createElement("div");
    column.setAttribute("class", "col");
    const dailyDate = document.createElement("h6");
    const dailyTemp = document.createElement("h6");
    const dailyHum =document.createElement("h6");
    const dailyWind = document.createElement("h6");
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    
    dailyTemp.setAttribute("class","card-text");
    dailyHum.setAttribute("class","card-text");


// currentDate.textContent= moment(weather.dt.value).format("D MMM YYYY");

    dailyDate.textContent = moment(data.daily[i].dt*1000).format("D MMM YYYY");
    dailyTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
    dailyWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    dailyHum.textContent = "Humidity: " +  data.daily[i].humidity;
    iconImage.setAttribute("src", `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`)
    cardBody.append(dailyDate, dailyTemp, dailyWind, dailyHum);
    card.append(iconImage, cardBody);
    column.append(card)
    forecastEl.append(column);


    }

}

// Local storage
const recentSearchEl = document.getElementById("pastSearch");

function storage (citySearchEl) {


    
    localStorage.setItem("Recent", citySearchEl.value);
 
 
    debugger;
    
}









    
    
    




















