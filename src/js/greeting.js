const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  form.classList.remove(SHOWING_CN);
  paintGreeting(currentValue);
  localStorage.setItem(USER_LS, currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 0 && hours < 12) {
    greeting.innerText = `Good morning, ${text}`;
  } else if (hours >= 12 && hours < 18) {
    greeting.innerText = `Good afternoon, ${text}`;
  } else {
    greeting.innerText = `Good evening, ${text}`;
  }
  greeting.classList.add(SHOWING_CN);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function handleFocus(event) {
  const input = event.target;
  input.placeholder = "";
}

function handleOutFocus(event) {
  const input = event.target;
  input.placeholder = "What is your name?";
}

function init() {
  loadName();
  input.addEventListener("focus", handleFocus);
  input.addEventListener("focusout", handleOutFocus);
}

init();
