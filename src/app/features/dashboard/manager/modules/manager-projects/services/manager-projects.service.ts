import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/iproject';

@Injectable({
  providedIn: 'root'
})
export class ManagerProjectsService {

  constructor(private _HttpClient : HttpClient) { }
  onCreateNewProject(infoProject: IProject): Observable<any> {
    return this._HttpClient.post('Project', infoProject)
  }
}
