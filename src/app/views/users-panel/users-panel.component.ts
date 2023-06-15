import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource} from "@angular/material/table"
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements AfterViewInit {

dataSource  = new MatTableDataSource<User>();
displayedColumns = ['firstName', 'lastName', 'email', 'role', 'remove'];

@ViewChild(MatSort) sort: MatSort | null = null;
@ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private usersService: UsersService){
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async getUsers(){
    this.dataSource.data = await this.usersService.getUsers();
  }

  onFilterInputChanage(target: EventTarget| null){
    if(!target)
      return;
    let input = target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }
}
