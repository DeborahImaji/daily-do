
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

// WHEN USER COMPLETES A TASK

taskListContainer.addEventListener('click', function(e) {
  if (!e.target.classList.contains('task-circle')) {
    return;
  }
  const card = e.target.closest('.task-card');

  if (!card) {
    return;
  }

  const taskId = Number(card.getAttribute('data-id'));
  const foundTask = allTasks.find(newTask => newTask.id === taskId);

  if (foundTask) {
    foundTask.completed = !foundTask.completed;

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    renderTasks();
  }
});

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

// FORMAT TASK DUE DATES

function formatDate(dateString) {
  if (!dateString) {
    return;
  }

  const taskDate = new Date(dateString + 'T00:00:00');
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };

  return taskDate.toLocaleDateString('en-US', dateOptions);
}

// FILLING THE ALL TASKS LIST

function renderTasks() {
  taskListContainer.innerHTML = '';

  allTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  allTasks.forEach(function(newTask) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    if (newTask.completed) {
      taskCard.classList.add('completed');
    }

    taskCard.setAttribute('data-id', newTask.id);

    taskCard.innerHTML = `
    <div class="task-left">
      <div class="task-circle"></div>
      <span class="task-name">${newTask.name}</span>
    </div>
    <div class="task-right">
      <span class="task-date">${formatDate(newTask.dueDate)}</span>
    </div>
    `;

    taskListContainer.appendChild(taskCard);
    
  });
}

renderTasks();
