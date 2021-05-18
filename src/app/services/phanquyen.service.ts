import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { PhanQuyen } from '../models/phanquyen';

@Injectable()
export class PhanQuyenService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/PhanQuyen/GetAll').toPromise();
    }

    async put(record: PhanQuyen) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/PhanQuyen/Put', record).toPromise();
    }

    async post(record: PhanQuyen) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/PhanQuyen/Post', record).toPromise();
    }

    async deleteOne(record: PhanQuyen) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/PhanQuyen/Delete', { body: record }).toPromise();
    }
}
