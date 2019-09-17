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
  idPlanning = this.activateRoute.snapshot.paramMap.get('id');
  microForm = new FormGroup({
    micro: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })
  constructor(
    public _service: MicroService, 
    public activateRoute: ActivatedRoute,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  showMicro(){
    
  }
  showMaterialMicro(){
    
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
