import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-tab',
  templateUrl: './task-tab.component.html',
  styleUrls: ['./task-tab.component.css']
})
export class TaskTabComponent implements OnInit {
  tasks: Task[] = [];
  projectId: string;

  constructor(private tasksService: TasksService, private projectService: ProjectService, private snackbar: MatSnackBar) {
    this.projectId = projectService.selectedProject!.id;
  }

  async ngOnInit(): Promise<void> {
    this.tasks = await this.tasksService.getByProjectId(this.projectId);
  }

  async updateTask(task: Task){
    let indexOfTask = this.tasks.findIndex(t => t.id === task.id);

    await this.tasksService.edit(task);

    if(indexOfTask < 0)
      return;

    this.tasks[indexOfTask] = task;
    this.tasks = [...this.tasks];
  }

  async addTask(task: Task){
    const addedTask = await this.tasksService.add(task);
    this.tasks = [...this.tasks, addedTask];
    this.snackbar.open("Task created succesfully!", "OK")
  }

}
