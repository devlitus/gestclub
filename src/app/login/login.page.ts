import { Component, OnInit } from "@angular/core";
import { isNullOrUndefined } from "util";
import { AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { UserService } from "../api/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    private _service: UserService
  ) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    if (
      isNullOrUndefined(form.value.name) ||
      isNullOrUndefined(form.value.pass)
    ) {
      this.alert();
      return;
    } else if (form.value.name === "" || form.value.pass === "") {
      this.alert();
      return;
    }
    this._service.getUser().subscribe(data => {
      console.log(data);
    });
    // this.router.navigate(['/team']);
  }

  async alert() {
    let alert = await this.alertCtrl.create({
      header: "Usuario Incorrecto!",
      subHeader: "Hable con el administrador o intente de nuevo",
      buttons: ["Aceptar"]
    });
    await alert.present();
  }
}
