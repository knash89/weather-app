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
    let minute = now.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
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
    console.log("displayWeather", response);
  
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
    // convert unix sunrise/sunset
    let unixTimeSunrise = response.data.sys.sunrise * 1000;
    let convertedSunrise = new Date(unixTimeSunrise);
    let humanDateSunrise = convertedSunrise.toLocaleTimeString("en-us");
    let unixTimeSunset = response.data.sys.sunset * 1000;
    let convertedSunset = new Date(unixTimeSunset);
    let humanDateSunset = convertedSunset.toLocaleTimeString("en-us");
    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = humanDateSunrise;
    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = humanDateSunset;
    // reset searchbox after submit
    let formInput = document.querySelector("#search-bar");
    formInput.reset();
  }
  let formInput = document.querySelector("#search-bar");
  formInput.addEventListener("submit", getPlace);
  
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
  
  function getCurrentWeather(position) {
    console.log("getCurrentWeather", position);
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
  // function toFahrenheit(event) {
  //   event.preventDefault();
  //   let tempElement = document.querySelector("#todaysTemp");
  //   tempElement.innerHTML = 69;
  // }
  // let fahrenheit = document.querySelector("#fahrenheit");
  // fahrenheit.addEventListener("click", toFahrenheit);
  
  // function toCelsius(event) {
  //   event.preventDefault();
  //   let tempElement = document.querySelector("#todaysTemp");
  //   tempElement.innerHTML = 21;
  // }
  // let celsius = document.querySelector("#celsius");
  // celsius.addEventListener("click", toCelsius);
  

