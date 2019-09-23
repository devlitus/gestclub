import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanningService } from '../api/planning.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  lsTeam = JSON.parse(localStorage.getItem('t'));
  lsMicro = JSON.parse(localStorage.getItem('mi'));
  planning: string;
  sessionForm = new FormGroup({
    session: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    idPlannig: new FormControl('', Validators.required),
    micro: new FormControl('', Validators.required)
  })
  constructor(
    private _servicePLa: PlanningService,
    public router: Router,
  ) { }
  ngOnInit() {
    this.showPlanning();
  }

  showPlanning(){
    const id = this.lsTeam[0].id_planning;
    this._servicePLa.onlyPlanning(id).subscribe((data: any) => {
      this.planning = data.planning; 
    })
  }
  
  
  
}
