import { Component, OnInit } from "@angular/core";
import { isNullOrUndefined } from "util";
import { AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { UserService } from "../api/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  pass: any;
  name: any;
  constructor(private _service: UserService, public alertCtrl: AlertController,) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    if (
      isNullOrUndefined(form.value.name) ||
      isNullOrUndefined(form.value.pass)
    ) {
      this.alert("Los campos no puedes estar vacios");
      return;
    } else if (form.value.name === "" || form.value.pass === "") {
      this.alert("Los campos no puedes estar vacios");
      return;
    }
    let username = form.value.name.charAt(0).toUpperCase() + form.value.name.slice(1);
    let user = {
      username: username,
      password  : form.value.pass
    }
    this._service.verficarLogin(user).subscribe();
  }

  async alert(message: string) {
    let alert = await this.alertCtrl.create({
      header: message,
      subHeader: "Introduce los valores correspondientes",
      buttons: ["Aceptar"]
    });
    await alert.present();
  }

}
