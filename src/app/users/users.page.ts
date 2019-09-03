import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = []
  constructor(public _serviceUser:UserService, public alertCtrl: AlertController) { }
  
  ngOnInit() {
    this.showUsers();
  }
  
  showUsers(){
    this._serviceUser.getTotalUsers()
    .subscribe((data: any) => {
      this.users = [...data];
      console.log(this.users);
    })
  }

  onEdit(item: any){
    console.log(item);
  }
  onTrash(user: any){
    this.alert("¿ Segu que vols eliminal ?", user);
  }
  async alert(message: string, user: any){
    const alert = await this.alertCtrl.create({
      header: message,
      subHeader: "Si l'eliminas no podras tornar enrera",
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: 'Acepta',
          cssClass: 'success',
          handler: () => {
            let us = this.users.filter((u: any) => {
              if(u.id !== user.id){
                return u
              }
            })
            this.users = us;
            // console.log('confirmado')
          }
        }
      ]
    })
    await alert.present()
  }
}
