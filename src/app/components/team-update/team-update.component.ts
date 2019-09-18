import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/api/team.service';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss'],
})
export class TeamUpdateComponent implements OnInit {
  team: any = [];
  currentTeam: any = JSON.parse(localStorage.getItem('t'));
  constructor(public router: Router, private _service: TeamService) {}

  ngOnInit() {
    this.showTeam();
  }
  showTeam(){
    this._service.getTeam()
    .subscribe(data => {
      const team = [...data];
      const t = team.filter(te => {
        if (te.id === this.currentTeam.id) {
          return te;
        }
      });
      localStorage.setItem('t', JSON.stringify(t));
      let te = {
        team: t[0].team
      }
      Object.assign(this.team, te);
    })
  }
  onPlanning(){
    this.router.navigate(['/planning'])
  }

}
