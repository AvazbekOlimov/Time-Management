document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterSelect = document.querySelector(".filter select");

  // Load todos from localStorage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => createTodoItem(todo.task, todo.completed));
  }

  // Save todos to localStorage
  function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo-item").forEach((todoItem) => {
      const task = todoItem.querySelector("span").textContent;
      const completed = todoItem.classList.contains("completed");
      todos.push({ task, completed });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function createTodoItem(task, completed = false) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (completed) todoItem.classList.add("completed");
    todoItem.innerHTML = `
        <span>${task}</span>
        <div>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="remove"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
    todoList.appendChild(todoItem);

    const completeButton = todoItem.querySelector(".complete");
    const removeButton = todoItem.querySelector(".remove");

    completeButton.addEventListener("click", () => {
      todoItem.classList.toggle("completed");
      saveTodos(); // Save todos to localStorage after completing
    });

    removeButton.addEventListener("click", () => {
      todoItem.style.transform = "scale(0.8)";
      todoItem.style.opacity = "0";
      setTimeout(() => {
        todoItem.remove();
        saveTodos(); // Save todos to localStorage after removing
      }, 300);
    });
  }

  todoButton.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task) {
      createTodoItem(task);
      todoInput.value = "";
      saveTodos(); // Save todos to localStorage after adding
    }
  });

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      todoButton.click();
    }
  });

  filterSelect.addEventListener("change", () => {
    const filter = filterSelect.value;
    const items = todoList.childNodes;
    items.forEach((item) => {
      if (item.nodeType === Node.ELEMENT_NODE) {
        switch (filter) {
          case "all":
            item.style.display = "flex";
            break;
          case "completed":
            item.style.display = item.classList.contains("completed")
              ? "flex"
              : "none";
            break;
          case "uncompleted":
            item.style.display = item.classList.contains("completed")
              ? "none"
              : "flex";
            break;
        }
      }
    });
  });

  // Load todos when the page is ready
  loadTodos();
});
