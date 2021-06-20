import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Declare } from 'src/app/declare';
import { HoaDon } from 'src/app/models/hoadon';
import { SignalRService } from 'src/app/services/signal-r.service';
import { SelectFood } from './select-food';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    SignalRService,
  ],
})
export class OrderManageComponent implements OnInit, OnDestroy {
  hubConnection: signalR.HubConnection;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
  shows: string[] = ['Đã xác nhận', 'Chưa xác nhận', 'Đang sử dụng', 'Đã thanh toán'];
  nonComfirms: HoaDon[];
  comfirms: HoaDon[];
  orders: HoaDon[];
  pays: HoaDon[];
  hoaDon: HoaDon;
  ref: DynamicDialogRef;
  dialog: boolean = false;
  position: string;
  submitted: boolean;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private dialogService: DialogService,
    private signalRService: SignalRService,
  ) {
    this.hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect()
      .withUrl(Declare.realtimeServer + 'order')
      .build();
    this.hubConnection.start().catch((err) => console.log(err.toString()));
  }

  openNew() {
    this.hoaDon = {};
    this.hoaDon.ngayGio = new Date();
    this.hoaDon.trangThai = 2;
    this.submitted = false;
    this.dialog = true;
  }

  createId(): string {
    let id = 'HD' + formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
    return id;
  }

  findIndexById(code: string, source: HoaDon[]): number {
    let index = -1;
    for (let i = 0; i < source.length; i++) {
      if (source[i].code == code) {
        index = i;
        break;
      }
    }

    return index;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  async save() {
    this.submitted = true;
    this.dialog = false;
    this.hoaDon.code = this.createId();
    await this.signalRService.postOrderSync(this.hoaDon).then((data: any) => {
      if (data.status == 200 && data.data > 0) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Lưu thành công', life: 3000 });
      }
      else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi xảy ra khiến hành động không thể thực hiện được. Vui lòng thử lại sau.", life: 3000 });
    }).catch((e) => console.error(e));
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  ngOnInit() {
    this.reloadScreen();
    this.hubConnection.on('sync', (data) => {
      if (data)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Đã cập nhật!" });
      this.nonComfirms = (data as HoaDon[]).filter(m => m.trangThai == 1).map((m) => {
        m.status = this.status[1];
        m.show = this.shows[1];
        return m;
      });
      this.comfirms = (data as HoaDon[]).filter(m => m.trangThai == 2).map((m) => {
        m.status = this.status[0];
        m.show = this.shows[0];
        return m;
      });
      this.orders = (data as HoaDon[]).filter(m => m.trangThai == 3).map((m) => {
        m.status = this.status[2];
        m.show = this.shows[2];
        return m;
      });
      this.pays = (data as HoaDon[]).filter(m => m.trangThai == 5).map((m) => {
        m.status = this.status[3];
        m.show = this.shows[3];
        return m;
      });
    });
  }

  /// hiển thị dialog chọn chi tiết món
  async show(data: any) {
    this.ref = this.dialogService.open(SelectFood, {
      header: 'Chọn thực đơn',
      width: '70%',
      data: data.items
    });
  }

  /// cập nhật trạng thái đặt bàn
  async updateState(data: any, status: number) {
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
      case 3:
        data.items.trangThai = 3;
        data.items.status = this.status[2];
        data.items.show = this.shows[2];
        break;
      case 5:
        data.items.trangThai = 5;
        data.items.status = this.status[3];
        data.items.show = this.shows[3];
        break;
      default:
        return;
    }
    let allData = this.nonComfirms.concat(this.comfirms).concat(this.orders).concat(this.pays);
    await this.PutOrderSync(allData).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: e });
    });
  }

  async reloadScreen() {
    this.http.get(Declare.serverApiPath + 'v2.0/Order/GetOrders').toPromise().then((data: any) => {
      if (data && data.status == 200) {
        this.nonComfirms = (data.data as HoaDon[]).filter(m => m.trangThai == 1).map((m) => {
          m.status = this.status[1];
          m.show = this.shows[1];
          return m;
        });
        this.comfirms = (data.data as HoaDon[]).filter(m => m.trangThai == 2).map((m) => {
          m.status = this.status[0];
          m.show = this.shows[0];
          return m;
        });
        this.orders = (data.data as HoaDon[]).filter(m => m.trangThai == 3).map((m) => {
          m.status = this.status[2];
          m.show = this.shows[2];
          return m;
        });
        this.pays = (data.data as HoaDon[]).filter(m => m.trangThai == 5).map((m) => {
          m.status = this.status[3];
          m.show = this.shows[3];
          return m;
        });
      }
    }).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ." });
    });
  }

  async PutOrderSync(hoaDons: HoaDon[]) {
    return this.http.put(Declare.realtimeServer + 'api/v2.0/Order/PutSync', hoaDons).toPromise();
  }
}
