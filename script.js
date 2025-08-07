let tasks = [];

function addTask() {
  const titleInput = document.getElementById('task-title');
  const dateTimeInput = document.getElementById('task-datetime');

  const title = titleInput.value.trim();
  const dateTime = dateTimeInput.value;

  if (!title || !dateTime) {
    alert("Please fill in both the task and the date/time!");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    dateTime,
    completed: false
  };

  tasks.push(task);
  titleInput.value = "";
  dateTimeInput.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div><strong>${task.title}</strong></div>
      <div class="task-time">${new Date(task.dateTime).toLocaleString()}</div>

      <div class="task-controls">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit task title:", task.title);
  const newDateTime = prompt("Edit task date/time:", task.dateTime);

  if (newTitle && newDateTime) {
    task.title = newTitle.trim();
    task.dateTime = newDateTime;
    renderTasks();
  }
}
