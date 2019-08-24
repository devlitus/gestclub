import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.scss'],
})
export class TeamUpdateComponent implements OnInit {
  users: any[] = [
    {
      id: 1,
      first: 'Antonio',
      last: 'Fernandez',
    },
    {
      id: 2,
      first: 'Maria',
      last: 'Perez',
    },
    {
      id: 3,
      first: 'Julia',
      last: 'Pujol',
    }
  ];
  
  constructor() { }

  ngOnInit() {}
  compareWithFn = (o1, o2) => {
    console.log('o1', o1)
    // console.log('o2', o2)
    // return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  
  compareWith = this.compareWithFn;
}
