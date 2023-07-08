import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Feature } from 'src/app/models/feature.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FeatureService } from 'src/app/services/feature.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  projectId?: string;
  featureId?: string;
  taskId?: string;
  task?: Task;
  availableUsers: User[] = [];
  featureName: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tasksService: TasksService,
    private usersService: UsersService,
    private featureService: FeatureService,
    private snackbar: MatSnackBar) {
    this.projectId = this.route.snapshot.params["projectid"];
    this.featureId = this.route.snapshot.params["featureid"];
    this.taskId = this.route.snapshot.params["taskid"];


    if (!this.projectId || !this.featureId || !this.taskId)
      this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.task = await this.tasksService.get(this.taskId!);
    this.availableUsers = await this.usersService.getUsersByProjectId(this.projectId!);
    const feature = await this.featureService.getFeature(this.featureId!);
    this.featureName = feature.name;
    console.log(this.task);
  }

  async onSubmit() {
    await this.tasksService.edit(this.task!);
    this.snackbar.open("Task edited succesfully!", "OK")
  }

  async onRemove(){
    this.tasksService.remove(this.task!.id);
    this.location.back();
  }
}
