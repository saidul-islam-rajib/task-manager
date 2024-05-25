// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-task',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-task.component.html',
//   styleUrl: './add-task.component.css'
// })
// export class AddTaskComponent {
// }


import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
      this.newTaskTitle = '';
      this.router.navigate(['/']);
    }
  }
}
