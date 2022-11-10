import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{LeaveComponent} from './leave/leave.component'


@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  constructor(public router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(data=>{
      console.log('type',data)
    })

  }

}
