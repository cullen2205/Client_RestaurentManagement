import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Declare } from 'src/app/declare';
import { Combo } from 'src/app/models/combo';
import { CTHoaDon } from 'src/app/models/cthoadon';
import { HoaDon } from 'src/app/models/hoadon';
import { ThucPham } from 'src/app/models/thucpham';

@Component({
    template: `
        <p-table [value]="thucPhams" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="caption">
                <div class="table-header" style="display: flex;">
                    <button pButton pRipple style="margin-left: 0;margin-right: auto;" type="button" label="Lựa chọn khuyến mãi" icon="pi pi-check-square" class="p-button-danger" (click)="showCombo()"></button>
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
    ],
})
export class SelectFood {

    thucPhams: ThucPham[] = [];
    cTHoaDons: CTHoaDon[] = [];
    combo: Combo;
    @Input() hoaDon: HoaDon;
            
    constructor(
        private http: HttpClient,
        public dialog: DynamicDialogRef, 
        public config: DynamicDialogConfig, 
        private messageService: MessageService,) { }

    ngOnInit() {
        this.hoaDon = this.config.data[0];
        this.http.get(Declare.serverApiPath + 'v2.0/Order/GetDetailOrderIndex', 
        { 
            params: { "code": this.hoaDon.code } 
        }).toPromise().then((res: any) =>{
            if(res.status == 200)
                this.thucPhams = (res.data as any[]).map((m)=>{
                    if(m.cTHoaDon)
                    {
                        this.cTHoaDons.push(m.cTHoaDon);
                        if(m.cTHoaDon.soLuong)
                            m.thucPham.soLuongGoi = m.cTHoaDon.soLuong;
                    }
                    else{
                        let cTHoaDon: CTHoaDon = {
                            ma_HoaDon: this.hoaDon.code,
                            ma_ThucPham: m.thucPham.code,
                            soLuong: 0,
                        };
                        this.cTHoaDons.push(cTHoaDon);
                    }
                    return m.thucPham;
                });
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }).catch((e)=>{
            console.log(e);
        });
    }

    showCombo(){
        console.log('Show combo');
    }

    selectThucPham(thucPham: ThucPham, number: number = 1) {
        if(!thucPham.soLuongGoi)
            thucPham.soLuongGoi = 0;
        thucPham.soLuongGoi += number;
        if(thucPham.soLuongGoi < 0)
            thucPham.soLuongGoi = 0;
        if(thucPham.soLuongGoi > thucPham.soLuong)
            thucPham.soLuongGoi = thucPham.soLuong;
        // var index = this.thucPhams.findIndex(m => m.code == thucPham.code);
        // this.thucPhams[index] = thucPham;

        //this.ref.close(thucPham);
    }

    comfirm(thucPhams: ThucPham[]){
        for (let i = 0; i < thucPhams.length; i++) {
            let current = this.cTHoaDons.findIndex(m => (m.ma_HoaDon == this.hoaDon.code && m.ma_ThucPham == thucPhams[i].code));
            this.cTHoaDons[current].soLuong = thucPhams[i].soLuongGoi;
        }
        this.http.post(Declare.serverApiPath + 'v2.0/Order/PostOrderDetail', this.cTHoaDons).toPromise().then((res: any)=>{
            if(res.status == 200){
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                console.log(res.data);
            }
            else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
}