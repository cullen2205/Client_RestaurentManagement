import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
    providers: [MessageService],
    templateUrl: './account-login.html',
    styleUrls: ['./account-login.css','./account-login.scss']
})
export class AccountLogin implements OnInit {
    constructor(private messageService: MessageService) {
    }
    ngOnInit(): void {
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
}
