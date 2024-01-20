const APIKYE = 'dc8e6cb31b714c8ada89a02def803f54';

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json()); 
}

async function getWeather(lat, lon){
    url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKYE}`;
    console.log(url);
    const weather = await request(url);
    console.log(weather);
    updateDOM(weather.name, weather.main.temp);
}

async function getWeatherByCity(city){
    const url = URLBASE + `q=${city}&appid=${APIKYE}`;
    const weather = await request(url);
    updateDOM(weather.name, weather.main.temp);
}

var button = document.querySelector('button');
var input = document.querySelector('#ciudad');

button.addEventListener('click', function() {
    if (input.value !== '') {
      getWeatherByCity(input.value);
    } else {
      alert('Por favor, ingresa una ciudad.');
    }
   });
   



function updateDOM(city, temp){
    //h2 de ciudad
    document.querySelector("h2").textContent= city;
    //h2 temp
    var tempCelsius = (temp - 273.15).toFixed(1);
    document.querySelector(".temperatura").innerHTML = tempCelsius + "°C";
    updateBackground(temp);
    //fondo dependiendo de la temperatura
  }
  

  function updateBackground(temp){
    let tempCelsius = (temp - 273.15).toFixed(1);
    if(tempCelsius <= -10){
        //frio
        document.querySelector("body").className = "climaFrio";
    } else if(tempCelsius < 15 && tempCelsius > -10){
        //templado
        document.querySelector("body").className = "climanublado";
    } else if(tempCelsius >= 15 && tempCelsius < 20){
        //caliente
        document.querySelector("body").className = "climacalido";
    } else if(tempCelsius >= 20 && tempCelsius < 25){
        //muy caliente
        document.querySelector("body").className = "climatemplado";
    } else if(tempCelsius >= 25){
        //tropical
        document.querySelector("body").className = "climatehot";
    }
 }
 

navigator.geolocation.getCurrentPosition((position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
}));