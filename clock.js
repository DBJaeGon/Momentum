const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    clockTitle.innerText = dateFormat(date.getHours(), date.getMinutes(), date.getSeconds());
}

function dateFormat(hours, minutes, seconds) {
    const HH = hours < 10 ? `0${hours}` : hours;
    const MM = minutes < 10 ? `0${minutes}` : minutes;
    const SS = seconds < 10 ? `0${seconds}` : seconds;
    return `${HH}:${MM}:${SS}`;;
}

function init() {
    setInterval(getTime, 1000);
}

init();