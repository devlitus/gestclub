import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../config/config";
import { map } from "rxjs/operators";
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
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
    private storage: Storage
    ) {}

  getUser(user: any) {
    return this._http.get(url + "/users").pipe(
      map((data: any) => {
        if(data.ok){
          
        }
      })
    );
  }
  verficarLogin(user: any) {
    return this._http.post(url+ '/login', user)
    .pipe(map((data: any) => {
      if (data.ok){
        console.log(data.user);
        this.currentUser = data.user;
        this.saveLocalStorage(this.currentUser);
        this.router.navigate(['/deport']);
      }else {
        this.alert("El nom o la contrasenya son incorrectes", "Hable con el administrador o intente de nuevo");
      }
      console.log(data);
    }))
  }
  getTotalUsers(){
    return this._http.get(url +'/users').pipe(map((data: any) => {
      if(data.ok){
        return data.users
      }
    }));
  }
  insertUser(from: any) {
    return this._http.post(url, from).pipe(
      map((data: any) => {
        console.log(data);
      })
    )
  }
  saveLocalStorage(user: any){
    if(user){
      let u = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        foto: user.img,
        team: user.team
      }
      localStorage.setItem("user", JSON.stringify(u));
    }
  }
  async alert(message: string, sub?: string) {
    let alert = await this.alertCtrl.create({
      header: message,
      subHeader: "Hable con el administrador o intente de nuevo",
      buttons: ["Aceptar"]
    });
    await alert.present();
  }
}
