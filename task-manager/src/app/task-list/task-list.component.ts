// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './task-list.component.html',
//   styleUrl: './task-list.component.css'
// })
// export class TaskListComponent {
// }


import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
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
