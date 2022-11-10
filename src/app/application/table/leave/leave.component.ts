import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  public startdate:string=''

  constructor() { }

  ngOnInit() {
    this.startdate = new Date().toISOString();

  }
  private dateValue: any;
  public enddate:string


  get date(): any {
    return this.dateValue;
  }
  set date(value: any) {
    console.log({ value });
    this.dateValue = value;
  }
}
