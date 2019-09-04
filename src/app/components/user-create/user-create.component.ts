import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  user: any = {};
  id = this.route.snapshot.paramMap.get('id');
  cumple = this.user.birthday;
  actForm: NgForm
  constructor(
    public route: ActivatedRoute, 
    public toastCtrl: ToastController,
    private _service: UserService
    ) { }
  
  ngOnInit() {
    this.getUser();
    
  }

  getUser(){
    this._service.detailUser(this.id)
    .subscribe(data => {
      this.user = data;
    });
  }
  onSubmit(e:any, actForm: NgForm){
    if (actForm.valid){
      let form = new FormData();
      form.append("id", this.id);
      form.append("username", actForm.value.username);
      form.append("lastname", actForm.value.lastname);
      form.append("email", actForm.value.email);
      form.append("telf", actForm.value.telf);
      form.append("address", actForm.value.address);
      form.append("dni", actForm.value.dni);
      form.append("birthday", actForm.value.birthday);
      if (!isNullOrUndefined(e.target.file.files[0])){
        form.append("img", e.target.file.files[0]);  
      }
      this._service.updateUser(form).subscribe();
      this.toast();
    }
    
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