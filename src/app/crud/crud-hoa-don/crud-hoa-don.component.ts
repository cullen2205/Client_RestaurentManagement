import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { HoaDon } from 'src/app/models/hoadon';
import { HoaDonService } from 'src/app/services/hoadon.service';

@Component({
    selector: 'app-crud-hoa-don',
    templateUrl: './crud-hoa-don.component.html',
    styleUrls: ['./crud-hoa-don.component.scss'],
    providers: [
        MessageService,
        ConfirmationService,
        HoaDonService,
    ]
})
export class CrudHoaDonComponent implements OnInit {

    dialog: boolean;
    hoaDons: HoaDon[];
    hoaDon: HoaDon;
    selectedHoaDons: HoaDon[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: HoaDonService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then((data) => {
            if (data.status == 200)
                this.hoaDons = data.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        }).catch((e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        });
        this.exportColumns = this.hoaDons;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.hoaDon = {};
        this.hoaDon.ngayGio = new Date();
        this.hoaDon.trangThai = 2;
        this.submitted = false;
        this.dialog = true;
    }

    edit(hoaDon: HoaDon) {
        this.hoaDon = { ...hoaDon };
        this.dialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected hoaDons?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hoaDons = this.hoaDons.filter(val => !this.selectedHoaDons.includes(val));
                this.selectedHoaDons = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(hoaDon: HoaDon) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + hoaDon.ngayGio + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.dataService.deleteOne(hoaDon).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.hoaDons = this.hoaDons.filter(val => val.code !== hoaDon.code);
                        this.hoaDon = {};
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xoá', life: 3000 });
                    }
                }).catch((e) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có lỗi khi cố gắng kết nối tới máy chủ, xin hãy thử lại sau.', life: 3000 });
                });
            }
        });
    }

    hideDialog() {
        this.dialog = false;
        this.submitted = false;
    }

    async save() {
        this.submitted = true;
        if (this.hoaDon.code) {
            await this.dataService.put(this.hoaDon).then((data: any) => {
                if (data.status == 200 && data.data > 0) {
                    this.hoaDons[this.findIndexById(this.hoaDon.code)] = this.hoaDon;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
                }
            }).catch((e) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
            });
        }
        else {
            this.hoaDon.code = this.createId();
            await this.dataService.post(this.hoaDon).then((data: any) => {
                if (data.status == 200 && data.data > 0) {
                    this.hoaDons.push(this.hoaDon);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
                }
            }).catch((e) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
            });
        }
        this.hoaDons = [...this.hoaDons];
        this.dialog = false;
        this.hoaDon = {};
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.hoaDons.length; i++) {
            if (this.hoaDons[i].code == code) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = 'HD' + formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
        return id;
    }


    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.hoaDons);
                doc.save('hoaDons.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.hoaDons);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "hoaDons");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    confirmPosition(position: string) {
        this.position = position;
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn xuất ra excel?',
            header: 'Xác nhận tải về',
            icon: 'pi pi-info-circle',
            acceptIcon: '',
            accept: () => {
                this.exportExcel();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hoàn thành!' });
            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            },
            key: "positionDialog"
        });
    }
}
