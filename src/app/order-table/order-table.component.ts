import { Component, OnInit } from '@angular/core';


interface NameCode {
  name: string,
  code: string
}

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})

export class OrderTableComponent implements OnInit {
  selected: NameCode;
	listSelect: NameCode[];
  constructor() {
  	this.listSelect = [
      {name: "Cơ sở Nguyễn Trãi", code: "NT"}, 
      {name: "Cơ sở Hoàng Quốc Việt", code: "HQV"}, 
      {name: "Cơ sở Nguyễn Trí Thanh", code: "NTT"}, 
      {name: "Cơ sở Lê Lợi", code: "LL"}, 
      {name: "Cơ sở Cầu giấy", code: "CG"}, 
    ];
  }

  ngOnInit() {
  }

}
