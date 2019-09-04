import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  nameTeam: string;
  id: any;
  nameMicro = localStorage.getItem('mi');
  nameMacro = localStorage.getItem('ma');
  planificacio = localStorage.getItem('p');
  session: any[] = [];
  constructor(
    private _service: TeamService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }
  sessionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dataInit: new FormControl('', Validators.required),
    dataFinish: new FormControl('', Validators.required)
  })
  ngOnInit() {
    this.showTeam();
  }
  showTeam() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this._service.getTeam().subscribe(data => {
      const team = [...data];
      let te = team.filter((t: any) => {
        if (t.id === id) {
          return t;
        }
      });
      this.nameTeam = te[0].team_name;
    });
  }
  onExercise(){
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.router.navigate(['exercises/', this.id]);
    localStorage.setItem('se', this.sessionForm.value.name);
  }
  
  onSubmit(e: any){
    let session = {
      name: this.sessionForm.value.name
    }
    this.session.push(session);
    console.log(session);
  }
}
