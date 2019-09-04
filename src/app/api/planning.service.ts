import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { url } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private _http:HttpClient) { }

  getPLanning(){
    return this._http.get(`${url}/planning`).pipe(
      map((data: any) => {
        if(data.ok){
          return data.planning;
        }
      })
    )
  }
  insertPlanning(planning: any){
    return this._http.post(`${url}/insert_planning`, planning).pipe(
      map((data: any) => {
        console.log(data);
      })
    )
  }
}
