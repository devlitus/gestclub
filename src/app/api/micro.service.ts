import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MicroService {
  constructor(private _http: HttpClient) {}
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
  getMaterialMicro() {
    return this._http.get(`${url}/material_micro`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.micro;
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
          return data.message;
        } else {
          return data.error;
        }
      })
    );
  }
}
