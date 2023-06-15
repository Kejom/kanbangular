import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { UsersPanelComponent } from './views/users-panel/users-panel.component';
import { UsersService } from './services/users.service';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectBoardComponent } from './views/project-board/project-board.component';
import { ProjectService } from './services/projects.service';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    UsersPanelComponent,
    UserEditComponent,
    ProjectsComponent,
    ProjectBoardComponent,
    ProjectsListComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService, AuthService, UsersService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
