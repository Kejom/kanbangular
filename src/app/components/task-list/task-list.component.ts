import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>();
  displayedColumns = ['name', 'description', 'priority', 'status', 'actions'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @Output() onRemoveTask = new EventEmitter<string>;

  constructor(private tasksService: TasksService){}

  ngOnInit(){
    this.dataSource.data = this.tasks
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(){
    this.dataSource.data = this.tasks
  }

  async onRemove(taskId: string){
    this.onRemoveTask.emit(taskId);
  }

  onFilterInputChanage(target: EventTarget| null){
    if(!target)
      return;
    let input = target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }
}
