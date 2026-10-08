const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const edit = document.getElementById("edit");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  saveTasks();
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const newText = prompt("Edit your task:", task.text);
      if (newText === null || newText.trim() === "") return;
      tasks[index].text = newText.trim();
      renderTasks();
    });

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Undo" : "Complete";
    doneBtn.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(editBtn);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text: text, done: false });
  taskInput.value = "";
  renderTasks();
});

renderTasks();