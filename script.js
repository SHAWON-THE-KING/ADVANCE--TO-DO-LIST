let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  } else if (taskText.length > 35) {
    alert("Task cannot be more than 35 characters!");
    return;
  }

  let li = document.createElement("li");
  li.innerText = taskText;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = function () {
        let newText = prompt("Edit your task:", li.firstChild.innerText);
        if (newText !== null && newText.trim() !== "") {
          li.firstChild.innerText = newText.trim();
        }
      };

      li.appendChild(editBtn);

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = "";
});




function saveTasks() {
  let tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = localStorage.getItem('tasks');
  if (tasks) {
    JSON.parse(tasks).forEach(task => {
      let li = document.createElement('li');
      li.innerText = task.text;
      if (task.completed) li.classList.add('completed');

      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });

      let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = function() {
        let newText = prompt("Edit your task:", li.firstChild.textContent);
        if (newText !== null && newText.trim() !== "") {
          li.firstChild.textContent = newText.trim();
          saveTasks();
        }
      };

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadTasks);
addBtn.addEventListener('click', saveTasks);