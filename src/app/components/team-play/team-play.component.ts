import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSelect } from "@ionic/angular";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-team-play",
  templateUrl: "./team-play.component.html",
  styleUrls: ["./team-play.component.scss"]
})
export class TeamPlayComponent implements OnInit {
  // @ViewChild("ion-select", { static: true }) select: IonSelect;
  date: any = [];
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  formPlay = new FormGroup({
    dateInit: new FormControl(''),
    dateFinish: new FormControl('')
  });
  formOtros = new FormGroup({

  })
  constructor(public activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.restarYear();
  }
  onSubmit(e: any) {
    if (this.formPlay.valid) {
      console.log(this.formPlay.value)
    }
  }
  onCheck(user: any) {
    console.log(user);
  }
  onSelect(e: any) {

  }
  restarYear() {
    let cantidad = 1
    let contador = 30
    while (contador >= 0) {
      let restaYear = new Date().getFullYear() + 1;
      restaYear = restaYear - cantidad;
      this.date.push(restaYear);
      cantidad++;
      contador--;
    }
  }
}
