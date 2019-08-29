import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private _http: HttpClient) {}

  getTeam() {
    return this._http.get(url + "/teams").pipe(
      map((data: any) => {
        if (data.ok) {
          return data.team;
        }
      })
    );
  }
}
