import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  nameTeam: string;
  id: any;
  materies = [
    {
      id: 1,
      nom: 'fisica'
    },
    {
      id:2,
      nom: 'relacionades macros'
    },
    {
      id: 3,
      nom: 'ni puta idea'
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
  onSession(){
    this.id =this.activatedRoute.snapshot.paramMap.get("id");
    this.router.navigate(['/session/', this.id]);
  }
}
