import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  asideChangeId: Number = 1;
  constructor() { }

  ngOnInit() {
  }
  asideChange(i) {
    this.asideChangeId = i;
  }
}
