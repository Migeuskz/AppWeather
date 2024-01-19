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
    if(temp < 10 ){
        //frio
        document.querySelector("body").className = "climaFrio";
    } else if(temp > 15) {
        //templado o calido
        document.querySelector("body").className = "climacalido"
    } else if( temp > 20){
        //caliente
        document.querySelector("body").className = "climatemplado";
    }else if(temp >= 25){
        //tropical
        document.querySelector("body").className = "climatehot";
    }else if(temp < 15){
        //nublado
        document.querySelector("body").className = "climanublado";
    }
 }

navigator.geolocation.getCurrentPosition((position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
}));