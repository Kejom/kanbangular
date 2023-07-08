import { Component, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnChanges {
  @Input({required: true})tasks: Task[] = [];
  @Output() onEditTask = new EventEmitter<Task>();

  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  constructor(private snackbar: MatSnackBar){}

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

    if(!canBeMoved)
      this.snackbar.open("You need to assign an user to a task before changing it's status to doing or done", "OK");
  }

  ngOnChanges(){
    this.initializeBoard();
  }

  onButtonClick(){
    console.log("clicked");
  }

  private initializeBoard(){
    const todo: Task[] = [];
    const doing: Task[] = [];
    const done: Task[] = [];

    this.tasks.forEach(t => {
      if(t.status == "todo")
        todo.push(t);
      else if(t.status == "doing")
        doing.push(t);
      else
        done.push(t)
    })

    this.todo = todo;
    this.doing = doing;
    this.done = done;
  }

  private canTaskBeMoved( destination: string, task: Task){
    return destination === "todo" || !!task.assignedUserId
  }

  private updateTask(task: Task, status: string){
    if(status === "doing")
      this.setTaskDoing(task);
    else if(status === "done")
      this.setTaskDone(task);
    else
      task.status = "todo";

    this.onEditTask.emit(task);
  }

  private setTaskDoing(task: Task){
    if(!task.started)
      task.started = new Date();
    
    task.status = "doing";
  }

  private setTaskDone(task: Task){
    task.ended = new Date();
    task.status = "done";
  }
}
