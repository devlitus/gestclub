import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.page.html',
  styleUrls: ['./macro.page.scss'],
})
export class MacroPage implements OnInit {

  materies = [
    {
      id: 1,
      nom: 'fisica'
    },
    {
      id:2,
      nom: 'no se'
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
