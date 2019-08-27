import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../api/team.service';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {
  id: any;
  nameTeam: string;
  materies = [
    {
      id: 1,
      nom: 'fisica'
    },
    {
      id:2,
      nom: 'no se'
    },
    {
      id: 3,
      nom: 'ni puta idea'
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
    this.router.navigate(['/micro/', this.id]);
  }
}
