import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { PhanQuyen } from 'src/app/models/PhanQuyen';
import { PhanQuyenService } from 'src/app/services/PhanQuyen.service';

@Component({
    selector: 'app-crud-PhanQuyen',
    templateUrl: './crud-phan-quyen.component.html',
    styleUrls: ['./crud-phan-quyen.component.scss'],
    providers: [
        MessageService,
        ConfirmationService,
        PhanQuyenService,
    ]
})
export class CrudPhanQuyenComponent implements OnInit {

    dialog: boolean;
    PhanQuyens: PhanQuyen[];
    PhanQuyen: PhanQuyen;
    selectedPhanQuyens: PhanQuyen[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: PhanQuyenService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then((data) => {
            if (data.status == 200)
                this.PhanQuyens = data.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        }).catch((e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        });
        this.exportColumns = this.PhanQuyens;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.PhanQuyen = {};
        this.submitted = false;
        this.dialog = true;
    }

    edit(PhanQuyen: PhanQuyen) {
        this.PhanQuyen = { ...PhanQuyen };
        this.dialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected PhanQuyens?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.PhanQuyens = this.PhanQuyens.filter(val => !this.selectedPhanQuyens.includes(val));
                this.selectedPhanQuyens = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(PhanQuyen: PhanQuyen) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + PhanQuyen.ma_QuyenTruyCap + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.dataService.deleteOne(PhanQuyen).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.PhanQuyens = this.PhanQuyens.filter(val => val.code !== PhanQuyen.code);
                        this.PhanQuyen = {};
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
        if (this.PhanQuyen.code) {
          await this.dataService.put(this.PhanQuyen).then((data: any) => {
              if (data.status == 200 && data.data > 0) {
                  this.PhanQuyens[this.findIndexById(this.PhanQuyen.code)] = this.PhanQuyen;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
              }
          }).catch((e) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
          });
      }
      else {
          this.PhanQuyen.code = this.createId();
          await this.dataService.post(this.PhanQuyen).then((data: any) => {
              if (data.status == 200 && data.data > 0) {
                  this.PhanQuyens.push(this.PhanQuyen);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
              }
          }).catch((e) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
          });
      }
      this.PhanQuyens = [...this.PhanQuyens];
      this.dialog = false;
      this.PhanQuyen = {};
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.PhanQuyens.length; i++) {
            if (this.PhanQuyens[i].code == code) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = 'QTC' + formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
        return id;
    }


    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.PhanQuyens);
                doc.save('PhanQuyens.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.PhanQuyens);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "PhanQuyens");
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
