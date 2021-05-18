import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { QuyenTruyCap } from '../models/quyentruycap';

@Injectable()
export class QuyenTruyCapService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/QuyenTruyCap/GetAll').toPromise();
    }

    async put(record: QuyenTruyCap) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/QuyenTruyCap/Put', record).toPromise();
    }

    async post(record: QuyenTruyCap) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/QuyenTruyCap/Post', record).toPromise();
    }

    async deleteOne(record: QuyenTruyCap) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/QuyenTruyCap/Delete', { body: record }).toPromise();
    }
}
