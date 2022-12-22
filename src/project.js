import { toDate, isToday, isThisWeek, subDays } from "date-fns";

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getTitle() === taskName);
  }
  containsTask(taskName) {
    return this.tasks.some((task) => task.getTitle() === taskName);
  }
  addTask(newTask) {
    if (this.tasks.find((task) => task.title === newTask.title)) return;
    this.tasks.push(newTask);
  }
  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.getTitle() != taskName);
  }

  getTodayTasks() {
    this.tasks = this.tasks.filter((task) => {
      const taskDate = new Date(task.formatDate());
      return isToday(toDate(taskDate));
    });
    return this.tasks;
  }

  getThisWeekTasks() {
    this.tasks = this.tasks.filter((task) => {
      const taskDate = new Date(task.formatDate());
      return isThisWeek(subDays(toDate(taskDate), 1));
    });
    return this.tasks;
  }
  sortTasksByDueDate() {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.formatDate());
      const dateB = new Date(b.formatDate());
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  }
}
