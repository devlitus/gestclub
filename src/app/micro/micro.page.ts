import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-micro',
  templateUrl: './micro.page.html',
  styleUrls: ['./micro.page.scss'],
})
export class MicroPage implements OnInit {
  materies = [
    {
      id: 1,
      nom: 'fisica'
    },
    {
      id:2,
      nom: 'relacionades macros'
    },
    {
      id: 3,
      nom: 'ni puta idea'
    }
  
  ]
  constructor() { }

  ngOnInit() {
  }
  compareWithfn(item){  
    console.log(item);
  }
  compareWith = this.compareWithfn
}
