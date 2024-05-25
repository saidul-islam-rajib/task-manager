import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [    
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
  
