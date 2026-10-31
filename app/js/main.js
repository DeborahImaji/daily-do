
// GRABBING THE ELEMENTS

const addTaskForm = document.getElementById('addTaskForm');
const addTaskInput = document.getElementById('addTaskInput');
const addDateInput = document.getElementById('addDateInput');
const taskListContainer = document.getElementById('taskListContainer');
const progressBarFill = document.getElementById('progressBarFill');
const progressPercent = document.getElementById('progressPercent');
let currentFilter = 'all';

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

  // SORT TASKS BY DUE DATE
  allTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // FILTER TASKS BY TABS
  let filteredTasks = allTasks;

  if (currentFilter === 'active') {
    filteredTasks = allTasks.filter(newTask => !newTask.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = allTasks.filter(newTask => newTask.completed);
  }

  filteredTasks.forEach(function(newTask) {
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

  updateProgressBar();
}

renderTasks();

// UPDATING THE PROGRESS BAR

function updateProgressBar() {
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(newTask => newTask.completed).length;

  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const progressBarFill = document.querySelector('.progress-bar');
  const progressBarText = document.querySelector('.progress-percent');

  if (progressBarFill) {
    progressBarFill.style.width = `${percentage}%`;
  }
  if (progressBarText) {
    progressBarText.textContent = `Your progress: ${percentage}%`;
  }
}

// CLEAR COMPLETED TASKS

const clearCompletedBtn = document.getElementById('clearCompletedBtn');

clearCompletedBtn.addEventListener('click', function() {
  allTasks = allTasks.filter(newTask => !newTask.completed);

  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  renderTasks();
});

// FILTER BUTTONS FOR TASKS

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    filterButtons.forEach(btn => btn.classList.remove('active'));

    e.target.classList.add('active');

    currentFilter = e.target.getAttribute('data-filter');

    renderTasks();
  });
});
