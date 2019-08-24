import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {

  constructor() { }
  planning =  new FormGroup({
    dataInit: new FormControl(''),
    dataFinish: new FormControl(''),
    objColectiu: new FormControl(''),
    objIndividual: new FormControl('')
  })
  ngOnInit() {
  }

}
