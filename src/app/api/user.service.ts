import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";
import {
  AlertController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUser: any = {};

  constructor(
    private _http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private storage: Storage,
    public tosatCtrl: ToastController
  ) {}
  getTotalUsers() {
    return this._http.get(`${url}/users`).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.users;
        }else{
          return data.error;
        }
      })
    );
  }
  detailUser(id: any) {
    return this._http.post(`${url}/detail_user`, { id: id }).pipe(
      map((data: any) => {
        if (data.ok) {
          return data.user;
        }else{
          return data.error;
        }
      })
    );
  }
  verficarLogin(user: any) {
    return this._http.post(`${url}/login`, user).pipe(
      map((data: any) => {
        if (data.ok) {
          this.currentUser = data.user;
          this.saveLocalStorage(this.currentUser);
          this.router.navigate(["/deport"]);
        } else {
          this.alert(
            "El nom o la contrasenya son incorrectes",
            "Parla-ho amb el administrado o intenta-ho de nou"
          );
        }
      })
    );
  }

  insertUser(form: any) {
    return this._http.post(`${url}/insert_user`, form).pipe(
      map((data: any) => {
        if (data.ok) {
          this.toast(data.message);
        }else{
          console.log(data.error);
          this.toast("No s'ha pogut aplica el camvis")
        }
      })
    );
  }
  updateUser(user: any) {
    return this._http.post(`${url}/update_user`, user).pipe(
      map((data: any) => {
        if (data.ok){
          this.toast(data.message);
        }else{
          console.log(data);
        }
      })
    );
  }
  saveLocalStorage(user: any) {
    if (user) {
      let u = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        foto: user.img,
        team: user.team
      };
      localStorage.setItem("user", JSON.stringify(u));
    }
  }
  async alert(message: string, sub?: string) {
    let alert = await this.alertCtrl.create({
      header: message,
      subHeader: sub,
      buttons: ["Aceptar"]
    });
    await alert.present();
  }
  async toast(message: string) {
    const toast = await this.tosatCtrl.create({
      message: message,
      position: "middle",
      duration: 2000
    });
    await toast.present();
  }
}
