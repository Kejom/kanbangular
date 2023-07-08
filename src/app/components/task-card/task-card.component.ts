import { Component, Input, OnInit} from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input({required: true}) task!: Task;
  assignedUserName: string = "unassigned";


  constructor(private usersService: UsersService){}

  async ngOnInit() {
    if(!this.task.assignedUserId)
      return;

    const assignedUser = await this.usersService.getUser(this.task.assignedUserId)
    this.assignedUserName = `${assignedUser.firstName} ${assignedUser.lastName}`
  }
}
