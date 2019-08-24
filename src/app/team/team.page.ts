import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  public teams: any = [];
  constructor(
    private _serviceTeam: TeamService,
    public router: Router,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.showTeam();
  }
  showTeam(){
    this._serviceTeam.getTeam().subscribe(team => {
      let currenUser = JSON.parse(localStorage.getItem("user"));
      this.teams = [...team];
    })
  }
  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Afegir Equip!',
      inputs: [
        {
          name: 'team',
          type: 'text',
          placeholder: 'Nom del Equip'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            console.log('Confirm Ok', name);
          }
        }
      ]
    });

    await alert.present();
  }
}
