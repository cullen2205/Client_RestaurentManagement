import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { NhaCungCap } from '../models/nhacungcap';

@Injectable()
export class NhaCungCapService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/NhaCungCap/GetAll').toPromise();
    }

    async put(record: NhaCungCap) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/NhaCungCap/Put', record).toPromise();
    }

    async post(record: NhaCungCap) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/NhaCungCap/Post', record).toPromise();
    }

    async deleteOne(record: NhaCungCap) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/NhaCungCap/Delete', { body: record }).toPromise();
    }
}
