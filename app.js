const todos = document.querySelector('.todo-section');
const inputText = document.querySelector('#input-text');
const inputButton = document.querySelector('#input-btn');
let tasks = [];

function saveData() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem('todo-tasks12345', tasksString);
}

function loadData() {
  let dataString = localStorage.getItem('todo-tasks12345');
  let data = JSON.parse(dataString);
  return data ? data : [];
}

function createTask(name, completed = false) {
  const task = {
    name,
    completed,
  };
  tasks.unshift(task);

  return tasks;
}

function reloadTaskList() {
  let list = '';

  for (task of tasks) {
    list += `
      <div class="list bg-blue ${task.completed ? 'done' : ''}">
        <p class="white">${task.name}</p>
        <button class="btn-delete">X</button>
        <button class="btn-done">&check;</button>
      </div>
    `;
  }

  todos.innerHTML = list;

  reloadEventListeners();
}

function reloadEventListeners() {
  for (let i = 0; i < tasks.length; i++) {
    const deleteBtn = todos.children[i].children[1];
    const doneBtn = todos.children[i].children[2];

    deleteBtn.addEventListener('click', () => {
      tasks.splice(i, 1);
      reloadTaskList();
      saveData();
    });

    doneBtn.addEventListener('click', () => {
      tasks[i].completed = !tasks[i].completed;
      doneBtn.parentElement.classList.toggle('done');
      saveData();
    });
  }
}

inputButton.addEventListener('click', () => {
  if (inputText.value) {
    createTask(inputText.value);
    saveData();
    reloadTaskList();
  } else {
    alert('Input tidak boleh kosong!');
  }
});

tasks = loadData();
reloadTaskList();
