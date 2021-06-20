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
    username: string = "anonymous";
    password: string = "admin";

    constructor(
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient,) {
    }
    ngOnInit() {
        let signUpButton = document.getElementById('signUp');
        let signInButton = document.getElementById('signIn');
        let container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    SignIn() {debugger
        this.http.post(Declare.realtimeServer + 'Auth/Login', { username: this.username, password: this.password })
            .toPromise()
            .then((res: any) => {debugger
                if (res && res.status == 200) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Chào mừng ' + this.username, life: 3000 });
                    this.router.navigate(['dashboard']);
                }
                else
                    this.messageService.add({ severity: 'error', summary: 'Wrong password', detail: 'Sai tên đăng nhập hoặc mật khẩu. Xin hãy thử lại.' });
            })
            .catch((e) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có sự cố khi kết nối tới máy chủ, nếu lỗi liên tục xảy ra, xin hãy liên lạc với bộ phận hỗ trợ.' });
            });
    }

    SignUp() {
        console.log('sign up');
    }
}
