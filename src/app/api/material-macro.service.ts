import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialMacroService {

  constructor(private _http: HttpClient) { }
  getMaterialMacro(){
    return this._http.get(`${url}/material_macro`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.material;
        }else{
          console.log(data.error);
          return data.error;
        }
      })
    )
  }
}
