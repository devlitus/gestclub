import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MacroService {

  constructor(private _http: HttpClient) { }
  getMacro() {
    return this._http.get(`${url}/macro`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.macro;
        } else {
          return data.error;
        }
      })
    )
  }
  getMaterialMacro() {
    return this._http.get(`${url}/material_macro`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.material;
        } else {
          return data.error;
        }
      })
    )
  }
  insertMacro(macro: any) {
    return this._http.post(`${url}/insert_macro`, macro).pipe(
      map((data: any) => {
        if (data.ok) {
          return data;
        } else {
          return data.error;
        }
      })
    )
  }
}
