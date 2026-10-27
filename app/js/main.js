
// GRABBING THE ELEMENTS

const addTaskForm = document.getElementById('addTaskForm');
const addTaskInput = document.getElementById('addTaskInput');
const addDateInput = document.getElementById('addDateInput');
const taskListContainer = document.getElementById('taskListContainer');
const progressBarFill = document.getElementById('progressBarFill');
const progressPercent = document.getElementById('progressPercent');

let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];

// WHEN USER ADDS A TASK

addTaskForm.addEventListener('submit', addNewTask);

function addNewTask(event) {
  event.preventDefault();

  const newTaskName = addTaskInput.value;
  const newTaskDate = addDateInput.value;

  if (newTaskName.trim() === '' || newTaskDate.trim() === '') {
    return;
  }

  const newTask = {
    id: Date.now(),
    name: newTaskName,
    dueDate: newTaskDate,
    completed: false
  };

  allTasks.push(newTask);
  localStorage.setItem('allTasks', JSON.stringify(allTasks));

  addTaskInput.value = '';
  addDateInput.value = '';

  renderTasks();
}

// FILLING THE ALL TASKS LIST

function renderTasks() {
  taskListContainer.innerHTML = '';

  allTasks.forEach(function(newTask) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    taskCard.innerHTML = `
    <div class="task-left">
      <div class="task-circle"></div>
      <span class="task-name">${newTask.name}</span>
    </div>
    <div class="task-right">
      <span class="task-date">${newTask.dueDate}</span>
    </div>
    `;

    taskListContainer.appendChild(taskCard);
    
  });
}

renderTasks();
