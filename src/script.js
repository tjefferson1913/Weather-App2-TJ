/* eslint-disable no-unused-vars */
function formatDate(date) {
   //let date =new Date(timestamp);

    let dayValue = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Friday", "Saturday"];
  
    let monthValue = date.getMonth();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  
    let day = days[dayValue];
    let month = months[monthValue];
    let year = date.getFullYear();
    let currentDate = date.getDate();
  
   return `${day}, ${month} ${currentDate}, ${year}  ${hours}:${minutes}`;
    //return `${day}, ${month} ${currentDate}, ${year}`;
  }

  function formatHours(timestamp) {
    //let date =new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours =`0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes =`0${minutes}`;
    }
   
    return `${hours}:${minutes}`;

  }

  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }


  
  function convertToCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    //temperatureElement = 26;
  }
  
  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );

    let iconElement = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute("src",` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
  }
  function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.list[0];

    forecastElement.innerHTML = `
    <div class="col-2">
    <h3>
      ${formatHours(forecast.dt * 1000)}
      </h3>   
    <img
      src="https://openweathermap.org/img/wn/${forecast.data.weather[0].icon}@2x.png"
    />
    <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}°F</strong> |  
    ${Math.round(forecast.main.temp_min)}°F                   
    </div>
    </div>
    `;
  }

  function findCity(city) {
    let apiKey = "2936a2aac9698ca0c47a6a60f8ab239e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);

    apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function search(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    city.innerHTML = cityInput.value;
    findCity(cityInput.value);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(Location);
  }
  
  function Location(position) {
    let apiKey = "2936a2aac9698ca0c47a6a60f8ab239e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeather);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#weather-search-form");
  searchForm.addEventListener("submit", search);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

  let celsiusTemperature = null;
  
  //let currentLocationButton = document.querySelector("#current-location-button");
  //currentLocationButton.addEventListener("click", getCurrentLocation);

 