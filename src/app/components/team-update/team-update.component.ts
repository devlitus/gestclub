import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/api/user.service";

@Component({
  selector: "app-team-update",
  templateUrl: "./team-update.component.html",
  styleUrls: ["./team-update.component.scss"]
})
export class TeamUpdateComponent implements OnInit {
  users: any[] = [];
 
  constructor(private _server: UserService) {
  
  }
  

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._server.getTotalUsers().subscribe(data => {
      const u = [...data];
      this.users = u;
      console.log(this.users)
    });
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
