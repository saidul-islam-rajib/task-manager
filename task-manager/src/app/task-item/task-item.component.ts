// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-item',
//   standalone: true,
//   imports: [],
//   templateUrl: './task-item.component.html',
//   styleUrl: './task-item.component.css'
// })
// export class TaskItemComponent {
// }

import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: any;

  constructor(private taskService: TaskService) {}

  toggleCompletion() {
    this.taskService.toggleTaskCompletion(this.task.id);
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
  }
}

