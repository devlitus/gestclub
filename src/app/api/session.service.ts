import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private _http: HttpClient) {}
  getSession() {
    return this._http.get(`${url}/session`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.session;
        } else {
          return data.error;
        }
      })
    );
  }
  insertSession(session: any){
    return this._http.post(`${url}`, session).pipe(
      map((data: any) => {
        if (data.ok) {
          console.log(data.message);
          return data.message;
        }else{
          console.log(data.error);
          return data.error;
        }
      })
    )
  }
}
