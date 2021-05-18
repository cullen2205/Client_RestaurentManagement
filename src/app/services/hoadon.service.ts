import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { HoaDon } from '../models/hoadon';

@Injectable()
export class HoaDonService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/HoaDon/GetAll').toPromise();
    }

    async put(record: HoaDon) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/HoaDon/Put', record).toPromise();
    }

    async post(record: HoaDon) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/HoaDon/Post', record).toPromise();
    }

    async deleteOne(record: HoaDon) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/HoaDon/Delete', { body: record }).toPromise();
    }
}
