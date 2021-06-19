import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudBaiDangQuangCaoComponent } from './crud-bai-dang-quang-cao/crud-bai-dang-quang-cao.component';
import { CrudBangChamCongComponent } from './crud-bang-cham-cong/crud-bang-cham-cong.component';
import { CrudChiNhanhComponent } from './crud-chi-nhanh/crud-chi-nhanh.component';
import { CrudComboComponent } from './crud-combo/crud-combo.component';
import { CrudCtHoaDonComponent } from './crud-ct-hoa-don/crud-ct-hoa-don.component';
import { CrudDanhSachNhanVienComponent } from './crud-danh-sach-nhan-vien/crud-danh-sach-nhan-vien.component';
import { CrudGiamGiaComboComponent } from './crud-giam-gia-combo/crud-giam-gia-combo.component';
import { CrudHoaDonComponent } from './crud-hoa-don/crud-hoa-don.component';
import { CrudKhachhangComponent } from './crud-khachhang/crud-khachhang.component';
import { CrudNhaCungCapComponent } from './crud-nha-cung-cap/crud-nha-cung-cap.component';
import { CrudNhanVienComponent } from './crud-nhanvien/crud-nhanvien.component';
import { CrudPhanPhoiThucPhamComponent } from './crud-phan-phoi-thuc-pham/crud-phan-phoi-thuc-pham.component';
import { CrudPhanQuyenComponent } from './crud-phan-quyen/crud-phan-quyen.component';
import { CrudQuyenTruyCapComponent } from './crud-quyen-truy-cap/crud-quyen-truy-cap.component';
import { CrudThucPhamComponent } from './crud-thuc-pham/crud-thuc-pham.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'bai-dang-quang-cao', component: CrudBaiDangQuangCaoComponent },
			{ path: 'bang-cham-cong', component: CrudBangChamCongComponent },
			{ path: 'chi-nhanh', component: CrudChiNhanhComponent },
			{ path: 'combo', component: CrudComboComponent },
			{ path: 'ct-hoa-don', component: CrudCtHoaDonComponent },
			{ path: 'danh-sach-nhan-vien', component: CrudDanhSachNhanVienComponent },
			{ path: 'giam-gia-combo', component: CrudGiamGiaComboComponent },
			{ path: 'hoa-don', component: CrudHoaDonComponent },
			{ path: 'khach-hang', component: CrudKhachhangComponent },
			{ path: 'nha-cung-cap', component: CrudNhaCungCapComponent },
			{ path: 'phan-phoi-thuc-pham', component: CrudPhanPhoiThucPhamComponent },
			{ path: 'phan-quyen', component: CrudPhanQuyenComponent },
			{ path: 'quyen-truy-cap', component: CrudQuyenTruyCapComponent },
			{ path: 'thuc-pham', component: CrudThucPhamComponent },
			{ path: 'nhan-vien', component: CrudNhanVienComponent },
		])
	],
	exports: [
		RouterModule
	]
})
export class CrudRoutes {}
