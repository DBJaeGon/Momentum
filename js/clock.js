const clock = document.querySelector(".js-clock .clock__text");

function getTime() {
    const now = new Date();
    clock.innerText = dateFormat(now.getHours(), now.getMinutes(), now.getSeconds());
    return;
}

function dateFormat(hours, minutes, seconds) {
    const HH = hours < 10 ? `0${hours}` : hours;
    const MM = minutes < 10 ? `0${minutes}` : minutes;
    const SS = seconds < 10 ? `0${seconds}` : seconds;
    return `${HH}:${MM}:${SS}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();