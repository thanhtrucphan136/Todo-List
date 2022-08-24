import Task from "./task";
import Project from "./project";
import TodoList from "./todoList";
import { format } from "date-fns";

const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', addTaskArea);
const addTask = document.querySelector('.add-task');
const display = document.querySelector('.display');

const todoList = new TodoList();
const listOfProjects = todoList.getProjects();
console.log(listOfProjects);

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

    const checkbox = document.createElement('input');
    checkbox.id = 'task';
    checkbox.type = 'checkbox';
    checkbox.name = 'task';

    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for','task')
    taskLabel.textContent = task.getTitle();
    
    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('dueDate-div');
    const dueDate = document.createElement('button');
    dueDate.textContent = task.getDueDate();
    //dueDate.classList.add('dueDate-btn');
    //dueDate.value = task.getDueDate();

    dueDateDiv.appendChild(dueDate);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    //dueDateInput.defaultValue = '0000-00-00';
    console.log(dueDateInput.defaultValue);
    dueDate.addEventListener('click', ()=> {
        dueDateDiv.removeChild(dueDate);
        dueDateDiv.appendChild(dueDateInput);
    })

    dueDateInput.addEventListener('input', () => setNewDueDate(dueDateDiv, dueDate, dueDateInput, task));
    
    
    
    clearAddTaskArea();
    
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(dueDateDiv);
    display.appendChild(taskDiv);
}

function setNewDueDate(div, dueDate, input, task){
    console.log(input.value);
    let inputValue = input.value
    let newDueDate = format(new Date(inputValue), 'MM/dd/yyyy');
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
    projectName.type = 'text';
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    addProjectBtn.style.visibility = 'hidden';
    addProject.removeChild(addProjectBtn);
    addProject.textContent = "";
    addProject.appendChild(projectName);
    addProject.appendChild(addBtn);
    addProject.appendChild(cancelBtn);

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
    console.log(listOfProjects);
    const projectInput = document.createElement('button');
    projectInput.type = 'text';
    projectInput.classList.add('project-btn');
    projectInput.textContent = project.name;
    clearCreateProjectArea();
    userProjects.appendChild(projectInput);
    loadProject();
}
const projectName = document.querySelector('h2');
function loadProject(){
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach((button) => {
        button.addEventListener('click', () => {
            projectName.textContent = button.textContent;
            display.innerHTML = '';
            getProjectTasks();
        });
    });
}
loadProject();

function addTaskToProject(newTask){
    listOfProjects.forEach((project) => {
        if (project.name == projectName.textContent){
            project.addTask(newTask);
            console.log(project);
        }
    });
}

function getProjectTasks(){
    listOfProjects.forEach((project) => {
        if (project.getName() == projectName.textContent){
            console.log(project);
            const projectTasks = project.getTasks();
            projectTasks.forEach((task) => {
                createTaskDiv(task)
            });
        }
    })
}



