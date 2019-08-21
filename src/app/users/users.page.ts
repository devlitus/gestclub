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
      if(data.ok){
        this.users = [...data.users];
      }
    })
  }

  onEdit(item: any){
    console.log(item);
  }
  onTrash(id: any){
    this.alert("¿ Segu que vols eliminal ?")
    console.log(id)
  }
  async alert(message: string){
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
            console.log('confirmado')
          }
        }
      ]
    })
    await alert.present()
  }
}
