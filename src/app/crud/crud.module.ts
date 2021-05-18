import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CrudBaiDangQuangCaoModule } from './crud-bai-dang-quang-cao/crud-bai-dang-quang-cao.module';
import { CrudBangChamCongModule } from './crud-bang-cham-cong/crud-bang-cham-cong.module';
import { CrudChiNhanhModule } from './crud-chi-nhanh/crud-chi-nhanh.module';
import { CrudComboModule } from './crud-combo/crud-combo.module';
import { CrudCtHoaDonModule } from './crud-ct-hoa-don/crud-ct-hoa-don.module';
import { CrudDanhSachNhanVienModule } from './crud-danh-sach-nhan-vien/crud-danh-sach-nhan-vien.module';
import { CrudGiamGiaComboModule } from './crud-giam-gia-combo/crud-giam-gia-combo.module';
import { CrudHoaDonModule } from './crud-hoa-don/crud-hoa-don.module';
import { CrudKhachhangModule } from './crud-khachhang/crud-khachhang.module';
import { CrudNhaCungCapModule } from './crud-nha-cung-cap/crud-nha-cung-cap.module';
import { CrudNhanVienModule } from './crud-nhanvien/crud-nhanvien.module';
import { CrudPhanPhoiThucPhamModule } from './crud-phan-phoi-thuc-pham/crud-phan-phoi-thuc-pham.module';
import { CrudPhanQuyenModule } from './crud-phan-quyen/crud-phan-quyen.module';
import { CrudQuyenTruyCapModule } from './crud-quyen-truy-cap/crud-quyen-truy-cap.module';
import { CrudThucPhamModule } from './crud-thuc-pham/crud-thuc-pham.module';

@NgModule({
  imports: [
    CrudBaiDangQuangCaoModule,
    CrudBangChamCongModule,
    CrudChiNhanhModule,
    CrudComboModule,
    CrudCtHoaDonModule,
    CrudDanhSachNhanVienModule,
    CrudGiamGiaComboModule,
    CrudHoaDonModule,
    CrudKhachhangModule,
    CrudNhaCungCapModule,
    CrudPhanPhoiThucPhamModule,
    CrudPhanQuyenModule,
    CrudQuyenTruyCapModule,
    CrudThucPhamModule,
    CrudNhanVienModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CrudModule { }
