import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feature-tasks-section',
  templateUrl: './feature-tasks-section.component.html',
  styleUrls: ['./feature-tasks-section.component.css']
})
export class FeatureTasksSectionComponent implements OnInit {
 @Input({required: true}) featureId!: string
 @Input({required: true}) featureName!: string
 tasks: Task[] = [];

 constructor(private tasksService: TasksService, private snackbar: MatSnackBar){}

 ngOnInit(): void {
   this.initTasks();
 }

 async initTasks(){
  this.tasks = await this.tasksService.getByFeatureId(this.featureId);
}

async onAddTask(task: Task){
  let taskWithId = await this.tasksService.add(task);
  this.tasks = [...this.tasks, taskWithId];
  this.snackbar.open("Task created succesfully!", "OK")
}

async onRemoveTask(taskId: string){
  await this.tasksService.remove(taskId);
  this.tasks = this.tasks.filter(t => t.id !== taskId);
}
}


