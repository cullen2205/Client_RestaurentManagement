import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { ChiNhanh } from '../models/chinhanh';

@Injectable()
export class ChiNhanhService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/ChiNhanh/GetAll').toPromise();
    }

    async put(record: ChiNhanh) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/ChiNhanh/Put', record).toPromise();
    }

    async post(record: ChiNhanh) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/ChiNhanh/Post', record).toPromise();
    }

    async deleteOne(record: ChiNhanh) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/ChiNhanh/Delete', { body: record }).toPromise();
    }
}
