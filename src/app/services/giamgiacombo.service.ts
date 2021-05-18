import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { GiamGiaCombo } from '../models/giamgiacombo';

@Injectable()
export class GiamGiaComboService {
    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/showcase/data/products-small.json')
            .toPromise()
            .then(res => <GiamGiaCombo[]>res.data)
            .then(data => { return data; });
    }

    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/GiamGiaCombo/GetAll').toPromise();
    }

    async put(record: GiamGiaCombo) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/GiamGiaCombo/Put', record).toPromise();
    }

    async post(record: GiamGiaCombo) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/GiamGiaCombo/Post', record).toPromise();
    }

    async deleteOne(record: GiamGiaCombo) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/GiamGiaCombo/Delete', { body: record }).toPromise();
    }
}
