import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../Interfaces/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'incomplete' = 'all';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.filteredTasks$ = this.getFilteredTasks();
  }

  ngOnInit(): void {}

  getFilteredTasks(): Observable<Task[]> {
    return combineLatest([this.tasks$, new Observable(observer => {
      observer.next(this.filter);
      observer.complete();
    })]).pipe(
      map(([tasks, filter]) => this.applyFilter(tasks))
    );
  }

  applyFilter(tasks: Task[]): Task[] {
    switch (this.filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }

  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
    this.filteredTasks$ = this.getFilteredTasks(); 
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.filteredTasks$ = this.getFilteredTasks();
  }

  changeFilter(newFilter: 'all' | 'completed' | 'incomplete'): void {
    this.filter = newFilter;
    this.filteredTasks$ = this.getFilteredTasks();
  }
}
