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
      name: username,
      pass: form.value.pass
    }
    this._service.getUser(user).subscribe()
    // this.router.navigate(['/team']);
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
