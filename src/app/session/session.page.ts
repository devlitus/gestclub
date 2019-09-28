import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanningService } from '../api/planning.service';
import { SessionService } from '../api/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  lsTeam = JSON.parse(localStorage.getItem('t'));
  lsMicro = JSON.parse(localStorage.getItem('mi'));
  planning: string;
  materials: any[] = [];
  session: any[] = [];
  sessionForm = new FormGroup({
    session: new FormControl('', Validators.required),
    dateInit: new FormControl('', Validators.required),
    dateFinish: new FormControl('', Validators.required),
    material: new FormControl('')
  })
  constructor(
    private _servicePLa: PlanningService,
    private _serviceSession: SessionService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.showPlanning();
    this.showSession();
    this.showMaterialSession();
  }
  showSession(){
    this._serviceSession.getSession().subscribe((data: any) => {
      this.session = data;
      console.log(data);
    })
  }
  showMaterialSession(){
    let micro =this.lsMicro.micro;
    let id = this.lsMicro.id_planning;
    this._serviceSession.getMaterialSession(micro, id).subscribe((data: any) => {
      this.materials = data;
    })
  }
  showPlanning(){
    const id = this.lsTeam[0].id_planning;
    this._servicePLa.onlyPlanning(id).subscribe((data: any) => {
      this.planning = data.planning; 
    })
  }
  onSubmit(e: any){
    if (this.sessionForm.valid) {
      let session = {
        session: this.sessionForm.value.session,
        dateInit: this.sessionForm.value.dateInit,
        dateFinish: this.sessionForm.value.dateFinish,
        idPlanning: this.lsMicro.id_planning,
        material: this.sessionForm.value.material,
        micro: this.lsMicro.micro
      }
      this._serviceSession.insertSession(session).subscribe();
      setTimeout(() => {
        this.showSession();
      }, 1000);
    }
  }
  onExercise(exercice: any){
    console.log(exercice)
  }
  
}
