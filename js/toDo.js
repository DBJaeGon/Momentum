const form = document.querySelector(".js-to-do"),
    input = form.querySelector(".js-add-to-do"),
    list = document.querySelector(".js-list");

const TODOS_LS = "toDos";

let toDos = [];

function persistToDos() {
    const stringToDos = JSON.stringify(toDos);
    localStorage.setItem(TODOS_LS, stringToDos);
}

function saveToDo(text) {
    const toDoObject = {
        id: toDos.length + 1,
        value: text
    }
    toDos.push(toDoObject);
    persistToDos();
}

function handleDelete(event) {
    const target = event.target;
    const li = target.parentElement;
    const ul = li.parentElement;
    const toDoId = li.id;
    ul.removeChild(li);
    toDos.filter((toDo) => {
        return toDo.id !== parseInt(toDoId);
    });
    persistToDos();
}

function addToDo(text) {
    const toDo = document.createElement("li");
    toDo.className = "toDo";
    toDo.id = toDos.length + 1;
    const delelteBtn = document.createElement("span");
    delelteBtn.innerHTML = "❌";
    delelteBtn.className = "toDo_button";
    delelteBtn.addEventListener("click", handleDelete);
    const label = document.createElement("label");
    label.innerHTML = text;
    toDo.appendChild(label);
    toDo.appendChild(delelteBtn);
    list.appendChild(toDo);
    saveToDo(text);
}

function handleToDoList(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    addToDo(currentValue);
    toDoInput.value = "";
}

function onSubmit(event) {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    addToDo(value);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => {
            addToDo(toDo.value);
        });
    }
    return;
}

function init() {
    loadToDos();
}

form.addEventListener("submit", onSubmit);

init();