
// GRABBING THE ELEMENTS

const addTaskForm = document.getElementById('addTaskForm');
const addTaskInput = document.getElementById('addTaskInput');
const addDateInput = document.getElementById('addDateInput');
const taskListContainer = document.getElementById('taskListContainer');
const progressBarFill = document.getElementById('progressBarFill');
const progressPercent = document.getElementById('progressPercent');

let allTasks = [];

// WHEN USER ADDS A TASK

addTaskForm.addEventListener('submit', addNewTask);

function addNewTask(event) {
  event.preventDefault();

  const newTaskName = addTaskInput.value;
  const newTaskDate = addDateInput.value;

  if (newTaskName.trim() === "" || newTaskDate.trim() === "") {
    return;
  }

  const newTask = {
    id: Date.now(),
    name: newTaskName,
    dueDate: newTaskDate,
    completed: false
  };

  allTasks.push(newTask);
}
