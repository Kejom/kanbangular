import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user.model';
import { ProjectAccess } from 'src/app/models/project-access.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-access-form',
  templateUrl: './project-access-form.component.html',
  styleUrls: ['./project-access-form.component.css']
})
export class ProjectAccessFormComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];
  private usersWithAccess: User[] = [];
  availableUsers: User[] = [];
  private selectedProjectId = "";
  selectedUserId = "";

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private projectService: ProjectService, private usersService: UsersService){}

  ngOnInit() {
    this.selectedProjectId = this.projectService.selectedProject ? this.projectService.selectedProject.id : "";
    this.initTable();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  async onAdd(){
    let user = this.availableUsers.find(u => u.id === this.selectedUserId);

    if(!user)
      return;

    let newAccess: ProjectAccess = {userId: this.selectedUserId, projectId: this.selectedProjectId};
    await this.projectService.addProjectAccess(newAccess);

    this.usersWithAccess = [...this.usersWithAccess, user];
    this.availableUsers = this.availableUsers.filter(u => u.id !== this.selectedUserId);
    await this.refreshTable();
  }

  async onRemove(userId: string){
    let user = this.usersWithAccess.find(u => u.id === userId);

    if(!user)
      return;
    
    let accessToRemove: ProjectAccess = {userId: userId, projectId: this.selectedProjectId};

    await this.projectService.removeProjectAccess(accessToRemove);

    this.availableUsers = [...this.availableUsers, user];
    this.usersWithAccess = this.usersWithAccess.filter( u => u.id !== userId);
    await this.refreshTable();
  }

  onFilterInputChanage(target: EventTarget| null){
    if(!target)
      return;
    let input = target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  private async initTable(){
    let users = await this.usersService.getUsers();
    let accesses = await this.projectService.getProjectAccessByProjectId(this.selectedProjectId);
    let userIdsWithAccess = new Set<string>();
    accesses.forEach(a => {userIdsWithAccess.add(a.userId)});

    users.forEach(user => {
      if(userIdsWithAccess.has(user.id))
        this.usersWithAccess.push(user);
      else
        this.availableUsers.push(user);
    })   

    await this.refreshTable();
  }

  private async refreshTable(){
    this.dataSource.data = this.usersWithAccess;
  }
}
