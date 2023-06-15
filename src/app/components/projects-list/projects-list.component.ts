import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Project>();
  displayedColumns = ['name', 'description', 'actions'];
  projectSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private projectService: ProjectService) { 
    this.projectSubscription = projectService.projectsChanged.subscribe(projects => {this.dataSource.data = projects})
    this.dataSource.data = projectService.getProjects();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

  onSelect(projectId: string){
    this.projectService.selectProject(projectId);
  }

  onRemove(projectId: string){
    this.projectService.removeProject(projectId);
  }

  onFilterInputChanage(target: EventTarget| null){
    if(!target)
      return;
    let input = target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

}
