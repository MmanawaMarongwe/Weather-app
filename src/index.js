
function displayTime(){

  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

   let day = weekDays[now.getDay()];
   let hour = now.getHours();
   let minutes = now.getMinutes();
   return `${day} ${hour}:${minutes}`;
}

   let realtime = document.querySelector("#current-time");
   realtime.innerHTML = displayTime();

function showJohannesburg(){
  function displayJohannesburg(response){
    let city = document.querySelector("#current-city");
    let temperature = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    let temp = document.querySelector("#temperature");
    temp.innerHTML = `${temperature}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = ` ${response.data.main.humidity}%`
    let wind = document.querySelector("#windspeed");
    wind.innerHTML =`${response.data.wind.speed} km/h`;
    }
  
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let defaultCity = "Johannesburg"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayJohannesburg);
  }
  

function searchedLocationWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temperature");
    temp.innerHTML = `${temperature}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = ` ${response.data.main.humidity}%`;
    let wind = document.querySelector("#windspeed");
    wind.innerHTML =`${response.data.wind.speed} km/h`;
  }

  function currentLocationWeather(response) {
    let city = document.querySelector("#current-city");
    let temperature = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    let temp = document.querySelector("#temperature");
    temp.innerHTML = `${temperature}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = ` ${response.data.main.humidity}%`;
    let wind = document.querySelector("#windspeed");
    wind.innerHTML =`${response.data.wind.speed} km/h`;
  }

function changeCity(event){
    event.preventDefault();
    let cityResult = document.querySelector("#city-input");
    let city = document.querySelector("#current-city");
    city.innerHTML = cityResult.value;

    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult.value}&appid=${apiKey}&units=${units}`;
      
    axios.get(apiUrl).then(searchedLocationWeather);
  }

function getCurrentLocationWeather(event){
    event.preventDefault();

  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(currentLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition); 
}


showJohannesburg();

let locationButton = document.querySelector(".location");
locationButton.addEventListener("click", getCurrentLocationWeather);
 
let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", changeCity);



