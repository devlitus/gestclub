import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { url } from "../config/config";

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
  getMaterialSession(micro: string, id: number) {
    return this._http
      .post(`${url}/material_session`, { id: id, micro: micro })
      .pipe(
        map((data: any) => {
          if (data.ok) {
            return data.material;
          } else {
            return data.error;
          }
        })
      );
  }
  insertSession(session: any) {
    return this._http.post(`${url}/inser_session`, session).pipe(
      map((data: any) => {
        if (data.ok) {
          console.log(data.message);
          return data.message;
        } else {
          console.log(data.error);
          return data.error;
        }
      })
    );
  }
}
