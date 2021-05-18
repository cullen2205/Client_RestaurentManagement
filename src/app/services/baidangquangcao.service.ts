import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { BaiDangQuangCao } from '../models/baidangquangcao';

@Injectable()
export class BaiDangQuangCaoService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/BaiDangQuangCao/GetAll').toPromise();
    }

    async put(record: BaiDangQuangCao) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/BaiDangQuangCao/Put', record).toPromise();
    }

    async post(record: BaiDangQuangCao) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/BaiDangQuangCao/Post', record).toPromise();
    }

    async deleteOne(record: BaiDangQuangCao) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/BaiDangQuangCao/Delete', { body: record }).toPromise();
    }
}
