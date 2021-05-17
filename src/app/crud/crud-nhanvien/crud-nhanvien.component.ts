import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { NhanVien } from 'src/app/models/nhan-vien';
import { NhanvienService } from 'src/app/services/nhanvien.service';

@Component({
    selector: 'app-crud-nhanvien',
    templateUrl: './crud-nhanvien.component.html',
    styleUrls: ['./crud-nhanvien.component.scss'],
    styles: [`
  `],
    providers: [
        MessageService,
        ConfirmationService,
        NhanvienService,
    ]
})
export class CrudNhanvienComponent implements OnInit {

    nhanVienDialog: boolean;
    nhanViens: NhanVien[];
    nhanVien: NhanVien;
    selectedNhanViens: NhanVien[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: NhanvienService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then(data => this.nhanViens = data);
        this.exportColumns = this.nhanViens;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.nhanVien = {};
        this.submitted = false;
        this.nhanVienDialog = true;
    }

    edit(nhanVien: NhanVien) {
        this.nhanVien = { ...nhanVien };
        this.nhanVienDialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected nhanViens?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nhanViens = this.nhanViens.filter(val => !this.selectedNhanViens.includes(val));
                this.selectedNhanViens = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(nhanVien: NhanVien) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + nhanVien.ten + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nhanViens = this.nhanViens.filter(val => val.code !== nhanVien.code);
                this.nhanVien = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xoá', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.nhanVienDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        if (this.nhanVien.ten.trim()) {
            if (this.nhanVien.code) {
                this.nhanViens[this.findIndexById(this.nhanVien.code)] = this.nhanVien;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
            }
            else {
                this.nhanVien.code = this.createId();
                this.nhanVien.hinhAnh = 'nhanVien-placeholder.svg';
                this.nhanViens.push(this.nhanVien);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
            }

            this.nhanViens = [...this.nhanViens];
            this.nhanVienDialog = false;
            this.nhanVien = {};
        }
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.nhanViens.length; i++) {
            if (this.nhanViens[i].code === code) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    

    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0,0);
                doc.autoTable(this.exportColumns, this.nhanViens);
                doc.save('nhanViens.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.nhanViens);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "nhanViens");
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
                this.messageService.add({severity:'success', summary:'Success', detail:'Hoàn thành!'});
            },
            reject: (type) => {
                switch(type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({severity:'warn', summary:'Rejected', detail:'You have rejected'});
                    break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                    break;
                }
            },
            key: "positionDialog"
        });
    }
}
