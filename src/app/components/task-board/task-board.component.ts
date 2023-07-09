import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit, OnChanges {
  @Input({ required: true }) tasks: Task[] = [];
  @Input({ required: true }) projectId!: string;
  @Output() onEditTask = new EventEmitter<Task>();
  filterInput: string = "";
  selectedUserId: string = "all";
  availableUsers: User[] = []

  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  constructor(private usersService: UsersService, private snackbar: MatSnackBar) { }

  drop(event: CdkDragDrop<Task[]>) {

    let canBeMoved = this.canTaskBeMoved(event.container.element.nativeElement.id, event.previousContainer.data[event.previousIndex])

    if (event.previousContainer === event.container || !canBeMoved) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateTask(event.previousContainer.data[event.previousIndex], event.container.element.nativeElement.id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if (!canBeMoved)
      this.snackbar.open("You need to assign an user to a task before changing it's status to doing or done", "OK");
  }

  async ngOnInit() {
    this.availableUsers = await this.usersService.getUsersByProjectId(this.projectId);
  }

  ngOnChanges() {
    this.initializeBoard();
  }

  onButtonClick() {
    console.log("clicked");
  }

  onFilterInputChange() {
    this.initializeBoard();
  }

  onUserSelectChange(newValue: string) {
    this.selectedUserId = newValue;
    this.initializeBoard();
  }

  private initializeBoard() {
    const todo: Task[] = [];
    const doing: Task[] = [];
    const done: Task[] = [];

    let tasks = this.tasks;

    tasks = this.filterByText(tasks);
    tasks = this.filterByUser(tasks);

    tasks.forEach(t => {
      if (t.status == "todo")
        todo.push(t);
      else if (t.status == "doing")
        doing.push(t);
      else
        done.push(t)
    })

    this.todo = todo;
    this.doing = doing;
    this.done = done;
  }

  private filterByText(tasks: Task[]) {
    if (this.filterInput.length < 3)
      return tasks;

    const filterInput = this.filterInput.trim().toLowerCase();

    return tasks.filter(t => t.name.trim().toLowerCase().includes(filterInput));
  }

  private filterByUser(tasks: Task[]) {

    if (this.selectedUserId === "all")
      return tasks;

    if (this.selectedUserId === "unassigned")
      return tasks.filter(t => !t.assignedUserId)

    return tasks.filter(t => t.assignedUserId === this.selectedUserId);
  }

  private canTaskBeMoved(destination: string, task: Task) {
    return destination === "todo" || !!task.assignedUserId
  }

  private updateTask(task: Task, status: string) {
    if (status === "doing")
      this.setTaskDoing(task);
    else if (status === "done")
      this.setTaskDone(task);
    else
      task.status = "todo";

    this.onEditTask.emit(task);
  }

  private setTaskDoing(task: Task) {
    if (!task.started)
      task.started = new Date();

    task.status = "doing";
  }

  private setTaskDone(task: Task) {
    task.ended = new Date();
    task.status = "done";
  }


}
