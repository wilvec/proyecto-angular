import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
    this.title = "Wilman Vega Castilla";
    this.subtitle = "Ingeniero de Sistemas";
    this.email = "wilmanvega@gmail.com";
  }

  ngOnInit(): void {
  }

}
