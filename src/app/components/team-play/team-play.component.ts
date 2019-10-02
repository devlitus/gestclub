import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSelect, AlertController } from "@ionic/angular";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { join } from 'path';

@Component({
  selector: "app-team-play",
  templateUrl: "./team-play.component.html",
  styleUrls: ["./team-play.component.scss"]
})
export class TeamPlayComponent implements OnInit {
  @ViewChild("ion-select", { static: true }) select: IonSelect;
  play: any;
  otros: any;
  users: any[] = [];
  checked = true;
  hidden = true;
  isChecked: boolean;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  filterEdad = new FormGroup({
    dateInit: new FormControl("", Validators.required),
    dateFinish: new FormControl("", Validators.required)
  });
  constructor(
    public activatedRouter: ActivatedRoute,
    public alertCtrl: AlertController,
    private serviceUser: UserService
  ) { }

  ngOnInit() {
    // this.getUsers();
  }
  getUsers() {
    this.serviceUser.getTotalUsers().subscribe((data: any) => {
      this.users = [...data];
    })
  }
  segmentChanged(e: any) {
    if (e.detail.value === "play") {
      this.play = true;
      this.checked = false;
    } else {
      this.play = false;
    }
    if (e.detail.value === "otros") {
      this.otros = true;
      this.checked = false;
    } else {
      this.otros = false;
    }
  }
  onSubmit($e: any) {
    let strDateInit = this.filterEdad.value.dateInit.substring(0,10);
    let strDateFinish = this.filterEdad.value.dateFinish.substring(0,10);
    console.log(strDateInit);
    console.log(strDateFinish);
    this.serviceUser.getDateUsers(strDateInit, strDateFinish).subscribe((data: any) => {
      this.users = [...data];
      console.log(this.users);
    })
  }

  search() {
    this.alert();
  }
  async alert() {
    const alert = await this.alertCtrl.create({
      header: "Introduir el nom a buscar",
      inputs: [
        {
          name: 'username',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelado');
          }
        },
        {
          text: 'Ok',
          handler: (username) => {
            console.log(username);
          }
        }
      ]
    })
    await alert.present();
  }
}
