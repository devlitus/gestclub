import { Component, OnInit } from '@angular/core';
import { TeamService } from '../api/team.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  nameTeam: string;
  id: any
  constructor(
    private _service: TeamService,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
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
  onSubmit(form: NgForm){

  }
}
