import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  public teams: any = [];
  constructor(
    private _serviceTeam: TeamService,
    public router: Router
    ) { }

  ngOnInit() {
    this.showTeam();
  }
  showTeam(){
    this._serviceTeam.getTeam().subscribe(team => {
      let currenUser = JSON.parse(localStorage.getItem("user"));
      const equipos = [...team];
      equipos.filter(t => {
        if (t.id === currenUser.team){
          console.log(t)
          return this.teams = t
        }
      })
    })
  }

}
