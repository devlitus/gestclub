import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class TeamService {
  teams: any[] = [];
  constructor(private _http: HttpClient, public toastCtrl: ToastController) { }

  getTeam() {
    return this._http.get(`${url}/teams`).pipe(
      map((data: any) => {
        if (data.ok) {
          this.teams = [...data.teams];
          return data.teams;
        } else {
          return data.error;
        }
      })
    );
  }
  onlyTeam(id: any) {
    return this._http.post(`${url}/only_team`, { id: id }).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.team;
        } else {
          return data.error;
        }
      })
    )
  }
  insertTeam(team: any) {
    return this._http.post(`${url}/insert_team`, team).pipe(
      map((data: any) => {
        if (data.ok) {
          console.log(data.message);
          this.toast(data.message)
        } else {
          this.toast(data.error);
          console.log(data.error);
        }
      })
    )
  }
  deleteTeam(id: any) {
    return this._http.post(`${url}/delete_team`, { id: id }).pipe(
      map((data: any) => {
        if (data.ok) {
          this.toast(data.message);
          console.log(data.message);
        } else {
          this.toast(data.error);
          console.log(data.error);
        }
      })
    )
  }
  async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'middle',
      duration: 1000
    });
    toast.present();
  }
}
