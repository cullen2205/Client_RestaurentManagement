import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ChiNhanh } from 'src/app/models/ChiNhanh';
import { ChiNhanhService } from 'src/app/services/ChiNhanh.service';

@Component({
    selector: 'app-crud-ChiNhanh',
    templateUrl: './crud-chi-nhanh.component.html',
    styleUrls: ['./crud-chi-nhanh.component.scss'],
    providers: [
        MessageService,
        ConfirmationService,
        ChiNhanhService,
    ]
})
export class CrudChiNhanhComponent implements OnInit {

    dialog: boolean;
    ChiNhanhs: ChiNhanh[];
    ChiNhanh: ChiNhanh;
    selectedChiNhanhs: ChiNhanh[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: ChiNhanhService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then((data) => {
            if (data.status == 200)
                this.ChiNhanhs = data.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        }).catch((e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        });
        this.exportColumns = this.ChiNhanhs;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.ChiNhanh = {};
        this.submitted = false;
        this.dialog = true;
    }

    edit(ChiNhanh: ChiNhanh) {
        this.ChiNhanh = { ...ChiNhanh };
        this.dialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected ChiNhanhs?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ChiNhanhs = this.ChiNhanhs.filter(val => !this.selectedChiNhanhs.includes(val));
                this.selectedChiNhanhs = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(ChiNhanh: ChiNhanh) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + ChiNhanh.ten + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.dataService.deleteOne(ChiNhanh).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.ChiNhanhs = this.ChiNhanhs.filter(val => val.code !== ChiNhanh.code);
                        this.ChiNhanh = {};
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
        if (this.ChiNhanh.ten.trim()) {
            if (this.ChiNhanh.code) {
                await this.dataService.put(this.ChiNhanh).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.ChiNhanhs[this.findIndexById(this.ChiNhanh.code)] = this.ChiNhanh;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
                    }
                }).catch((e) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
                });
            }
            else {
                this.ChiNhanh.code = this.createId();
                this.ChiNhanh.hinhAnh = 'ChiNhanh-placeholder.svg';
                await this.dataService.post(this.ChiNhanh).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.ChiNhanhs.push(this.ChiNhanh);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
                    }
                }).catch((e) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
                });
            }
            this.ChiNhanhs = [...this.ChiNhanhs];
            this.dialog = false;
            this.ChiNhanh = {};
        }
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.ChiNhanhs.length; i++) {
            if (this.ChiNhanhs[i].code == code) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = 'NV' + formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
        return id;
    }


    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.ChiNhanhs);
                doc.save('ChiNhanhs.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.ChiNhanhs);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "ChiNhanhs");
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
