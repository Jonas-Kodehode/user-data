const taskForm = document.getElementById("task-form");
const userInput = document.getElementById("user-input");
const listContainer = document.getElementById("list-container");
const listItems = document.getElementById("list-items");
let tasks = [];
let storedTasks = localStorage.getItem("tasks");

if (storedTasks) {
  tasks = JSON.parse(storedTasks);
} else {
  tasks = [];
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ description: userInput.value });
  userInput.value = "";

  reRender();
  saveArray();
});

function reRender() {
  listItems.textContent = "";
  tasks.forEach((e, i) => {
    const container = document.createElement("div");
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const deleteBtn = document.createElement("button");
    checkbox.type = "checkbox";
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => deleteTask(i));
    item.textContent = e.description;

    container.append(item, checkbox, deleteBtn);
    listItems.prepend(container);
    checkbox.addEventListener("change", (e) => {
      if (checkbox.checked) {
        container.classList.add("checked");
      } else container.classList.remove("checked");
      saveArray();
    });
  });
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveArray();
  reRender();
}

function saveArray() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

reRender();
