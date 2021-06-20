import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { KhachHang } from 'src/app/models/khachhang';
import { KhachHangService } from 'src/app/services/khachhang.service'

@Component({
  selector: 'app-crud-khachhang',
  templateUrl: './crud-khachhang.component.html',
  styleUrls: ['./crud-khachhang.component.scss'],
  providers: [
    MessageService,
    ConfirmationService,
    KhachHangService,
]
})
export class CrudKhachhangComponent implements OnInit {

  dialog: boolean;
  KhachHangs: KhachHang[];
  KhachHang: KhachHang;
  selectedKhachHangs: KhachHang[];
  submitted: boolean;
  statuses: any[];
  position: string;
  exportColumns: any[];

  constructor(private dataService: KhachHangService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.dataService.getAll().then((data) => {
          if (data.status == 200)
              this.KhachHangs = data.data;
          else
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
      }).catch((e) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
      });
      this.exportColumns = this.KhachHangs;

      this.statuses = [
          { label: 'Không xác định', suDung: -1 },
          { label: 'Không hoạt động', suDung: 0 },
          { label: 'Sử dụng', suDung: 1 }
      ];
  }

  openNew() {
      this.KhachHang = {};
      this.submitted = false;
      this.dialog = true;
  }

  edit(KhachHang: KhachHang) {
      this.KhachHang = { ...KhachHang };
      this.dialog = true;
  }

  deleteMulti() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected KhachHangs?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.KhachHangs = this.KhachHangs.filter(val => !this.selectedKhachHangs.includes(val));
              this.selectedKhachHangs = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  deleteOne(KhachHang: KhachHang) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + KhachHang.ten + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
              await this.dataService.deleteOne(KhachHang).then((data: any) => {
                  if (data.status == 200 && data.data > 0) {
                      this.KhachHangs = this.KhachHangs.filter(val => val.code !== KhachHang.code);
                      this.KhachHang = {};
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
      if (this.KhachHang.ten.trim()) {
          if (this.KhachHang.code) {
              await this.dataService.put(this.KhachHang).then((data: any) => {
                  if (data.status == 200 && data.data > 0) {
                      this.KhachHangs[this.findIndexById(this.KhachHang.code)] = this.KhachHang;
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cật nhật', life: 3000 });
                  }
              }).catch((e) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
              });
          }
          else {
              this.KhachHang.code = this.createId();
              this.KhachHang.hinhAnh = 'KhachHang-placeholder.svg';
              await this.dataService.post(this.KhachHang).then((data: any) => {
                  if (data.status == 200 && data.data > 0) {
                      this.KhachHangs.push(this.KhachHang);
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tạo mới', life: 3000 });
                  }
              }).catch((e) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: "Đã có lỗi khi cố gắng kết nối tới máy chủ. Vui lòng tải lại trang.", life: 3000 });
              });
          }
          this.KhachHangs = [...this.KhachHangs];
          this.dialog = false;
          this.KhachHang = {};
      }
  }

  findIndexById(code: string): number {
      let index = -1;
      for (let i = 0; i < this.KhachHangs.length; i++) {
          if (this.KhachHangs[i].code == code) {
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
              doc.autoTable(this.exportColumns, this.KhachHangs);
              doc.save('KhachHangs.pdf');
          })
      })
  }

  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.KhachHangs);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "KhachHangs");
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
