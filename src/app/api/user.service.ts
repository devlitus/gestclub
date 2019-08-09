import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
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
    ) {}

  getUser(user: any) {
    return this._http.get(url + "/users").pipe(
      map((data: any) => {
        if(data.ok){
          let currenUser = [...data.users];
          let c = currenUser.filter(u => {
            if(u.username === user.name && u.password === user.pass){
              this.currentUser = u;
              return u;
            }
          })
          if(c.length === 0){
            this.alert("Usuario Incorrecto!!!");
          }else{
            this.saveLocalStorage(this.currentUser);
            this.router.navigate(['/team']);
          }
        }
      })
    );
  }
  saveLocalStorage(user: any){
    if(user){
      let u = {
        name: user.username,
        lasname: user.lasname,
        email: user.email,
        foto: user.img,
        team: user.team
      }
      localStorage.setItem("user", JSON.stringify(u));
    }
  }
  async alert(message: string) {
    let alert = await this.alertCtrl.create({
      header: message,
      subHeader: "Hable con el administrador o intente de nuevo",
      buttons: ["Aceptar"]
    });
    await alert.present();
  }
}
