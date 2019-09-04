import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  nameTeam: string;
  id: any;
  namePlanning = localStorage.getItem('p');
  nameMacro = localStorage.getItem('ma');
  micros: any[] = []; 
  materies = [
    {
      id: 1,
      nom: 'Motivació'
    },
    {
      id:2,
      nom: 'Compromís'
    },
    {
      id: 3,
      nom: 'Aspiracions'
    }
  
  ]
  constructor(
    private _service: TeamService, 
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showTeam()
  }
  
  compareWithfn(item){  
    console.log(item);
  }
  compareWith = this.compareWithfn;
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
  microForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dataInit: new FormControl('', Validators.required),
    dataFinish: new FormControl('', Validators.required)
  })
  onSubmit(e: any){
    let micro = {
      name: this.microForm.value.name
    }
    this.micros.push(micro);
    localStorage.setItem('mi', this.microForm.value.name);
  }
  onSession(){
    this.id =this.activatedRoute.snapshot.paramMap.get("id");
    this.router.navigate(['/session/', this.id]);
  }
}
