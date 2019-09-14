import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MicroService } from '../api/micro.service';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  nameTeam = JSON.parse(localStorage.getItem("t"));
  namePlanning = JSON.parse(localStorage.getItem('p'));
  nameMacro = JSON.parse(localStorage.getItem('ma'));
  micro: any[] = [];
  materialMicro: any[] = [];
  microForm = new FormGroup({
    micro: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })
  constructor(
    public _service: MicroService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.nameMacro)
  }
  showMicro(){
    this._service.getMicro().subscribe(data => {
      this.micro = [...data];
    })
  }
  showMaterialMicro(){
    this._service.getMaterialMicro().subscribe(data => {
      this.materialMicro = [...data];
    })
  }
  
  onSubmit(e: any){
    if (this.microForm.valid){
      let micro = {
        micro: this.microForm.value.micro,
        dateInit: this.microForm.value.dateInit,
        dateFinish: this.microForm.value.dateFinish,
        material: this.microForm.value.material
      }
    }
  }
  onSession(){
    
  }
}
