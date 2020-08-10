const UNSPLASH_API_KEY = "FPmTu7RjjUq9MR7s003JeoWSgF2CocbfTs4khU5BXxg";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=earth&orientation=landscape`;

const body = document.querySelector("body"),
    locationContainer = document.querySelector(".js-location span");

function saveBackground(imageUrl, city, country, name) {
    const savedImage = localStorage.getItem("bg");
    if(savedImage !== null) {
        localStorage.removeItem("bg");
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    const imageObject = {
        url: imageUrl,
        expiresOn: expirationDate,
        city,
        country,
        name
    }
    localStorage.setItem("bg", JSON.stringify(imageObject));
    loadBackground();
    return;
}

function getBackground() {
    fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
        const image = json;
        const fullUrl = image.urls.full;
        const location = image.location;
        const city = location.city;
        const country = location.country;
        const name = location.name;
        saveBackground(fullUrl, city, country, name);
    });
    return;
}

function loadBackground() {
    const savedImage = localStorage.getItem("bg");
    if(savedImage === null) {
        getBackground();
    } else {
        const parseImage = JSON.parse(savedImage);
        const today = new Date();
        const strToday = JSON.stringify(today);
        console.log(strToday, parseImage.expiresOn);
        if(strToday > parseImage.expiresOn) {
            getBackground();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${parseImage.url})`;
            const country = parseImage.country === null ? "unknown" : parseImage.country;
            const city = parseImage.city === null ? "unknown" : parseImage.city;
            const name = parseImage.name === null ? "unknown" : parseImage.name;
            locationContainer.innerHTML = `${country}, ${city}, ${name}`;
        }
        return;
    }
}

function initApp() {
    loadBackground();
    return;
}

initApp();