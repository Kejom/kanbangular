import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs'
import { ProjectService } from 'src/app/services/projects.service';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { Feature } from 'src/app/models/feature.model';
import { FeatureService } from 'src/app/services/feature.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() featureId?: string
  @Input() featureName?: string
  @Output() onAddTask = new EventEmitter<Task>();
  projectId: string;
  newTask!: Task;
  availableFeatures: Feature[] = [];
  availableUsers: User[] = [];
  featuresSubscription: Subscription;

  constructor(private projectService: ProjectService, private featureService: FeatureService, private authService: AuthService, private usersService: UsersService){
    this.projectId = projectService.selectedProject!.id;
    this.featuresSubscription = featureService.featuresChanged.subscribe(features => this.availableFeatures = features);
  }

  async ngOnInit() {
    this.formInit();
    this.availableUsers = await this.usersService.getUsersByProjectId(this.projectId);
  }


  onSubmit(){
    console.log(this.newTask);
    this.onAddTask.emit(this.newTask);
    this.formInit();
  }

  private formInit(){
    this.newTask = {
      id: '',
      name: '',
      description: '',
      priority: 4,
      featureId: this.featureId ? this.featureId : '',
      projectId: this.projectId,
      status: 'todo',
      created: new Date(),
      createdById: this.authService.loggedUser!.id
    }
  }
}
