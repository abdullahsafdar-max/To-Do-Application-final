let tasks = [];

let nextId = 1;

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const demo = document.getElementById("demo");
const tasksList = document.getElementById("tasks-list");

function renderTasks() {
  document.getElementById("tasks-list").innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = function () {
      toggleComplete(task.id);
    };

    let taskText = document.createElement("span");
    taskText.innerText = task.text;

    if (task.completed === true) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#8c929c";
    }

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      deleteTask(task.id);
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    tasksList.appendChild(li);
  }

  demo.innerHTML = notasks();
}

function notasks() {
  if (tasks.length === 0) {
    return "No tasks yet. Add one above!";
  } else {
    return "";
  }
}

addButton.addEventListener("click", function () {
  let task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task before adding.");
    return;
  }

  let newTask = {
    id: nextId,
    text: task,
    completed: false,
  };

  nextId = nextId + 1;

  tasks.push(newTask);

  taskInput.value = "";

  renderTasks();
});

function deleteTask(id) {
  let newTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }

  tasks = newTasks;

  renderTasks();
}

function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }

  renderTasks();
}

renderTasks();
