import {toDate, isToday, isThisWeek, subDays} from 'date-fns'
import { formatDate } from './task'

export default class project{
    constructor(name){
        this.name = name;
        this.tasks = []; 
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setTasks(tasks){
        this.tasks = tasks;
    }

    getTasks(){
        return this.tasks;
    }

    getTask(taskName){
        return this.tasks.find((task) => task.name === taskName);
    }
    containsTask(taskName){
        return this.tasks.some((task) => task.name === taskName);
    }
    addTask(newTask){
        if (this.tasks.find((task) => task.name === newTask.name)) return;
        this.taks.push(newTask);
    }
    removeTask(taskName){
        this.task = this.tasks.filter((task) => task.name !== taskName);
    }

    getTodayTasks(){
        return this.tasks.filter((task) => {
            const taskDate = new Date(task.formatDate());
            return isToday(toDate(taskDate));
        });
    }

    getThisWeekTasks(){
        return this.tasks.filter((task) => {
            const taskDate = new Date (task.formatDate());
            return isThisWeek(subDays(toDate(taskDate),1));
        });
    }
}