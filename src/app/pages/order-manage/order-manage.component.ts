import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Declare } from 'src/app/declare';
import { HoaDon } from 'src/app/models/hoadon';
import { ProductListDemo } from 'src/app/showcase/components/dynamicdialog/productlistdemo';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss'],
  providers:[
    MessageService,
    DialogService,
  ],
})
export class OrderManageComponent implements OnInit, OnDestroy {
  hubConnection: signalR.HubConnection;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  shows: string[] = ['Đã xác nhận', 'Chưa xác nhận', 'LOWSTOCK'];
  sources: HoaDon[];
  targets: HoaDon[];
  ref: DynamicDialogRef;
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private dialogService: DialogService
    ) 
  {
    this.hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect()
      .withUrl(Declare.realtimeServer + 'order')
      .build();
    this.hubConnection.start().catch((err) => console.log(err.toString()));
  }

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
  }

  ngOnInit() {
    this.reloadScreen();
    this.hubConnection.on('sync', (data) => {
      if(data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Đã cập nhật!" });
      this.sources = (data as HoaDon[]).filter(m => m.trangThai == 1).map((m)=>{
        m.status = this.status[1];
        m.show = this.shows[1];
        return m;
      });
      this.targets = (data as HoaDon[]).filter(m => m.trangThai == 2).map((m)=>{
        m.status = this.status[0];
        m.show = this.shows[0];
        return m;
      });
    });
  }

  async show() {
    this.ref = this.dialogService.open(ProductListDemo, {
        header: 'Choose a Product',
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
    });
  }

  async updateState(data: any, status: number){
    switch (status) { // 1 = khách hàng đặt trên web, 2 = Đã xác nhận đặt chỗ, 5 = Đã thanh toán, 6 = Huỷ bỏ
      case 1:
        data.items.trangThai = 1;
        data.items.status = this.status[1];
        data.items.show = this.shows[1];
        break;
      case 2:
        data.items.trangThai = 2;
        data.items.status = this.status[0];
        data.items.show = this.shows[0];
        break;
      default:
        return;
    }
    let allData = this.sources.concat(this.targets);
    await this.PutOrderSync(allData).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e });
    });
  }

  async reloadScreen(){
    this.http.get(Declare.serverApiPath + 'v2.0/Order/GetOrders').toPromise().then((data: any) => {
      if(data && data.status == 200){
        this.sources = (data.data as HoaDon[]).filter(m => m.trangThai == 1).map((m)=>{
          m.status = this.status[1];
          m.show = this.shows[1];
          return m;
        });
        this.targets = (data.data as HoaDon[]).filter(m => m.trangThai == 2).map((m)=>{
          m.status = this.status[0];
          m.show = this.shows[0];
          return m;
        });
      }
    }).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ." });
    });
  }

  async PutOrderSync(hoaDons: HoaDon[]){
    return this.http.put(Declare.realtimeServer + 'api/v2.0/Order/PutSync', hoaDons).toPromise();
  }
}
