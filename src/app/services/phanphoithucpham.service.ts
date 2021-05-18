import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { PhanPhoiThucPham } from '../models/phanphoithucpham';

@Injectable()
export class PhanPhoiThucPhamService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/PhanPhoiThucPham/GetAll').toPromise();
    }

    async put(record: PhanPhoiThucPham) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/PhanPhoiThucPham/Put', record).toPromise();
    }

    async post(record: PhanPhoiThucPham) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/PhanPhoiThucPham/Post', record).toPromise();
    }

    async deleteOne(record: PhanPhoiThucPham) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/PhanPhoiThucPham/Delete', { body: record }).toPromise();
    }
}
