const OPEN_WIDGET = "openWidget";
const sideBtn = document.querySelector(".side-widgets_button");
const sideWidget = document.querySelector(".side-widgets");

function handleClick(event) {
  if (!sideBtn.classList.contains(OPEN_WIDGET)) {
    sideBtn.classList.add(OPEN_WIDGET);
    sideWidget.style.width = "330px";
  } else {
    sideBtn.classList.remove(OPEN_WIDGET);
    sideWidget.style.width = "0";
  }
}

function init() {
  sideBtn.addEventListener("click", handleClick);
}

init();
