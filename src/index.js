import Task from "./task";
import Project from "./project";
import TodoList from "./todoList";
import {format } from "date-fns";

const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', addTaskArea);
const addTask = document.querySelector('.add-task');
addTask.classList.add('add-task');
const display = document.querySelector('.display');

const todoList = new TodoList();
const listOfProjects = todoList.getProjects();
console.log(listOfProjects);

function addToStorage(){
    window.localStorage.setItem('projects', JSON.stringify(todoList)); 
}

if(!localStorage.getItem('projects')){
    addToStorage();
}

function addTaskArea(){
    const taskName = document.createElement('input');
    taskName.classList.add('input-task');
    taskName.type = 'text';

    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.textContent = 'Add';

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';

    const addDiv = document.createElement('div');
    addDiv.classList.add('add-div-task');
    addDiv.appendChild(addBtn);
    addDiv.appendChild(cancelBtn);

    addTaskBtn.style.visibility = 'hidden';
    addTask.removeChild(addTaskBtn);
    addTask.textContent = "";
    addTask.appendChild(taskName);
    addTask.appendChild(addDiv);
    
    
    addBtn.addEventListener('click', () => createTask(taskName.value))
    cancelBtn.addEventListener('click', clearAddTaskArea);
}
function clearAddTaskArea(){
    addTask.textContent = "";
    addTaskBtn.style.visibility = 'visible';
    addTask.appendChild(addTaskBtn);
}
function createTask(taskName){
    if (taskName == ''){ 
        alert('Please enter task name');
        return
    }
    const task = new Task(taskName);
    console.log(task);
    addTaskToProject(task);
    createTaskDiv(task);
}

function createTaskDiv(task){
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');

    const checkbox = document.createElement('input');
    checkbox.id = 'task';
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    checkbox.classList.add('checkbox');

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked){
            console.log(('checked'));
            taskDiv.classList.add('checked');
            dueDate.classList.add('checked');
        } else {
            taskDiv.classList.remove('checked');
            dueDate.classList.remove('checked');
        }
    })

    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for','task')
    taskLabel.textContent = task.getTitle();
    taskLabel.classList.add('task-label');
    
    const taskOnlyContainer = document.createElement('div');
    taskOnlyContainer.classList.add('task-container');
    taskOnlyContainer.appendChild(checkbox);
    taskOnlyContainer.appendChild(taskLabel);
    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('dueDate-div');
    const dueDate = document.createElement('button');
    dueDate.textContent = task.getDueDate();
    dueDate.classList.add('dueDate-btn');

    dueDateDiv.appendChild(dueDate);
    if (projectName.textContent == 'Today' || projectName.textContent == 'This Week'){
        taskDiv.appendChild(taskOnlyContainer);
        taskDiv.appendChild(dueDateDiv);
        display.appendChild(taskDiv);
        return; 
    }
    
    else{
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.classList.add('date-picker');
        dueDate.addEventListener('click', ()=> {
            dueDateDiv.removeChild(dueDate);
            dueDateDiv.appendChild(dueDateInput);
        })

        dueDateInput.addEventListener('input', () => {
            setNewDueDate(dueDateDiv, dueDate, dueDateInput, task)
            addToStorage();
            loadProject();
        });
        
    
        clearAddTaskArea();
    }

    const trashcan = document.createElement('img');
    trashcan.classList.add('trashcan')
    trashcan.src = './icon/delete-circle.png';

    taskDiv.appendChild(taskOnlyContainer);
    taskDiv.appendChild(dueDateDiv);
    taskDiv.appendChild(trashcan);
    display.appendChild(taskDiv);

    trashcan.addEventListener('click', () => {
        display.removeChild(taskDiv);
        removeTask(task.getTitle());
    });
}

function removeTask(taskName){
    listOfProjects.forEach((project) => {
        if (project.getName() == projectName.textContent){
            console.log(taskName);
            project.removeTask(taskName);
        }
    })
}
function setNewDueDate(div, dueDate, input, task){
    console.log(input.value);
    let inputValue = input.value
    let newDueDate = new Date(inputValue);
    newDueDate.setMinutes(newDueDate.getMinutes() + newDueDate.getTimezoneOffset());
    newDueDate = format(newDueDate, 'MM/dd/yyyy');
    console.log(newDueDate);
    task.setDueDate(newDueDate);
    dueDate.textContent = task.formatDate();
    console.log(task.formatDate());
    div.removeChild(input);
    div.appendChild(dueDate);
}

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', createProjectArea);
const addProject = document.querySelector('.add-project');
const userProjects = document.querySelector('.user-projects');

function createProjectArea(){
    const projectName = document.createElement('input');
    projectName.classList.add('input-project');
    projectName.type = 'text';

    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn')
    addBtn.textContent = 'Add';

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';

    const addDiv = document.createElement('div');
    addDiv.classList.add('add-div');
    addDiv.appendChild(addBtn);
    addDiv.appendChild(cancelBtn);

    addProjectBtn.style.visibility = 'hidden';
    addProject.removeChild(addProjectBtn);
    addProject.textContent = "";
    addProject.appendChild(projectName);
    addProject.appendChild(addDiv);

    addBtn.addEventListener('click', () => createProject(projectName.value))
    cancelBtn.addEventListener('click', clearCreateProjectArea);

}
function clearCreateProjectArea(){
    addProject.textContent = "";
    addProjectBtn.style.visibility = 'visible';
    addProject.appendChild(addProjectBtn);
}

function createProject(projectName){
    if (projectName == ''){
        alert('Please enter project name');
        return
    }else if (projectName == 'Inbox' || projectName == 'Today' || projectName == 'This Week'){
        alert('This project has already created');
        return
    }
    const project = new Project(projectName);
    todoList.addProject(project);
    addToStorage();
    console.log(listOfProjects);
    const projectInput = document.createElement('button');
    projectInput.type = 'text';
    projectInput.classList.add('project-btn');
    projectInput.classList.add('project-btn-div');
    projectInput.classList.add('project')
    projectInput.textContent = project.name;
    clearCreateProjectArea();
    userProjects.appendChild(projectInput);
    loadProject();
}
const projectName = document.querySelector('h2');

function loadProject(){
    const projectBtns = document.querySelectorAll('.project-btn-div');
    projectBtns.forEach((button) => {
        button.addEventListener('click', () => {
        const hasChildButton = button.querySelector('.project-btn');
        if (hasChildButton != null){
            projectName.textContent = hasChildButton.textContent;
        }else{
            projectName.textContent = button.textContent;
        }
        addTask.appendChild(addTaskBtn);
        display.innerHTML = '';
        addActiveClass(button);
        getProjectTasks();
        addToStorage();
        });
    });
}
loadProject();

function addTaskToProject(newTask){
    listOfProjects.forEach((project) => {
        if (project.name == projectName.textContent){
            project.addTask(newTask);
            console.log(project);
            //addToStorage();
        }
        if(project.name == 'Inbox'){
            project.addTask(newTask);
        }
        if (project.name == 'Today'){
            project.addTask(newTask);
        }
        if (project.name == 'This Week'){
            project.addTask(newTask);
        }

    });
}

function getProjectTasks(){
    let projectTasks = [];
    listOfProjects.forEach((project) => {
        //addToStorage();
        if (project.getName() == projectName.textContent){
            console.log(projectName.textContent);
            if (project.getName() == 'Today'){
                projectTasks = project.getTodayTasks();
                addTask.removeChild(addTaskBtn);
                console.log(project);
            }else if (project.getName() == 'This Week') {
                projectTasks = project.getThisWeekTasks();
                addTask.removeChild(addTaskBtn);
                console.log(project);
            }else{
                console.log(project);
                projectTasks = project.getTasks();
            }
            projectTasks.forEach((task) => {
                createTaskDiv(task)
            });
        }
    })
}

function addActiveClass(activeBtn){
    const buttons = document.querySelectorAll('.project-btn-div');
    buttons.forEach((button) => {
        if(button != this){
            button.classList.remove('active');
        }
    });

    activeBtn.classList.add('active');
}

addActiveClass(document.querySelector('.project-btn-div'));


