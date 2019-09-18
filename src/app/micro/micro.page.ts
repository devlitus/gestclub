import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MicroService } from '../api/micro.service';
import { PlanningService } from '../api/planning.service';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  idPlanning: any = this.activateRoute.snapshot.paramMap.get('id');
  macroName = localStorage.getItem('ma');
  team = JSON.parse(localStorage.getItem('t'));
  planningName: string;
  material: any[] = [];
  microForm = new FormGroup({
    micro: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })
  constructor(
    public _service: MicroService, 
    public _servicePlanning: PlanningService,
    public activateRoute: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit() {
    this.showMicro();
    this.onlyPlanning();
    this.showMaterialMicro();
  }
  showMicro(){
    this._service.getMicro().subscribe(data => {
      console.log(data);
    })
  }
  onlyPlanning(){
    this._servicePlanning.onlyPlanning(this.idPlanning).subscribe(data => {
      this.planningName = data.planning;
    })
  }
  showMaterialMicro(){
    this._service.getMaterialMicro(this.idPlanning, this.macroName).subscribe(data => {
      this.material = [...data];
    }) 
  }
  
  onSubmit(e: any){
    if (this.microForm.valid){
      let micro = {
        micro: this.microForm.value.micro,
        dateInit: this.microForm.value.dateInit,
        dateFinish: this.microForm.value.dateFinish,
        material: this.microForm.value.material,
        idPlanning: this.idPlanning
      }
    }
  }
  onSession(){
    
  }
}
