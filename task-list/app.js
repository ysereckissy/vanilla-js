const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
/// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    /// remove task event
    taskList.addEventListener('click', removeTask)
    /// clear task
    clearBtn.addEventListener('click', clearTask);
    /// filter tasks
    filter.addEventListener('keyup', filterTask);
}

function addTask(e) {
    e.preventDefault();
    if(taskInput.value === '') {
        return;
    }
    /// create li element
    const li = document.createElement('li');
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    /// append the li to the ul
    taskList.appendChild(li);
    taskInput.value = '';
}

function removeTask(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?'))
        e.target.parentElement.parentElement.remove();
    }
}

function clearTask(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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