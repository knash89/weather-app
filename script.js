//update the local time
function onLoad() {
    getCurrentPosition();
    getCurrentDay();
  }
  
  function getCurrentDay() {
    let now = new Date();
    let time = document.querySelector("#dayTime");
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
    let hour = now.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = now.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    time.innerHTML = ` Last Updated: ${day} ${hour}:${minute}`;
  }

  if (document.readyState === "loading") {
    // if Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", onLoad);
  } else {
    // `DOMContentLoaded` has already fired
    onLoad();
  }
  
  // update location weather details with user input search
  function displayWeather(response) {
    console.log(response)
    let location = document.querySelector("#place");
    location.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#todaysTemp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humid");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    // reset searchbox after submit
    let formInput = document.querySelector("#search-bar");
    formInput.reset();

    fahrenheitTemperature = response.data.main.temp;
  }
  
  function callApi(queryString, callback) {
    let units = "imperial";
    let apiKey = "5cad4475c4452a1fd645d9595110e971";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${queryString}`;
    axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(callback);
  }
  
  function getPlace(event) {
    event.preventDefault();
    let locationInput = document.querySelector("#place-input");
    let userInput = locationInput.value;
    if (userInput) {
      callApi(`q=${userInput}`, displayWeather);
    }
  }
  let formInput = document.querySelector("#search-bar");
  formInput.addEventListener("submit", getPlace);

  function getCurrentWeather(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    callApi(`lat=${lat}&lon=${long}`, displayWeather);
  }
  
  let currentButton = document.querySelector("#current");
  currentButton.addEventListener("click", getCurrentPosition);
  
  // get current location on click of button
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(getCurrentWeather);
  }


  // convert to celsius
  function convertToCelsius(event){
    event.preventDefault();
    let celsuisTemp = (fahrenheitTemperature - 32) * 5 / 9;
    let tempElement = document.querySelector("#todaysTemp") 
    tempElement.innerHTML = Math.round(celsuisTemp)
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
  }
  let fahrenheitTemperature = null;

  let celsiusLink = document.querySelector("#celsius-link")
  celsiusLink.addEventListener("click", convertToCelsius);

//  convert to fahrenheit
function convertToFahrenheit(event){
  event.preventDefault();
  let tempElement = document.querySelector("#todaysTemp")
  tempElement.innerHTML = Math.round(fahrenheitTemperature)
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", convertToFahrenheit);

  

