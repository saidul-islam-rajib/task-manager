import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [    
    {
      path: '',
      component: AddTaskComponent
    },
    {
      path: 'tasks',
      component: TaskListComponent
    },
    {
      path: 'tasks/add',
      component: AddTaskComponent
    }, 
    {
      path: '**',
      component: TaskListComponent
    }, 
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
