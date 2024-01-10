const todoListElement = document.querySelector(".todo-list");
const newTodoForm = document.querySelector("#new-todo-form");
const newTodo = document.querySelector("#new-todo");
const addBtn = document.querySelector("#btn-add");
const deleteBtn = document.querySelector("#btn-delete");

let todoArray = [];

function loadTodos() {
  fetch("http://localhost:4730/todos")
    .then((respons) => respons.json())
    .then((data) => {
      todoArray = data;
      render();
    });
}

function render() {
  todoListElement.innerHTML = "";
  todoArray.forEach((todo) => {
    //create list element
    const newLi = document.createElement("li");
    //create todo text
    const text = document.createTextNode(todo.description);
    //create checkbox element
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todo.done;

    //add eventhandler for input
    check.addEventListener("change", () => updateTodo(todo));

    //append text and check elements to list element
    newLi.append(check, text);
    //append li to ul
    todoListElement.appendChild(newLi);
  });
}

//api creates new todo and sends it to backend
function addToDo(event) {
  event.preventDefault();

  const newToDo = {
    description: newTodo.value,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newToDo),
  })
    .then((response) => response.json())
    .then((newTodoFromApi) => {
      loadTodos();
      newTodo.value = ""; //clear the input field after task submission
    });
}

function updateTodo(todo) {
  const updateTodo = {
    id: todo.id,
    description: todo.description,
    done: !todo.done,
  };

  fetch("http://localhost:4730/todos/" + todo.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTodo),
  })
    .then((response) => response.json())
    .then((updateTodoFromApi) => {
      const index = todoArray.findIndex((item) => item.id === todo.id);
      console.log(todoArray);
      todoArray.splice(index, 1, updateTodoFromApi);
      render();
    });
}

loadTodos();
// submit form input event and send to api
newTodoForm.addEventListener("submit", addToDo);

function deleteDoneTodos() {
  const doneTodos = todoArray.filter((todos) => todos.done === true);
  const deleteFetches = [];
  doneTodos.forEach((item) => {
    deleteFetches.push(
      fetch("http://localhost:4730/todos/" + item.id, {
        method: "DELETE",
      })
    );
  });

  Promise.all(deleteFetches).then(() => {
    loadTodos();
  });
}

deleteBtn.addEventListener("click", deleteDoneTodos);

// Add event listener for the new button
const selectAllBtn = document.querySelector("#btn-select-all");
selectAllBtn.addEventListener("click", selectAllTodos);

//////Extra features//////
////only for the select all btn////

function selectAllTodos() {
  const updatedTodos = todoArray.map((todo) => {
    return { ...todo, done: true }; // Mark each todo as done
  });

  // Update each todo via the API
  const updatePromises = updatedTodos.map((todo) =>
    fetch(`http://localhost:4730/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
  );

  Promise.all(updatePromises).then(() => {
    loadTodos(); // Reload todos to reflect changes
  });
}
