import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { KhachHang } from '../models/khachhang';

@Injectable()
export class KhachHangService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/KhachHang/GetAll').toPromise();
    }

    async put(record: KhachHang) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/KhachHang/Put', record).toPromise();
    }

    async post(record: KhachHang) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/KhachHang/Post', record).toPromise();
    }

    async deleteOne(record: KhachHang) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/KhachHang/Delete', { body: record }).toPromise();
    }
}
