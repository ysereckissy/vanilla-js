const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
/// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTasks);
    form.addEventListener('submit', addTask);
    /// remove task event
    taskList.addEventListener('click', removeTask)
    /// clear task
    clearBtn.addEventListener('click', clearTask);
    /// filter tasks
    filter.addEventListener('keyup', filterTask);
}

const createTask = (taskContent) => {
    /// create li element
    const li = document.createElement('li');
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskContent));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    return li;
}

const loadTasksFromStorage = () => {
    let tasks;
    if(!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function addTask(e) {
    e.preventDefault();
    const tasks = loadTasksFromStorage();
    const canSave = taskInput.value.trim() && (-1 === tasks.indexOf(taskInput.value.trim()));
    if(canSave){
        const task = createTask(taskInput.value.trim());
        /// append the li to the ul
        taskList.appendChild(task);
        /// persist task in local storage
        persistTask(taskInput.value);
    }
    taskInput.value = '';
}

function removeTask(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete-item')) {
        const task = e.target.parentElement.parentElement;
        if(confirm('Are you sure?')) {
            task.remove();
            removeTaskFromStorage(task);
        }
    }
}

function clearTask(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    /// Clear tasks from local storage.
    clearStorage();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        console.log(item)
        if(-1 !== item.toLowerCase().indexOf(text)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}


function persistTask(task) {
    const tasks = loadTasksFromStorage();
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = loadTasksFromStorage();
    tasks.forEach(taskContent => {
        const task = createTask(taskContent);
        /// append the li to the ul
        taskList.appendChild(task);
    })

}

function removeTaskFromStorage(task) {
    let tasks = loadTasksFromStorage();
    tasks = tasks.filter(taskContent => (taskContent !== task.textContent));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearStorage() {
    localStorage.removeItem('tasks')
}