import { toDate, isToday, isThisWeek, subDays } from "date-fns";
export default class Task {
  constructor(title, dueDate = "No due date", checked = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.checked = checked;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }

  formatDate() {
    const day = this.dueDate.split("/")[1];
    const month = this.dueDate.split("/")[0];
    const year = this.dueDate.split("/")[2];
    return `${month}/${day}/${year}`;
  }

  isDueToday() {
    const taskDate = new Date(this.formatDate());
    return isToday(toDate(taskDate));
  }

  isDueThisWeek() {
    const taskDate = new Date(this.formatDate());
    return isThisWeek(subDays(toDate(taskDate), 1));
  }
}
