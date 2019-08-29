import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../api/team.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {
  id: any;
  nameTeam: string;
  namePlanning: any = localStorage.getItem('p');
  macros: any[] = [];
  materies = [
    {
      id: 1,
      nom: 'PSICOLOGIC'
    },
    {
      id:2,
      nom: 'FISIC'
    },
    {
      id: 3,
      nom: 'TECNIC PATI'
    }
  
  ]

  constructor(public activatedRoute: ActivatedRoute, public router: Router, private _service: TeamService) { }

  ngOnInit() {
    this.showTeam()
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
  compareWithfn(item){  
    console.log(item);
  }
  compareWith = this.compareWithfn;
  onMicro(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem("ma", this.macroForm.value.name);
    this.router.navigate(['/micro/', this.id]);
  }
  macroForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dataInit: new FormControl('', Validators.required),
    dataFinish: new FormControl('', Validators.required)
  })
  onSubmit(e: any){
    let macro = {
      name: this.macroForm.value.name
    }
    
    this.macros.push(macro);
  }
}
