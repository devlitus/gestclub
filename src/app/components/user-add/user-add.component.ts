import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  email = {
    invalid: false
  }

  constructor(private _service: UserService, public tosatCtrl: ToastController) { }
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.email]),
    password: new FormControl('', Validators.required),
    telf: new FormControl(''),
    dni: new FormControl('', Validators.required),
    birthday: new FormControl(''),
    team: new FormControl('')
  })
  ngOnInit() {}
  onSubmit(e: any) {
    if(this.userForm.valid){
      const user = this.userForm.value;
      const form = new FormData();
      form.append('username', user.username); 
      form.append('lastname', user.lastname); 
      form.append('email', user.email); 
      form.append('password', user.password); 
      form.append('telf', user.telf);
      form.append('dni', user.dni);
      form.append('birthday', user.birthday);
      form.append('team', user.team);
      form.append('img', e.target.files.files[0]);
      this._service.insertUser(form).subscribe();
      this.toast("Usuari insertat correctament");
      console.warn(form);
    }
    
  }
  async toast(message: string){
    const toast = await this.tosatCtrl.create({
      message: message,
      position: 'middle',
      duration: 2000
    });
    await toast.present();
  }
}
// form.append('imagen', event.target.imagen.files[0]);