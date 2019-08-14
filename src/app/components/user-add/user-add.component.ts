import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {

  constructor(private _service: UserService) { }
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.email]),
    password: new FormControl('', Validators.required),
    telf: new FormControl(''),
    dni: new FormControl('', Validators.required),
    birthday: new FormControl('')
  })
  ngOnInit() {}
  onSubmit(e: any) {
    if(this.userForm.valid){
      const user = this.userForm.value;
      const form = new FormData();
      form.append('username', user.username); 
      form.append('lastname', user.lastname); 
      form.append('email', user.email); 
      form.append('password', user.password); 
      form.append('telf', user.telf);
      form.append('dni', user.dni);
      form.append('birthday', user.birthday);
      form.append('img', e.target.files.files[0]);
      this._service.insertUser(form).subscribe()
      console.warn(form);
    }
    
  }
}
// form.append('imagen', event.target.imagen.files[0]);