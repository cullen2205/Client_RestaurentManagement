import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { ThucPham } from '../models/thucpham';

@Injectable()
export class ThucPhamService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/ThucPham/GetAll').toPromise();
    }

    async put(record: ThucPham) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/ThucPham/Put', record).toPromise();
    }

    async post(record: ThucPham) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/ThucPham/Post', record).toPromise();
    }

    async deleteOne(record: ThucPham) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/ThucPham/Delete', { body: record }).toPromise();
    }
}
