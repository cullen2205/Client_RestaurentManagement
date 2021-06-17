import { CTHoaDon } from "./cthoadon";
import { KhachHang } from "./khachhang";

export interface HoaDon {
    code?:	string,
    ngayThem?:	Date,
    ngayChinhSua?:	Date,
    nguoiThem?:	string,
    nguoiChinhSua?:	string,
    suDung?:	number,
    ngayGio?:	Date,
    ma_KhachHang?:	string,
    ma_ChiNhanh?:	string,
    soNguoi?:	number,
    trangThai?:	number,
    hinhThucThanhToan?:	string,
    thongTinThanhToan?:	string,
    ghiChu?:	string,

    status?: string,
    show?: string,
    details?: CTHoaDon[],
    khachHang?: KhachHang,
}