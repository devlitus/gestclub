import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {

  constructor(public route: ActivatedRoute) {console.log(this.route.snapshot.paramMap.get('id')); }
  acform = new FormGroup({
    username: new FormControl('' ),
    lastname: new FormControl('' ),
    password: new FormControl('' ),
    email: new FormControl('' ),
    tel: new FormControl('')
  });

  ngOnInit() {}

}