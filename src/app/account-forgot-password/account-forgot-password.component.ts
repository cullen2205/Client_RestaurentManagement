import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
    providers: [MessageService],
    templateUrl: './account-forgot-password.component.html',
    styleUrls: ['./account-forgot-password.component.scss']
})
export class AccountForgotPassword implements OnInit {
    constructor(private messageService: MessageService) {
    }
    ngOnInit(): void {
        var toggle = document.getElementById('toggle'),
        wrapper = document.querySelectorAll('.subscribe'),
        submit = document.getElementById('submit');
        var success: any = document.querySelectorAll('.subscribe__success');
        var content: any = document.querySelectorAll('.subscribe__wrapper');

        toggle.addEventListener('click', function() {
            this.className += ' subscribe__toggle__hidden';
            wrapper[0].className += ' subscribe-1__active';
        });

        submit.addEventListener('click', function() {
            success[0].className += ' subscribe__success--active';
            wrapper[0].className += ' subscribe-1__success';
            content[0].style.display = 'none';
        });
    }
}
