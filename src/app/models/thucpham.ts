import { CTHoaDon } from "./cthoadon";

export interface ThucPham {
    code?:	string,
    ngayThem?:	Date,
    ngayChinhSua?:	Date,
    nguoiThem?:	string,
    nguoiChinhSua?:	string,
    suDung?:	number,
    
    hinhAnh?:	string,
    ten?:	string,
    soLuong?:	number,
    donVi?:	string,
    giaNhap?:	number,
    giaBan?:	number,
    moTa?:	string,

    soLuongGoi?: number,
}