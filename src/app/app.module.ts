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
import { ProjectAccessFormComponent } from './components/project-access-form/project-access-form.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { FeatureFormComponent } from './components/feature-form/feature-form.component';
import { FeatureTabComponent } from './components/feature-tab/feature-tab.component';
import { FeatureService } from './services/feature.service';
import { FeatureComponent } from './views/feature/feature.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FeatureTasksSectionComponent } from './components/feature-tasks-section/feature-tasks-section.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TasksService } from './services/tasks.service';
import { TaskTabComponent } from './components/task-tab/task-tab.component';
import {CdkDropList, CdkDrag, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskComponent } from './views/task/task.component'

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
    ProjectFormComponent,
    ProjectAccessFormComponent,
    FeatureListComponent,
    FeatureFormComponent,
    FeatureTabComponent,
    FeatureComponent,
    TaskFormComponent,
    TaskListComponent,
    FeatureTasksSectionComponent,
    TaskBoardComponent,
    TaskTabComponent,
    TaskCardComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup
  ],
  providers: [FirebaseService, AuthService, UsersService, ProjectService, FeatureService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
