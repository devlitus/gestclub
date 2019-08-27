import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  nameTeam: string;
  id: any
  constructor(
    private _service: TeamService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

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
    this.router.navigate(['exercises/', this.id])
  }
}
