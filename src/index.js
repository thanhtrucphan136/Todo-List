import Task from "./task";
import Project from "./project";
import TodoList from "./todoList";
import { format } from "date-fns";
//import {getName} from "./project";

const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", addTaskArea);
const addTask = document.querySelector(".add-task");
addTask.classList.add("add-task");
const display = document.querySelector(".display");

const addProjectBtn = document.querySelector(".add-project-btn");
addProjectBtn.addEventListener("click", createProjectArea);
const addProject = document.querySelector(".add-project");
const userProjects = document.querySelector(".user-projects");

const projectName = document.querySelector("h2");

const todoList = new TodoList();
console.log(todoList);
function updateStorage() {
  window.localStorage.setItem("todoList", JSON.stringify(todoList));
}

let listOfProjects = todoList.getProjects();

const storedTodoList = JSON.parse(window.localStorage.getItem("todoList"));

if (storedTodoList) {
  console.log(storedTodoList);

  storedTodoList.projects.forEach((project) => {
    console.log([project]);
    createProject(project.name);
    project.tasks.forEach((task) => {
      createTask(task.title, task.dueDate);
    });
  });
}

window.onload = function () {
  document.querySelector(".inbox-btn").click();
  console.log("clicked");
};
loadProject();

function addTaskArea() {
  const taskName = document.createElement("input");
  taskName.classList.add("input-task");
  taskName.type = "text";

  const addBtn = document.createElement("button");
  addBtn.classList.add("add-btn");
  addBtn.textContent = "Add";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.textContent = "Cancel";

  const addDiv = document.createElement("div");
  addDiv.classList.add("add-div-task");
  addDiv.appendChild(addBtn);
  addDiv.appendChild(cancelBtn);

  addTaskBtn.style.visibility = "hidden";
  addTask.removeChild(addTaskBtn);
  addTask.textContent = "";
  addTask.appendChild(taskName);
  addTask.appendChild(addDiv);

  addBtn.addEventListener("click", () => createTask(taskName.value, "none"));
  cancelBtn.addEventListener("click", clearAddTaskArea);
}
function clearAddTaskArea() {
  addTask.textContent = "";
  addTaskBtn.style.visibility = "visible";
  addTask.appendChild(addTaskBtn);
}
function createTask(taskName, dueDate) {
  if (taskName == "") {
    alert("Please enter task name");
    return;
  }
  let task;
  if (dueDate == "none") {
    task = new Task(taskName);
  } else {
    task = new Task(taskName, dueDate);
  }
  console.log(task);
  addTaskToProject(task);
  createTaskDiv(task);
  console.log(todoList);
  //loadProject();
  updateStorage();
}

function createTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");

  const checkbox = document.createElement("input");
  checkbox.id = "task";
  checkbox.type = "checkbox";
  checkbox.name = "task";
  checkbox.classList.add("checkbox");

  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      console.log("checked");
      taskDiv.classList.add("checked");
      dueDate.classList.add("checked");
    } else {
      taskDiv.classList.remove("checked");
      dueDate.classList.remove("checked");
    }
  });

  const taskLabel = document.createElement("label");
  taskLabel.setAttribute("for", "task");
  taskLabel.textContent = task.getTitle();
  taskLabel.classList.add("task-label");

  const taskOnlyContainer = document.createElement("div");
  taskOnlyContainer.classList.add("task-container");
  taskOnlyContainer.appendChild(checkbox);
  taskOnlyContainer.appendChild(taskLabel);
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("dueDate-div");
  const dueDate = document.createElement("button");
  dueDate.textContent = task.getDueDate();
  dueDate.classList.add("dueDate-btn");

  dueDateDiv.appendChild(dueDate);
  if (
    projectName.textContent == "Today" ||
    projectName.textContent == "This Week"
  ) {
    taskDiv.appendChild(taskOnlyContainer);
    taskDiv.appendChild(dueDateDiv);
    display.appendChild(taskDiv);
    return;
  } else {
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.classList.add("date-picker");
    dueDate.addEventListener("click", () => {
      dueDateDiv.removeChild(dueDate);
      dueDateDiv.appendChild(dueDateInput);
    });

    dueDateInput.addEventListener("input", () => {
      setNewDueDate(dueDateDiv, dueDate, dueDateInput, task);
      loadProject();
    });

    clearAddTaskArea();
  }

  const trashcan = document.createElement("img");
  trashcan.classList.add("trashcan");
  trashcan.src = "./icon/delete-circle.png";

  taskDiv.appendChild(taskOnlyContainer);
  taskDiv.appendChild(dueDateDiv);
  taskDiv.appendChild(trashcan);
  display.appendChild(taskDiv);

  trashcan.addEventListener("click", () => {
    display.removeChild(taskDiv);
    removeTask(task.getTitle());
  });
}

function removeTask(taskName) {
  listOfProjects.forEach((project) => {
    if (project.getName() == projectName.textContent) {
      console.log(taskName);
      project.removeTask(taskName);
      updateStorage();
    }
  });
}
function setNewDueDate(div, dueDate, input, task) {
  console.log(input.value);
  let inputValue = input.value;
  let newDueDate = new Date(inputValue);
  newDueDate.setMinutes(
    newDueDate.getMinutes() + newDueDate.getTimezoneOffset()
  );
  newDueDate = format(newDueDate, "MM/dd/yyyy");
  console.log(newDueDate);
  task.setDueDate(newDueDate);
  dueDate.textContent = task.formatDate();
  console.log(task.formatDate());
  div.removeChild(input);
  div.appendChild(dueDate);

  addTaskToProject(task);
  updateStorage();
}

function createProjectArea() {
  const projectName = document.createElement("input");
  projectName.classList.add("input-project");
  projectName.type = "text";

  const addBtn = document.createElement("button");
  addBtn.classList.add("add-btn");
  addBtn.textContent = "Add";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.textContent = "Cancel";

  const addDiv = document.createElement("div");
  addDiv.classList.add("add-div");
  addDiv.appendChild(addBtn);
  addDiv.appendChild(cancelBtn);

  addProjectBtn.style.visibility = "hidden";
  addProject.removeChild(addProjectBtn);
  addProject.textContent = "";
  addProject.appendChild(projectName);
  addProject.appendChild(addDiv);

  addBtn.addEventListener("click", () => createProject(projectName.value));
  cancelBtn.addEventListener("click", clearCreateProjectArea);
}
function clearCreateProjectArea() {
  addProject.textContent = "";
  addProjectBtn.style.visibility = "visible";
  addProject.appendChild(addProjectBtn);
}

function createProject(projectName) {
  if (projectName == "") {
    alert("Please enter project name");
    return;
  } else if (
    projectName == "Inbox" ||
    projectName == "Today" ||
    projectName == "This Week"
  ) {
    //alert("This project has already created");
    return;
  }
  const project = new Project(projectName);
  todoList.addProject(project);
  createProjectDiv(project.getName());
  updateStorage();
  console.log(listOfProjects);
  clearCreateProjectArea();
}
function createProjectDiv(projectName) {
  const projectInput = document.createElement("button");
  projectInput.type = "text";
  projectInput.classList.add("project-btn");
  projectInput.classList.add("project-btn-div");
  projectInput.classList.add("project");
  projectInput.textContent = projectName;

  userProjects.appendChild(projectInput);
  loadProject();
}

function loadProject() {
  const projectBtns = document.querySelectorAll(".project-btn-div");
  projectBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const hasChildButton = button.querySelector(".project-btn");
      if (hasChildButton != null) {
        projectName.textContent = hasChildButton.textContent;
      } else {
        projectName.textContent = button.textContent;
      }
      addTask.appendChild(addTaskBtn);
      display.innerHTML = "";
      addActiveClass(button);
      getProjectTasks();
      //updateStorage();
    });
  });
}

function addTaskToProject(newTask) {
  //Find the "Inbox" project
  const inbox = listOfProjects.find((project) => project.name === "Inbox");
  inbox.addTask(newTask);
  inbox.sortTasksByDueDate();

  //Find the User-created Project
  const userCreated = listOfProjects.find(
    (project) => project.name == projectName.textContent
  );
  userCreated.addTask(newTask);
  userCreated.sortTasksByDueDate();

  // Find the "Today" project
  const today = listOfProjects.find((p) => p.name === "Today");
  // If the new task is due today, add it to the "Today" project
  if (newTask.isDueToday()) {
    today.addTask(newTask);
    today.sortTasksByDueDate();
  }

  // Find the "This Week" project
  const thisWeek = listOfProjects.find((p) => p.name === "This Week");
  // If the new task is due this week, add it to the "This Week" project
  if (newTask.isDueThisWeek()) {
    thisWeek.addTask(newTask);
    thisWeek.sortTasksByDueDate();
  }
  updateStorage();
}

function getProjectTasks() {
  console.log("in get project tasks");
  let projectTasks = [];
  listOfProjects.forEach((project) => {
    if (project.getName() == projectName.textContent) {
      console.log(projectName.textContent);

      if (project.getName() == "Today") {
        console.log(project);
        //projectTasks = project.getTodayTasks();
        addTask.removeChild(addTaskBtn);
      } else if (project.getName() == "This Week") {
        //projectTasks = project.getThisWeekTasks();
        addTask.removeChild(addTaskBtn);
        console.log(project);
      }
      console.log(project);
      projectTasks = project.getTasks();

      projectTasks.forEach((task) => {
        createTaskDiv(task);
      });
      updateStorage();
    }
  });
}

function addActiveClass(activeBtn) {
  const buttons = document.querySelectorAll(".project-btn-div");
  buttons.forEach((button) => {
    if (button != this) {
      button.classList.remove("active");
    }
  });

  activeBtn.classList.add("active");
}

addActiveClass(document.querySelector(".project-btn-div"));
