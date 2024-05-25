import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    if (this.newTaskTitle.trim() !== '' && this.newTaskDescription.trim() !== '') {
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.router.navigate(['tasks']);
    }
  }

  onTitleChange(title: string) {
    this.newTaskTitle = title;
  }
  
  onDescriptionChange(description: string) {
    this.newTaskDescription = description;
  }
  
}


