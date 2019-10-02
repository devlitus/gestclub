import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import { TeamService } from '../api/team.service';

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
  showTeam() {
    this._serviceTeam.getTeam().subscribe(team => {
      this.teams = [...team];
    })
  }
  insertTeam(team: any) {
    if (!isNullOrUndefined(team)) {
      this._serviceTeam.insertTeam(team).subscribe();
      setTimeout(() => {
        this.showTeam()
      }, 1000);
    } else {
      this.alert();
    }
  }
  deleteTeam(item: any) {
    this._serviceTeam.deleteTeam(item).subscribe();
    setTimeout(() => {
      this.showTeam()
    }, 1000);
  }
  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Afegir Equip!',
      inputs: [
        {
          name: 'team',
          type: 'text',
          placeholder: 'El nom del Equip'
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
          handler: (team) => {
            this.insertTeam(team);
          }
        }
      ]
    });
    await alert.present();
  }
  async alertDeleter(team: any) {
    const alert = await this.alertCtrl.create({
      header: '¿ Segu que vols eliminal ?',
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
          handler: () => {
            this.deleteTeam(team);
          }
        }
      ]
    });
    alert.present();
  }
  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.showTeam()
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 1000);
  }
  onTeamUpdate(teamId: any, teamTeam: any){
    let currentTeam = {
      id: teamId,
      name: teamTeam
    }
    localStorage.setItem("t", JSON.stringify(currentTeam));
    this.router.navigate(['/team/update/', currentTeam.id])
  }
}
