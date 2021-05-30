import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HoaDon } from 'src/app/models/hoadon';
import { ThucPham } from 'src/app/models/thucpham';
import { ThucPhamService } from 'src/app/services/thucpham.service';

@Component({
    template: `
        <p-table [value]="thucPhams" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="caption">
                <div class="table-header" style="display: flex;">
                    <button pButton pRipple style="margin-left: 0;margin-right: auto;" type="button" label="Xác nhận" icon="pi pi-check-square" class="p-button-success" (click)="comfirm(thucPhams)"></button>
                    <button pButton pRipple style="margin-right: 0;margin-left: auto;" type="button" label="Xác nhận" icon="pi pi-check-square" class="p-button-success" (click)="comfirm(thucPhams)"></button>
                </div>
            </ng-template>
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="ten">Tên <p-sortIcon field="vin"></p-sortIcon></th>
                    <th pSortableColumn="hinhAnh">Hình ảnh</th>
                    <th pSortableColumn="soLuong">Số lượng còn lại<p-sortIcon field="soLuong"></p-sortIcon></th>
                    <th pSortableColumn="donVi">Đơn vị tính<p-sortIcon field="donVi"></p-sortIcon></th>
                    <th pSortableColumn="soLuongGoi">Số lượng gọi<p-sortIcon field="soLuongGoi"></p-sortIcon></th>
                    <th style="width:4em"></th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
                <tr>
                    <td>{{item.ten}}</td>
                    <td><img src="{{item.hinhAnh}}" [alt]="item.hinhAnh" class="product-image" /></td>
                    <td>{{item.soLuong}}</td>
                    <td>{{item.donVi}}</td>
                    <td>{{item.soLuongGoi}}</td>
                    <td>
                        <button type="button" pButton pRipple icon="pi pi-plus" class="p-button-success" (click)="selectThucPham(item, 1)"></button>
                    </td>
                    <td>
                        <button type="button" pButton pRipple icon="pi pi-minus" class="p-button-danger" (click)="selectThucPham(item, -1)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styles: [`
        .product-image {
            width: 80px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
        }

    `],
    providers:[
        ThucPhamService,
    ],
})
export class SelectFood {

    thucPhams: ThucPham[];
    hoaDon: HoaDon;
            
    constructor(
        private thucPhamService: ThucPhamService, 
        public dialog: DynamicDialogRef, 
        public config: DynamicDialogConfig, 
        private messageService: MessageService,) { }

    ngOnInit() {
        this.hoaDon = this.config.data[0];
        this.thucPhamService.getAll().then((res) =>{
            if(res.status == 200)
                this.thucPhams = res.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ!" });
        }).catch((e)=>{
            console.log(e);
        });
    }

    selectThucPham(thucPham: ThucPham, number: number = 1) {
        if(!thucPham.soLuongGoi)
            thucPham.soLuongGoi = 0;
        thucPham.soLuongGoi += number;
        if(thucPham.soLuongGoi < 0)
            thucPham.soLuongGoi = 0;
        // var index = this.thucPhams.findIndex(m => m.code == thucPham.code);
        // this.thucPhams[index] = thucPham;

        //this.ref.close(thucPham);
    }

    comfirm(thucPhams: ThucPham[]){
        console.log(thucPhams);
    }
}