

const searchEl = document.getElementById("search");
let citySearchEl = document.getElementById("searchcity");
const currentIconId = document.getElementById("currentIcon");
const local_Key = "CitySearches";

searchEl.addEventListener("click", (event)=>{
    event.preventDefault();
    localStorage.reload;
    const city = citySearchEl.value;
    console.log(city);
    getCurrentWeather(city);
    storage(city);
    history(city)
  

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
const currentCity = document.getElementById("currentCity");
currentCity.textContent = "City "+weather.name;

// date
const currentDate =  document.getElementById("currentDate")
currentDate.textContent= moment(weather.dt.value).format("DD MMM YYYY");
// Current City Temp
// const currentTemp = document.createElement("h5");
const tempText = document.getElementById("tempText");
tempText.textContent = "Temp: " + weather.main.temp+"°F";
// Current City Wind 
// const currentWind = document.createElement("h5");
const windText = document.getElementById("windText");
windText.textContent = "Wind: " +  weather.wind.speed+" MPH";
// Current City Humidty
// const currentHum = document.createElement("h5");
const humText = document.getElementById("humText");
humText.textContent =  "Humidity: " +weather.main.humidity+" %";

currentWeatherId.append(currentIconId, currentCity, currentDate,tempText, windText, humText);

}


const forecastEl = document.querySelector(".forecast");

function daily(lon, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=b8763f38b9f069958af940db06d7fbe0&units=metric`).then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        displayForecast(data);

    
        // UV Index Current
        const uvIndex = document.getElementById("uvIndex")
        uvIndex.textContent="UV: " +data.current.uvi+ " %";
        const uvIndexNum = data.current.uvi;
      
        // Changing uv colors based on uv index levels
        if(uvIndexNum <=2){
            console.log(uvIndexNum);
            uvIndex.style.color = "green";
        }else if(uvIndexNum >= 3 && uvIndexNum <= 5){
            console.log("Levels 3 to 5");
            uvIndex.style.color = "orange";
    
        }else if(uvIndexNum > 6 && uvIndexNum <= 7){
            console.log("Levels 6 to 7");
            uvIndex.style.color = "orangered";
        }else if(uvIndexNum >= 8 && uvIndexNum <= 10){
            console.log("Levels 8 to 10");
            uvIndex.style.color = "purple";
           
        }
        else if(uvIndexNum > 11){
            console.log("Levels 11+");
                   };


        currentWeatherId.append(uvIndex);
  

})
}
function displayForecast(data){
 
    // add one day and create the start of the day
    let start = moment().tz(data.timezone).add(1, "day").startOf("day").unix();
    
    let end = moment().tz(data.timezone).add(6, "day").startOf("day").unix();

    for (var i=0; i < data.daily.length; i++){
    if (data.daily[i].dt >= start && data.daily[i].dt < end){

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

    dailyDate.textContent = moment(data.daily[i].dt*1000).format("D MMM YYYY");
    dailyTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
    dailyWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    dailyHum.textContent = "Humidity: " +  data.daily[i].humidity;
    iconImage.setAttribute("src", `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`)
    cardBody.append(dailyDate, dailyTemp, dailyWind, dailyHum);
    card.append(iconImage, cardBody);
    forecastEl.appendChild(card);
    }  

    }

}

// Local storage
const recentSearchEl = document.getElementById("pastSearch");
let saveList = [];

function storage (newCity) {
  console.log(newCity);  
    // const newCity = citySearchEl.value;
    saveList = JSON.parse(localStorage.getItem("Recent")) || []
    saveList.push(newCity);
    cityList = saveList
    console.log(cityList);
    localStorage.setItem("Recent", JSON.stringify(saveList)); 

    
}

function history(cityList){
        pastSearchEl = document.createElement("button"); 
        pastSearchEl.textContent = cityList;
        pastSearchEl.classlist = "d-flex w-100";
        pastSearchEl.setAttribute("type", "submit");
        pastSearchEl.setAttribute("class", "historyBtn")
        pastSearchEl.setAttribute("value", cityList)
    
        searchHistoryEl.prepend(pastSearchEl);

    
}



let searchHistoryEl = document.querySelector("#searchHistory")
// let pastSearchEl;
const historyBtn = document.querySelector(".historyBtn")

searchHistoryEl.addEventListener("click", function(e) {
    e.preventDefault()
    
let city = this.event

console.log(".historyBtn");
console.log(city);

});



// addEventListener("click", (event) => {
  


//     })

    

// });



// 




    
    
    




















