const API_KEY = "9fa8b971ed06dda9a60567de0fb4d227";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?"
const COORDS = 'coords';

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
    fetch(
        `${WEATHER_API}lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
        //`${WEATHER_API}id=1835841&appid=${API_KEY}&units=metric`
    )
    .then(response => response.json())
    .then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${Math.floor(temperature)}° @ ${place}`;
    });
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coords = {
        lat,
        lon
    }
    localStorage.setItem(COORDS, JSON.stringify(coords));
    getWeather(coords);
}

function handleGeoFailure() {
    console.log("No location!");
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords !== null) {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords);
    } else {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailure);
    }
}

function init() {
    loadCoords();
}

init();