import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../task.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('taskAnimation', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})

export class TaskItemComponent {
  @Input() task: { title: string; completed: boolean } = { title: '', completed: false };
  @Output() taskDeleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  toggleCompletion() {
    this.task.completed = !this.task.completed;
  }

  deleteTask() {
    this.taskDeleted.emit();
  }
}



