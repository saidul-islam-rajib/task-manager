import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddTaskComponent {
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    console.log("Add method is called")
    
    if (this.newTaskTitle.trim()) {
      console.log("Inside if statement")
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
      this.newTaskTitle = '';
      this.router.navigate(['tasks']);
    }
  }
}
