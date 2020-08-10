const nameContainer = document.querySelector(".js-name");

const USER_LS = "currentUser";

function paintName(name) {
    nameContainer.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name_text";
    title.innerHTML = `Hello ${name}`;
    nameContainer.appendChild(title);
}

function handleSubmit(event) {
    event.preventDefault();
    //console.log(event.target);
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem(USER_LS, value);
    paintName(value);
}

function paintInput() {
    const input = document.createElement("input");
    input.placeholder = "Type your name here";
    input.type = "text";
    input.className = "name_input";
    const form = document.createElement("form");
    form.addEventListener("submit", handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);    
}

function loadName() {
    const name = localStorage.getItem(USER_LS);
    if(name === null) {
        paintInput();
    } else {
        paintName(name);
    }
}

function init() {
    loadName();
}

init();