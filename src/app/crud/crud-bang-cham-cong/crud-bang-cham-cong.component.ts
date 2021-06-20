import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { BangChamCong } from 'src/app/models/bangchamcong';
import { BangChamCongService } from 'src/app/services/bangchamcong.service';

@Component({
    selector: 'app-crud-BangChamCong',
    templateUrl: './crud-bang-cham-cong.component.html',
    styleUrls: ['./crud-bang-cham-cong.component.scss'],
    providers: [
        MessageService,
        ConfirmationService,
        BangChamCongService,
    ]
})
export class CrudBangChamCongComponent implements OnInit {

    dialog: boolean;
    BangChamCongs: BangChamCong[];
    BangChamCong: BangChamCong;
    selectedBangChamCongs: BangChamCong[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: BangChamCongService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then((data) => {
            if (data.status == 200)
                this.BangChamCongs = data.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        }).catch((e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        });
        this.exportColumns = this.BangChamCongs;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.BangChamCong = {};
        this.submitted = false;
        this.dialog = true;
    }

    edit(BangChamCong: BangChamCong) {
        this.BangChamCong = { ...BangChamCong };
        this.dialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected BangChamCongs?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.BangChamCongs = this.BangChamCongs.filter(val => !this.selectedBangChamCongs.includes(val));
                this.selectedBangChamCongs = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(BangChamCong: BangChamCong) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + BangChamCong.ma_NhanVien + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.dataService.deleteOne(BangChamCong).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.BangChamCongs = this.BangChamCongs.filter(val => val.code !== BangChamCong.code);
                        this.BangChamCong = {};
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
        if (this.BangChamCong.code) {
            await this.dataService.put(this.BangChamCong).then((data: any) => {
                if (data.status == 200 && data.data > 0) {
                    this.BangChamCongs[this.findIndexById(this.BangChamCong.code)] = this.BangChamCong;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
                }
            }).catch((e) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
            });
        }
        else {
            this.BangChamCong.code = this.createId();
            await this.dataService.post(this.BangChamCong).then((data: any) => {
                if (data.status == 200 && data.data > 0) {
                    this.BangChamCongs.push(this.BangChamCong);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
                }
            }).catch((e) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
            });
        }
        this.BangChamCongs = [...this.BangChamCongs];
        this.dialog = false;
        this.BangChamCong = {};
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.BangChamCongs.length; i++) {
            if (this.BangChamCongs[i].code == code) {
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
                doc.autoTable(this.exportColumns, this.BangChamCongs);
                doc.save('BangChamCongs.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.BangChamCongs);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "BangChamCongs");
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
