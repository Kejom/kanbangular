import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/projects.service';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private projectService: ProjectService, private authService: AuthService){
    this.projectId = projectService.selectedProject!.id;
  }

  ngOnInit(): void {
    this.formInit();
  }


  onSubmit(){
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
