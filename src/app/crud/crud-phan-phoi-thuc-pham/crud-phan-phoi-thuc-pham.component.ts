import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { PhanPhoiThucPham } from 'src/app/models/PhanPhoiThucPham';
import { PhanPhoiThucPhamService } from 'src/app/services/PhanPhoiThucPham.service';

@Component({
    selector: 'app-crud-PhanPhoiThucPham',
    templateUrl: './crud-phan-phoi-thuc-pham.component.html',
    styleUrls: ['./crud-phan-phoi-thuc-pham.component.scss'],
    providers: [
        MessageService,
        ConfirmationService,
        PhanPhoiThucPhamService,
    ]
})
export class CrudPhanPhoiThucPhamComponent implements OnInit {

    dialog: boolean;
    PhanPhoiThucPhams: PhanPhoiThucPham[];
    PhanPhoiThucPham: PhanPhoiThucPham;
    selectedPhanPhoiThucPhams: PhanPhoiThucPham[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: PhanPhoiThucPhamService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then((data) => {
            if (data.status == 200)
                this.PhanPhoiThucPhams = data.data;
            else
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        }).catch((e) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
        });
        this.exportColumns = this.PhanPhoiThucPhams;

        this.statuses = [
            { label: 'Không xác định', suDung: -1 },
            { label: 'Không hoạt động', suDung: 0 },
            { label: 'Sử dụng', suDung: 1 }
        ];
    }

    openNew() {
        this.PhanPhoiThucPham = {};
        this.submitted = false;
        this.dialog = true;
    }

    edit(PhanPhoiThucPham: PhanPhoiThucPham) {
        this.PhanPhoiThucPham = { ...PhanPhoiThucPham };
        this.dialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected PhanPhoiThucPhams?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.PhanPhoiThucPhams = this.PhanPhoiThucPhams.filter(val => !this.selectedPhanPhoiThucPhams.includes(val));
                this.selectedPhanPhoiThucPhams = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(PhanPhoiThucPham: PhanPhoiThucPham) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + PhanPhoiThucPham.ma_NhaCungCap + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.dataService.deleteOne(PhanPhoiThucPham).then((data: any) => {
                    if (data.status == 200 && data.data > 0) {
                        this.PhanPhoiThucPhams = this.PhanPhoiThucPhams.filter(val => val.code !== PhanPhoiThucPham.code);
                        this.PhanPhoiThucPham = {};
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
        if (this.PhanPhoiThucPham.code) {
          await this.dataService.put(this.PhanPhoiThucPham).then((data: any) => {
              if (data.status == 200 && data.data > 0) {
                  this.PhanPhoiThucPhams[this.findIndexById(this.PhanPhoiThucPham.code)] = this.PhanPhoiThucPham;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
              }
          }).catch((e) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
          });
      }
      else {
          this.PhanPhoiThucPham.code = this.createId();
          await this.dataService.post(this.PhanPhoiThucPham).then((data: any) => {
              if (data.status == 200 && data.data > 0) {
                  this.PhanPhoiThucPhams.push(this.PhanPhoiThucPham);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
              }
          }).catch((e) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
          });
      }
      this.PhanPhoiThucPhams = [...this.PhanPhoiThucPhams];
      this.dialog = false;
      this.PhanPhoiThucPham = {};
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.PhanPhoiThucPhams.length; i++) {
            if (this.PhanPhoiThucPhams[i].code == code) {
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
                doc.autoTable(this.exportColumns, this.PhanPhoiThucPhams);
                doc.save('PhanPhoiThucPhams.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.PhanPhoiThucPhams);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "PhanPhoiThucPhams");
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
