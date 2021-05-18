import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { Combo } from '../models/combo';

@Injectable()
export class ComboService {
    constructor(private http: HttpClient) { }
    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/Combo/GetAll').toPromise();
    }

    async put(record: Combo) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/Combo/Put', record).toPromise();
    }

    async post(record: Combo) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/Combo/Post', record).toPromise();
    }

    async deleteOne(record: Combo) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/Combo/Delete', { body: record }).toPromise();
    }
}
