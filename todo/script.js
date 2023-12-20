////////////////////////////////////////////////////
// Variable declarations
////////////////////////////////////////////////////
const addButton = document.querySelector("#add");
const clearButton = document.querySelector("#clear-done");
const radioButtons = document.querySelectorAll(".radio");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");

////////////////////////////////////////////////////
// Event listeners
////////////////////////////////////////////////////
addButton.addEventListener("click", function () {
  handleAddButtonClick();
});
clearButton.addEventListener("click", function () {
  handleClearButtonClick();
});

window.addEventListener("load", function () {
  loadState();
  attachEventListeners();
});

radioButtons.forEach((radio) => {
  radio.addEventListener("click", function (event) {
    filterToDos(event);
    saveState();
  });
});

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddButtonClick();
  }
});

////////////////////////////////////////////////////
// Function definitions
////////////////////////////////////////////////////

function createTodoItem(text, checked) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  listItem.appendChild(checkbox);

  const todoID = generateUniqueID();
  listItem.id = todoID;

  const label = document.createElement("label");
  label.textContent = text;
  listItem.appendChild(label);

  listItem.addEventListener("click", function () {
    listItem.classList.toggle("checked");
  });
  return listItem;
}

function generateUniqueID() {
  return "todo-" + Math.floor(Math.random() * 1000);
}

function handleAddButtonClick() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todoItem = createTodoItem(todoText, false);
    todoList.appendChild(todoItem);
    saveState();
    todoInput.value = "";
  }
}

function handleClearButtonClick() {
  const items = todoList.querySelectorAll("li");
  for (const item of items) {
    if (item.classList.contains("checked")) {
      todoList.removeChild(item);
    }
  }
  saveState();
}

function showAllItems() {
  const items = todoList.querySelectorAll("li");
  for (const item of items) {
    item.style.display = "block";
  }
}

function showUncheckedItems() {
  const items = todoList.querySelectorAll("li");
  for (const item of items) {
    if (!item.classList.contains("checked")) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

function showCheckedItems() {
  const items = todoList.querySelectorAll("li");
  for (const item of items) {
    if (item.classList.contains("checked")) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

function filterToDos(event) {
  const selectedRadio = event.target.id;
  switch (selectedRadio) {
    case `all`:
      showAllItems();
      break;
    case `still`:
      showUncheckedItems();
      break;
    case `done`:
      showCheckedItems();
      break;
    default:
      showAllItems();
  }
}

function saveState() {
  const allTodos = [];
  const items = todoList.querySelectorAll("li");
  for (const item of items) {
    const todo = {
      id: item.id,
      text: item.querySelector("label").textContent,
      checked: item.classList.contains("checked"),
    };
    allTodos.push(todo);
  }
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function loadState() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    const allTodos = JSON.parse(savedTodos);
    // Remove checked items before loading
    todoList.innerHTML = "";
    for (const todo of allTodos) {
      if (!todo.checked) {
        const todoItem = createTodoItem(todo.text, todo.checked);
        todoItem.id = todo.id;
        todoList.appendChild(todoItem);
      }
    }
  }
}
