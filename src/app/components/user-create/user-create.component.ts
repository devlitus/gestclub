import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  user: any = {};
  
  constructor(
    public route: ActivatedRoute, 
    public toastCtrl: ToastController,
    private _service: UserService
    ) { }
  
  ngOnInit() {
    this.getUser()
  }
  getUser(){
    const id = this.route.snapshot.paramMap.get('id');
    this._service.getUser(id)
    .subscribe(data => {
      this.user = {
        username: data[0].username,
        lastname: data[0].lastname,
        password: data[0].password,
        email: data[0].email,
        telf: data[0].telf,
        team: data[0].team
      }
      console.log(data);
    })
  }
  onSubmit(form: NgForm){
    this.toast();
    console.log(form.value)
  }
  async toast(){
    const toast  = await this.toastCtrl.create({
      message: 'Usuari actualitzat correctament !!!!!!',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}