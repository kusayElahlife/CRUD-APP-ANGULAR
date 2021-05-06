import { Component, OnInit } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { TaskRequestModel } from 'src/app/models/tasks-request-moudel';
import { TasksService } from 'src/app/services/tasks.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bsModalRef!: BsModalRef;
  tasks: any = [] ;

  constructor(
    private tasksService: TasksService,
    private modalService: BsModalService

    ) { }

  ngOnInit(){
    this.onGetAllTasks();
  }
  onGetAllTasks(){
    this.tasksService.getTasks().subscribe(alltasks => {
      this.tasks = alltasks;
      console.log(this.tasks);
    })

  }
  onAddNewTask() {
    this.bsModalRef = this.modalService.show(AddEditTaskComponent);
    this.bsModalRef.content.onClose = (added: any) => {
      if (added) {
        this.onGetAllTasks();
      }
    }
    //this.tasksService.getTasks();
    console.log('new cliked');
  }
  onEditTask(task: any){
    console.log(task)
    this.bsModalRef = this.modalService.show(AddEditTaskComponent, {initialState: {task}});
    this.bsModalRef.content.onClose = (update: any) => {
      if(update) {
        this.onGetAllTasks();
      }
    }
    console.log('Edi Clicked');
  }

  onDeletTask(taskId: TaskRequestModel) {
    let confirmdelet = confirm('Are you sure?');
    if( confirmdelet){
      console.log(confirmdelet);
      this.tasksService.deleteTask(taskId).subscribe(deleteed => {
        this.onGetAllTasks();
      }, err => console.log(err));

    }else{
      console.log(confirmdelet);

    }
  }
}


