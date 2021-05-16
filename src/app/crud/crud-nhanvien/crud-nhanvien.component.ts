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

    productDialog: boolean;
    products: NhanVien[];
    product: NhanVien;
    selectedProducts: NhanVien[];
    submitted: boolean;
    statuses: any[];
    position: string;
    exportColumns: any[];

    constructor(private dataService: NhanvienService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.dataService.getAll().then(data => this.products = data);
        this.exportColumns = this.products.map(col => ({code: col.code, imageUrl: col.image, name: col.name}));

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    edit(nhanVien: NhanVien) {
        this.product = { ...nhanVien };
        this.productDialog = true;
    }

    deleteMulti() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    deleteOne(nhanVien: NhanVien) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + nhanVien.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== nhanVien.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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
                doc.autoTable(this.exportColumns, this.products);
                doc.save('products.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "products");
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
            message: 'Hãy chọn định dạng xuất ra?',
            header: 'Chọn định dạng',
            icon: 'pi pi-info-circle',
            acceptIcon: '',
            accept: () => {
                this.exportExcel();
                this.messageService.add({severity:'success', summary:'Success', detail:'Xuất định dạng thành công!'});
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
