import { Component, OnInit } from '@angular/core';

import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  public startdate:string=''
  public enddate:string
  constructor(private chooser: Chooser) { }

  ngOnInit() {
  }

  addFile(){
    this.chooser.getFile()
    .then(file => console.log(file ? file.name : 'canceled'))
    .catch((error: any) => console.error(error));
  }
}
