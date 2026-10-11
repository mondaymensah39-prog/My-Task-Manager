const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const edit = document.getElementById("edit");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editingIndex = null;

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
      editingIndex = index; // remember which task to edit
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
      editingIndex = null; // stop editing so the wrong item isn't edited
      renderTasks();
    });

    li.appendChild(editBtn);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    // If this task is the one being edited, add an edit row right below it
    if (index === editingIndex) {
      const editItem = document.createElement("li");
      editItem.classList.add("edit-row");

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.addEventListener("click", function () {
        const newText = input.value.trim();
        if (newText !== "") tasks[index].text = newText;
        editingIndex = null;
        renderTasks();
      });

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", function () {
        editingIndex = null;
        renderTasks();
      });

      editItem.appendChild(input);
      editItem.appendChild(saveBtn);
      editItem.appendChild(cancelBtn);
      taskList.appendChild(editItem);

      input.focus(); // put the cursor in the text box right away
    }
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