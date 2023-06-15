import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/projects.service';
import { MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input() mode!: "edit" | "create"
  @Input() projectId?: string;
  buttonLabel!: string;
  project!: Project;

  constructor(private projectService: ProjectService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.buttonLabel = this.mode === "edit" ? "Save Changes" : "Create Project";
    this.project = {name: "", description: "", id: ""};

    if(this.mode === "edit" && this.projectService.selectedProject)
      this.project = {...this.projectService.selectedProject}
  }

  onSubmit(){
    if(this.mode === "edit")
      this.Edit();
    else
      this.Create();
  }

  async Create(){
    await this.projectService.addProject({...this.project});
    this.snackBar.open("Project created succesfully!", "Ok");
  }

  async Edit(){
    console.log(this.project);
    await this.projectService.updateProject({... this.project});
    this.snackBar.open("Project updated succesfully!", "Ok");
  }

}
