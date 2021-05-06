import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TaskRequestModel } from '../models/tasks-request-moudel';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {}
    getTasks() {
      return this.http.get(environment.apiUrl + '/tasks');
    }
  addTask(body: TaskRequestModel){
    return this.http.post(environment.apiUrl + '/tasks', body);

  }
  editTask(body: TaskRequestModel){
    return this.http.put(environment.apiUrl + '/tasks/' + body.id , body);

  }
  deleteTask(id: TaskRequestModel){
    return this.http.delete(environment.apiUrl + `/tasks/${id}`);

  }
}
