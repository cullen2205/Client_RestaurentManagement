import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { CTHoaDon } from '../models/cthoadon';

@Injectable()
export class CTHoaDonService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/CTHoaDon/GetAll').toPromise();
    }

    async put(record: CTHoaDon) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/CTHoaDon/Put', record).toPromise();
    }

    async post(record: CTHoaDon) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/CTHoaDon/Post', record).toPromise();
    }

    async deleteOne(record: CTHoaDon) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/CTHoaDon/Delete', { body: record }).toPromise();
    }
}
