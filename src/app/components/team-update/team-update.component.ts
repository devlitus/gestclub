import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/api/team.service';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss'],
})
export class TeamUpdateComponent implements OnInit {
  team: any = {};
  currentTeam: any = JSON.parse(localStorage.getItem('t'));
  constructor(public router: ActivatedRoute, private _service: TeamService) {}

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
      this.team = {
        id: t[0].id,
        name: t[0].team_name
      }
      console.log(t);
    })
  }

}
