import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.css']
})
export class HeaderButtonsComponent implements OnInit {

  @Input() title:string;
  
  constructor() { }

  ngOnInit() {
  }

}

