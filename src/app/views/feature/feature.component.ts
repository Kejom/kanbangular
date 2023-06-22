import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/models/feature.model';
import { User } from 'src/app/models/user.model';
import { FeatureService } from 'src/app/services/feature.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  projectId?: string;
  featureId?: string;
  feature!: Feature;
  owner!: User;
  constructor(private route: ActivatedRoute, private router: Router, private featureService: FeatureService, private userService: UsersService, private snackbar: MatSnackBar) { }

  async ngOnInit() {
    this.projectId = this.route.snapshot.params["projectid"];
    this.featureId = this.route.snapshot.params["featureid"];

    if (!this.projectId || !this.featureId)
      this.router.navigate(['/']);
    else
      this.feature = await this.featureService.getFeature(this.featureId)

    this.owner = await this.userService.getUser(this.feature.ownerId);
  }

  async onSubmit() {
    await this.featureService.updateFeature({ ...this.feature });
    this.snackbar.open("Feature updated succesfully!", "Ok");
  }
}
