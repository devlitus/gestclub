import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.scss'],
})
export class RatingDetailComponent implements OnInit {
  user: any = {};
  constructor(
    private _service: UserService,
    public activatedRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getDetailUser();
  }
  getDetailUser(){
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    this._service.detailUser(id)
    .subscribe(data => {
      this.user = {
        username: data.username,
        lastname: data.lastname,
        team: data.team_name
      }
      // console.log(data.username);
    });
  }
  
}
