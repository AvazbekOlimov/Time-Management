let currentTask = null;

function setCurrentTask(button) {
  currentTask = button.closest(".task");
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("errorText").style.display = "none";
}

function addItem() {
  const itemText = document.getElementById("itemText").value.trim();
  const errorText = document.getElementById("errorText");

  if (!itemText) {
    errorText.style.display = "block";
    return;
  }

  errorText.style.display = "none";

  const listGroup = currentTask.querySelector(".list-group");
  const newItem = createTaskItem(itemText, currentTask);

  listGroup.appendChild(newItem);

  const taskType = currentTask
    .querySelector(".task-header strong")
    .textContent.trim();
  saveToLocalStorage(taskType, itemText);

  document.getElementById("itemText").value = "";
  closeModal();
}

function applyBackgroundColor(item, task) {
  const taskType = task.querySelector(".task-header strong").textContent.trim();
  const colors = {
    Do: "#eaf7ea",
    Decide: "#fff3e6",
    Delegate: "#cce7ff",
    Delete: "#ffe6e6",
  };

  item.style.backgroundColor = colors[taskType] || "#ffffff";
}

function createTaskItem(itemText, task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("list-group-item");

  const textSpan = document.createElement("span");
  textSpan.textContent = itemText;

  applyBackgroundColor(taskItem, task);

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.classList.add("done-btn");
  doneButton.addEventListener("click", () => markAsDone(textSpan));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => deleteTask(taskItem, task));

  taskItem.appendChild(textSpan);
  taskItem.appendChild(doneButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function markAsDone(taskItem) {
  taskItem.style.textDecoration = "line-through";
}

function deleteTask(taskItem, task) {
  const taskType = task.querySelector(".task-header strong").textContent.trim();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || {
    Do: [],
    Decide: [],
    Delegate: [],
    Delete: [],
  };

  tasks[taskType] = tasks[taskType].filter(
    (item) => item !== taskItem.firstChild.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskItem.remove();
}

function saveToLocalStorage(taskType, itemText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {
    Do: [],
    Decide: [],
    Delegate: [],
    Delete: [],
  };

  tasks[taskType].push(itemText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadItems() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {
    Do: [],
    Decide: [],
    Delegate: [],
    Delete: [],
  };

  for (const [taskType, items] of Object.entries(tasks)) {
    const taskContainer = document.querySelector(
      `.task.${taskType.toLowerCase()} .list-group`
    );
    items.forEach((itemText) => {
      const taskHeader = document.querySelector(
        `.task.${taskType.toLowerCase()} .task-header strong`
      );
      const parentTask = taskHeader.closest(".task");
      const newItem = createTaskItem(itemText, parentTask);

      taskContainer.appendChild(newItem);
    });
  }
}

document.addEventListener("DOMContentLoaded", loadItems);
