import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { BangChamCong } from '../models/bangchamcong';

@Injectable()
export class BangChamCongService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/BangChamCong/GetAll').toPromise();
    }

    async put(record: BangChamCong) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/BangChamCong/Put', record).toPromise();
    }

    async post(record: BangChamCong) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/BangChamCong/Post', record).toPromise();
    }

    async deleteOne(record: BangChamCong) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/BangChamCong/Delete', { body: record }).toPromise();
    }
}
