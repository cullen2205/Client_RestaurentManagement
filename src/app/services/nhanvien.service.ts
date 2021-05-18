import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Declare } from '../declare';
import { NhanVien } from '../models/nhanvien';

@Injectable()
export class NhanvienService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        "Bamboo Watch",
        "Black Watch",
        "Blue Band",
        "Blue T-Shirt",
        "Bracelet",
        "Brown Purse",
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/showcase/data/products-small.json')
            .toPromise()
            .then(res => <NhanVien[]>res.data)
            .then(data => { return data; });
    }

    async getAll() {
        return this.http.get<any>(Declare.serverApiPath + 'v1.0/NhanVien/GetAll').toPromise();
    }

    async put(record: NhanVien) {
        return this.http.put<number>(Declare.serverApiPath + 'v1.0/NhanVien/Put', record).toPromise();
    }

    async post(record: NhanVien) {
        return this.http.post<number>(Declare.serverApiPath + 'v1.0/NhanVien/Post', record).toPromise();
    }

    async deleteOne(record: NhanVien) {
        return this.http.request('delete', Declare.serverApiPath + 'v1.0/NhanVien/Delete', { body: record }).toPromise();
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/showcase/data/products-orders-small.json')
            .toPromise()
            .then(res => <NhanVien[]>res.data)
            .then(data => { return data; });
    }

    generatePrduct(): NhanVien {
        const nhanvien: NhanVien = {
            code: this.generateId(),
            ten: this.generateName(),
            suDung: 1,
            kinhNghiemLamViec: this.generateRating()
        };

        nhanvien.hinhAnh = nhanvien.ten.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
        return nhanvien;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299) + 1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75) + 1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5) + 1);
    }
}
