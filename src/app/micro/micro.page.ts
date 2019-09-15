import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroService } from '../api/micro.service';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  nameTeam: any = JSON.parse(localStorage.getItem('t'));
  namePlanning = JSON.parse(localStorage.getItem('p'));
  nameMacro = JSON.parse(localStorage.getItem('ma'));
  micros: any[] = []; 
  materialMicro: any[] = [];
  microForm = new FormGroup({
    micro: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })
  
  constructor(
    private _service: MicroService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
  }
  showMicro(){
    this._service.getMicro().subscribe(data => {
      this.micros = [...data];
    })
  }
  showMaterialMicro(){
    this._service.getMaterialMacro().subscribe(data => {
      this.materialMicro = [...data];
    })
  }

  onSubmit(e: any){
    if(this.microForm.valid){
      let micro = {
        micro: this.microForm.value.micro,
        dateInit: this.microForm.value.dateInit,
        dateFinish: this.microForm.value.dateFinish,
        material: this.microForm.value.material,
        idMacro: this.nameMacro.id
      }
      console.log(micro)
    }
  }
  onSession(){
    localStorage.setItem('mi', this.microForm.value.name);
  }
}
