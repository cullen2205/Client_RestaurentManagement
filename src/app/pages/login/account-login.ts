import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { Declare } from 'src/app/declare';

@Component({
    providers: [
        MessageService,
        HttpClient,
    ],
    templateUrl: './account-login.html',
    styleUrls: ['./account-login.scss'],
})
export class AccountLogin implements OnInit {
    username: string = "";
    password: string = "";

    constructor(
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient,) {
    }
    ngOnInit() {
    }

    async SignIn() {
        await this.http.post(Declare.realtimeServer + 'Auth/Login', { username: this.username, password: this.password })
            .toPromise()
            .then((res: any) => {
                if (res.status && res.status == 200) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Chào mừng ' + this.username, life: 3000 });
                    this.router.navigate(['/dashboard']);
                }
            })
            .catch((e: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message || e });
            });
    }

    SignUp() {
        console.log('sign up');
    }
}
