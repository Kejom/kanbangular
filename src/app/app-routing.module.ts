import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UsersPanelComponent } from './views/users-panel/users-panel.component';
import { authGuard } from './auth/auth.guard';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectBoardComponent } from './views/project-board/project-board.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersPanelComponent, canActivate: [authGuard]},
  {path: 'users/:id', component: UserEditComponent, canActivate: [authGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [authGuard]},
  {path: 'projects/:id', component: ProjectBoardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
