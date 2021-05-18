import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { DanhSachNhanVien } from '../models/danhsachnhanvien';

@Injectable()
export class DanhSachNhanVienService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/DanhSachNhanVien/GetAll').toPromise();
    }

    async put(record: DanhSachNhanVien) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/DanhSachNhanVien/Put', record).toPromise();
    }

    async post(record: DanhSachNhanVien) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/DanhSachNhanVien/Post', record).toPromise();
    }

    async deleteOne(record: DanhSachNhanVien) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/DanhSachNhanVien/Delete', { body: record }).toPromise();
    }
}
