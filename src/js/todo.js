const TOBEDELETE = "tobeDeleted";
const ICON_CHECK = '<i class="far fa-check-square"></i>';
const ICON_EMPTY = '<i class="far fa-square"></i>';

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  let btn = event.target;
  btn = btn.parentNode; // it points span that contains icon
  const li = btn.parentNode;
  // check 표시된 경우 -> 다시 살려야 하는 경우
  if (li.classList.contains(TOBEDELETE)) {
    li.classList.remove(TOBEDELETE);
    btn.innerHTML = ICON_EMPTY;
    const text = li.querySelector(".todoContent").innerText;
    const id = parseInt(li.id);
    const toDoObj = {
      text: text,
      id: id,
    };
    toDos.splice(li.id - 1, 0, toDoObj);
  } else {
    // check 표시 안 된경우 -> 삭제해야 하는 경우
    li.classList.add(TOBEDELETE);
    btn.innerHTML = ICON_CHECK;
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
  }
  // toDoList.removeChild(li);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("span");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = ICON_EMPTY;
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  span.classList.add("todoContent");
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handletoDoSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedToDos = JSON.parse(loadedTodos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleFocus(event) {
  const input = event.target;
  input.placeholder = "";
  console.dir(input);
}

function handleOutFocus(event) {
  const input = event.target;
  input.placeholder = "Write a to do";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handletoDoSubmit);
  toDoInput.addEventListener("focus", handleFocus);
  toDoInput.addEventListener("focusout", handleOutFocus);
}
init();
