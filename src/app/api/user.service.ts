import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUser(){
    return this._http.get(url+'/users');
  }
}
