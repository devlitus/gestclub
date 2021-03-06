import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSelect } from "@ionic/angular";
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-team-play",
  templateUrl: "./team-play.component.html",
  styleUrls: ["./team-play.component.scss"]
})
export class TeamPlayComponent implements OnInit {
  @ViewChild("ion-select", { static: true }) select: IonSelect;
  play: any;
  otros: any;
  checked = true;
  hidden = true;
  users = [];
  date: any = [];
  isChecked: boolean;
  id: any;
  constructor(public activatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.restarYear();
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
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
  onSubmit(form: NgForm) {
    this.hidden = false;
    this.users = [
      { name: "Antonio Fernandez" },
      { name: "Maria Perez" },
      { name: "Jordi Pujol" },
      { name: "Pepe Hernandez" }
    ];
    console.log(form.value);
  }
  onCheck(user: any){
    console.log(user);
  }
  onSelect(e: any) {
    if (e.detail.value[0] == 1) {
      this.hidden = false;
      this.users = [
        { name: "Antonio Fernandez" },
        { name: "Maria Perez" },
        { name: "Jordi Pujol" },
        { name: "Pepe Hernandez" }
      ];
    } else {
      this.hidden = false;
      this.users = [
        { name: "Pepeito Perez" },
        { name: "Jose Pujol" },
        { name: "Manuel Fernandez" },
        { name: "Julia Heferson" }
      ];
    }
    if (e.detail.value[0] == 1 && e.detail.value[1] == 2) {
      this.users = [
        { name: "Pepeito Perez" },
        { name: "Jose Pujol" },
        { name: "Manuel Fernandez" },
        { name: "Julia Heferson" },
        { name: "Antonio Fernandez" },
        { name: "Maria Perez" },
        { name: "Jordi Pujol" },
        { name: "Pepe Hernandez" }
      ];
      console.log(e.detail.value);
    }
  }
  restarYear(){
    let cantidad = 1
    let contador = 30
    while(contador >= 0){
      let restaYear = new Date().getFullYear()+1;
      restaYear = restaYear - cantidad;
      this.date.push(restaYear);
      cantidad++;
      contador--;
    }
  }
}
