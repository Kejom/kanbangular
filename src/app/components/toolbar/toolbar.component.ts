import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription} from "rxjs"
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnDestroy, OnInit {
  isLogged = false;
  isAdmin = false;
  selectedProject: Project | null = null;
  authSubscription: Subscription | null = null;
  selectedProjectSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private projectService: ProjectService, private router: Router ){
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe((status: boolean) => {this.onAuthChange()});
    this.selectedProjectSubscription = this.projectService.selectedProjectChanged.subscribe((project) => {this.selectedProject = project});
    this.onAuthChange();
  }
  ngOnDestroy(): void {
    if(this.authSubscription)
      this.authSubscription.unsubscribe();
  }

  async onLogout(){
    await this.authService.logout();
    this.projectService.deselectProject();
    this.router.navigate(["/login"]);
  }

  onAuthChange(){
    this.isLogged = this.authService.loggedUser !== null;
    this.isAdmin = this.authService.isAdmin();
  }

}
