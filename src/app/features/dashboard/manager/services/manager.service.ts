import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/iproject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _HttpClient : HttpClient) { }
  onCreateNewPeoject(projectInfo :IProject) : Observable<any> {
   return this._HttpClient.post('Project', projectInfo)
  }
}
