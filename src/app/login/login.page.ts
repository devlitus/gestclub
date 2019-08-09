import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    if(isNullOrUndefined(form.value.name) || isNullOrUndefined(form.value.pass)){
      this.alert();
    }else if (form.value.name === "" || form.value.pass === ""){
      this.alert();
    }
  }

  async alert (){
    let alert = await this.alertCtrl.create({
      header: 'Usuario Incorrecto!',
      subHeader: 'Hable con el administrador o intente de nuevo',
      buttons: ["Aceptar"]
    })
    await alert.present()
  }

}
