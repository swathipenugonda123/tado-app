let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div onclick="toggleTask(${index})">
        <span class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
        <small>${task.time}</small>
      </div>
      <div>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Add
function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false,
    time: new Date().toLocaleString()
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Edit
function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

// Filter
function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

// Search
function searchTask() {
  let value = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("taskList");
  const items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].innerText.toLowerCase();
    items[i].style.display = text.includes(value) ? "" : "none";
  }
}

// Enter key
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

// Dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}

// Init
renderTasks();