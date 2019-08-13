import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = []
  constructor(public _serviceUser:UserService) { }

  ngOnInit() {
    this.showUsers();
  }
  showUsers(){
    this._serviceUser.getTotalUsers()
    .subscribe((data: any) => {
      if(data.ok){
        this.users = [...data.users];
      }
    })
  }
  
}
