import Task from "./task";
import Project from "./project";
import TodoList from "./todoList";

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

    const taskDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.id = 'task';
    checkbox.type = 'checkbox';
    checkbox.name = 'task';
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for','task')
    taskLabel.textContent = task.title;
    
    clearAddTaskArea();
    
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskLabel);
    
    display.appendChild(taskDiv);
}

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', addProjectArea);
const addProject = document.querySelector('.add-project');
const userProjects = document.querySelector('.user-projects');

function addProjectArea(){
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
    cancelBtn.addEventListener('click', clearAddProjectArea);

}
function clearAddProjectArea(){
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
    const projectInput = document.createElement('button');
    projectInput.type = 'text';
    projectInput.classList.add('project-btn');
    projectInput.textContent = project.name;
    clearAddProjectArea();
    userProjects.appendChild(projectInput);
    loadProject();
}

function loadProject(){
    const projectBtns = document.querySelectorAll('.project-btn');
    const projectName = document.querySelector('h2');
    projectBtns.forEach((button) => {
        button.addEventListener('click', () => {
            projectName.textContent = button.textContent;
        });
    });
}
loadProject();