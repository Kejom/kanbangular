import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs'
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Feature } from 'src/app/models/feature.model';
import { FeatureService } from 'src/app/services/feature.service';
import { ProjectService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Feature>();
  displayedColumns = ['name', 'description', 'priority', 'status', 'actions'];
  featuresSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private featureService: FeatureService, private projectService: ProjectService){
    this.featuresSubscription = featureService.featuresChanged.subscribe(features => {this.dataSource.data = features})

    if(projectService.selectedProject)
      featureService.initFeaturesForProject(projectService.selectedProject.id);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.featuresSubscription.unsubscribe();
  }

  onOpen(featureId: string){
    console.log(featureId);
  }

  onRemove(featureId: string){
    this.featureService.removeFeature(featureId);
  }

  onFilterInputChanage(target: EventTarget| null){
    if(!target)
      return;
    let input = target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }
}
