import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  createdDate: Date;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadTasksFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
        this.tasksSubject.next(this.tasks);
      }
    }
  }

  private updateLocalStorage(tasks: Task[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  addTask(title: string, description: string) {
    const newTask: Task = { 
      id: Date.now(), 
      title, 
      description, 
      createdDate: new Date(), 
      completed: false 
    };
    this.tasks.push(newTask);
    this.updateLocalStorage(this.tasks);
    this.tasksSubject.next(this.tasks);
  }

  toggleTaskCompletion(taskId: number) {
    this.tasks = this.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    this.updateLocalStorage(this.tasks);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.updateLocalStorage(this.tasks);
    this.tasksSubject.next(this.tasks);
  }
}
