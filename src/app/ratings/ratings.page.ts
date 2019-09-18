import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {
  users: any[] = [];
  constructor(private _service: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this._service.getTotalUsers()
    .subscribe(data => {
      console.log(data)
      this.users = [...data]
    })
  }

}
