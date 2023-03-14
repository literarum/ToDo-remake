const form = document.querySelector('#form');
const input = document.querySelector('#input');
const add = document.querySelector('#add');
const clear = document.querySelector('#clearAll');
const list = document.querySelector('#tasksList');
const empty = document.querySelector('.empty');
const divEmpty = document.querySelector('.list');

let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
};

checkEmptyList();

add.addEventListener('click', addTask);
clear.addEventListener('click', clearList);
input.addEventListener('keydown', (e) => {e.keyCode === 13 ? addTask() : null});
list.addEventListener('click', deleteTask);
list.addEventListener('click', doneTask);



function addTask() {
    const taskText = input.value;

    if(input.value !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        };

        tasks.push(newTask);
        saveToLocalStorage();

        renderTask(newTask);

        input.value = '';
        input.focus();
        checkEmptyList();
    }
};


function deleteTask(e) {
    const parentNode = e.target.closest('li');
    if(e.target.id !== 'delete') return;

    const id = Number(parentNode.id);

    const index = tasks.findIndex((task) => task.id === id);
    

    parentNode.remove();

    tasks.splice(index, 1);

    saveToLocalStorage();
    checkEmptyList();
};


function clearList() {
    const liList = document.querySelectorAll('li');
    liList.forEach((li) => li.remove());
    tasks = [];

    checkEmptyList();
    saveToLocalStorage();
}


function doneTask(e) {
    const parentNode = e.target.closest('li');
    const id = Number(parentNode.id);

    if(e.target.id !== 'done') return;

    const task = tasks.find((task) => task.id === id);

    parentNode.classList.toggle('done');

    task.done = !task.done;

    saveToLocalStorage();
};


function checkEmptyList() {
    if (tasks.length === 0) {
      const emptyListEl = document.querySelector('.empty');
      if (!emptyListEl) {
        const emptyListElement = `
          <div class="empty">
            <img src="./src/img/todo.png" alt="empty" />
            <h3>Список дел пуст</h3>
          </div>
        `;
        divEmpty.insertAdjacentHTML('afterbegin', emptyListElement);
      }
    } else if (tasks.length > 0) {
      const emptyListEl = document.querySelector('.empty');
      emptyListEl ? emptyListEl.remove() : null;
    }
  };
  


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTask(task) {
    const cssClass = task.done ? "done" : "";

    const taskHTML = `
        <li class="${cssClass}" id="${task.id}">${task.text}
            <div class="li-img">
                <img id="done" src="./src/img/done.png" alt="done">
                <img id="delete" src="./src/img/delete.png" alt="delete">
            </div>
        </li>
    `
    list.insertAdjacentHTML('beforeend', taskHTML);
}