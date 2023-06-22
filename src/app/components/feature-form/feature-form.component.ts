import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';
import { MatSnackBar} from "@angular/material/snack-bar"
import { FeatureService } from 'src/app/services/feature.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit{
  newFeature!: Feature;
  constructor(private featureService: FeatureService, private authService: AuthService, private projectService: ProjectService, private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.newFeature = {
      id: "",
      name: "",
      description: "",
      priority: 4,
      projectId: this.projectService.selectedProject!.id,
      ownerId: this.authService.loggedUser!.id,
      status: 'todo'
    }
  }

  onSubmit(){
    this.featureService.addFeature(this.newFeature);
    this.snackbar.open("Feature created succesfully!", "Ok");
  }
  
}
