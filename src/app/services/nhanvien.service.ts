import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { NhanVien } from '../models/nhanvien';

@Injectable()
export class NhanvienService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    constructor(private http: HttpClient) { }

    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/NhanVien/GetAll').toPromise();
    }

    async put(record: NhanVien) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/NhanVien/Put', record).toPromise();
    }

    async post(record: NhanVien) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/NhanVien/Post', record).toPromise();
    }

    async deleteOne(record: NhanVien) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/NhanVien/Delete', { body: record }).toPromise();
    }
}
