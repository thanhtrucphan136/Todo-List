console.log('Hello');
import Task from "./task";
import Project from "./project";
import TodoList from "./todoList";
/*
const loadProject = (() => {
    const display = document.querySelector('.display');
    const projectBtns = document.querySelectorAll('.project-btn');
    const projectName = document.querySelector('h2');
    projectBtns.forEach((button) => {
        button.addEventListener('click', () => {
            projectName.textContent = button.textContent;
        });
    });
})();*/

const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', addTaskArea);
const addTask = document.querySelector('.add-task');
const display = document.querySelector('.display');

function addTaskArea(){
    const taskName = document.createElement('input');
    taskName.type = 'text';
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    addTaskBtn.style.visibility = 'hidden';
    addTask.removeChild(addTaskBtn);
    addTask.textContent = "";
    addTask.appendChild(taskName);
    addTask.appendChild(addBtn);
    addTask.appendChild(cancelBtn);
    
    addBtn.addEventListener('click', () => createTask(taskName.value))
}

function createTask(taskName){
    const task = new Task(taskName);
    console.log(task);
    
    const taskDiv = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.id = 'task';
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for','task')
    taskLabel.textContent = task.title;
    
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskLabel);
    
    addTask.textContent = "";
    addTask.appendChild(addTaskBtn);
    addTaskBtn.style.visibility = 'visible';
    
    display.appendChild(taskDiv);
}