import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, TaskItemComponent]
})

export class TaskListComponent implements OnInit {
  tasks$ = this.taskService.tasks$;
  filter: 'all' | 'completed' | 'incomplete' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  get filteredTasks$() {
    return this.tasks$.pipe(
      map(tasks => {
        if (this.filter === 'completed') {
          return tasks.filter(task => task.completed);
        } else if (this.filter === 'incomplete') {
          return tasks.filter(task => !task.completed);
        }
        return tasks;
      })
    );
  }
}
