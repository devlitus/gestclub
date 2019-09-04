import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public team: string;
  public planning: any;
  public coach: any = JSON.parse(localStorage.getItem('user'));
  constructor(private route: ActivatedRoute) {
    this.team = this.route.snapshot.paramMap.get('team');
    this.planning = this.route.snapshot.paramMap.get('planning') 
    console.log(this.route.snapshot.paramMap.get('team')); 
    console.log(this.route.snapshot.paramMap.get('planning')); 
  }
  ngOnInit(): void {
    
  }
}
