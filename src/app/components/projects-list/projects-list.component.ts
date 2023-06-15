import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Project>();
  displayedColumns = ['name', 'description', 'actions'];
  projectSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private projectService: ProjectService, private router: Router) { 
    this.projectSubscription = projectService.projectsChanged.subscribe(projects => {this.dataSource.data = projects})
    
  }

  async ngOnInit(){
    this.dataSource.data = await this.projectService.getProjects();
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
    this.router.navigate(['/projects/' + projectId])
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
