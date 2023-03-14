const form = document.querySelector('#form');
const input = document.querySelector('#input');
const add = document.querySelector('#add');
const list = document.querySelector('#tasksList');
const empty = document.querySelector('.empty');

add.addEventListener('click', addTask);
list.addEventListener('click', deleteTask);
list.addEventListener('click', doneTask);


if(localStorage.getItem('tasksHTML')) {
    list.innerHTML = localStorage.getItem('tasksHTML')
    if(list.children.length > 0) {
        empty.classList.add('none');
    }
}



function addTask() {
    const taskText = input.value;

    const taskHTML = `
        <li>${taskText}
            <div class="li-img">
                <img id="done" src="./src/img/done.png" alt="done">
                <img id="delete" src="./src/img/delete.png" alt="delete">
            </div>
        </li>
    `
    list.insertAdjacentHTML('beforeend', taskHTML);

    input.value = '';
    input.focus();

    if(list.children.length > 0) {
        empty.classList.add('none');
    }

    saveHTMLtoLS();
}


function deleteTask(e) {
    if(e.target.id !== 'delete') return;

    const parentNode = e.target.closest('li');
    parentNode.remove();

    if(list.children.length === 0) {
        empty.classList.remove('none');
    }

    saveHTMLtoLS();
}


function doneTask(e) {
    if(e.target.id !== 'done') return;
    
    const parentNode = e.target.closest('li');
    parentNode.classList.toggle('done');

    saveHTMLtoLS();
}


function saveHTMLtoLS() {
    localStorage.setItem('tasksHTML', list.innerHTML);
}