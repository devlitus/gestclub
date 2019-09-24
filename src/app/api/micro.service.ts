import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MicroService {
  constructor(private _http: HttpClient) { }
  getMicro() {
    return this._http.get(`${url}/micro`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.micro;
        } else {
          return data.error;
        }
      })
    );
  }
  getMaterialMicro(id: any, macro: string) {
    return this._http
      .post(`${url}/material_micro`, { id: id, macro: macro })
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
  insertMicro(micro: any) {
    return this._http.post(`${url}/insert_micro`, micro).pipe(
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
