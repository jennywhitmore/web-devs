const state = { todos: [{ item: "Apfel" }, { item: "Banane" }] };
renderToDos();
function renderToDos() {
  const list = document.querySelector("#list");
  list.innerHTML = "";
  state.todos.forEach((el) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(el.item);
    newLi.appendChild(text);
    list.appendChild(newLi);
  });
}
const form = document.querySelector("form");
form.addEventListener("submit", addItem);
function addItem(event) {
  event.preventDefault(); // This will stop the default form submission behavior.

  const userInputField = document.querySelector("#userInput");
  if (userInputField.value.trim() !== "") {
    // Check if the input is not empty
    const newItem = { item: userInputField.value.trim() };
    state.todos.push(newItem);
    renderToDos(); // Render the updated list of todos.
    userInputField.value = ""; // Clear the input field after adding the item.
  }
}
