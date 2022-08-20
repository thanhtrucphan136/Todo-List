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
function addTaskArea(){
    const taskName = document.createElement('input');
    taskName.type = 'text';
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    const addTask = document.querySelector('.add-task');
    addTask.appendChild(taskName);
    addTask.appendChild(addBtn);
    addTask.appendChild(cancelBtn);
}

function createTask(taskName){
    return new Task(taskName);
}