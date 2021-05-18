import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { VersionService } from './service/versionservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-topbar",
    template: `
    <header id="header" class="head-sticky">
        <div class="container">
            <div class="row menu-des">
                <div class="col-12 col-md-1">
                    <div class="box-left-menu">
                        <div class="logo-cam">
                            
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-11">
                    <div class="box-right-menu">
                        <ul class="main-menu" id="myMenu">
                            <li>
                                <a class="menu-link" routerLink="/" tppabs="https://lauphan.com/">Trang chủ</a>
                            </li>
                            <li>
                                <a class="menu-link" href="uu-dai.htm" tppabs="https://lauphan.com/uu-dai">Ưu đãi</a>
                            </li>
                            <li>
                                <a class="menu-link" href="thuc-don.htm" tppabs="https://lauphan.com/thuc-don">Thực đơn</a>
                            </li>
                            <li>
                                <a class="menu-link" routerLink="/order"
                                    tppabs="http://phanexpress.com/dat-ban?type=lauphan">Đặt bàn</a>
                            </li>
                            <li>
                                <a class="menu-link" href="javascript:if(confirm(%27http://phanexpress.com/dia-chi?type=lauphan  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27http://phanexpress.com/dia-chi?type=lauphan%27"
                                    tppabs="http://phanexpress.com/dia-chi?type=lauphan">Địa chỉ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="menu-mobile">
                <div class="showmenu">
                    <div class="logo-mobile">
                        
                    </div>
                    <div class="show-nav"><span style="font-size:30px;cursor:pointer;color: white;" onclick="openNav()">&#9776;</span></div>
                </div>
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:;" class="closebtn" onclick="closeNav()">&times;</a>
                    <div class="sidenav-mobile-menu">
                        <div class="box-btn" style="display: none"><a class="btn-dangnhap fancybox" href="#loginOTP">Đăng nhập <img style="margin-left: 10px;margin-top: 1px;" src="user.svg" tppabs="https://lauphan.com/WebLauPhan/theme/user.svg"></a></div>
                        <hr>
                        <div class="submenu-link"><a routerLink="/" tppabs="https://lauphan.com/">Trang chủ</a></div>
                        <hr>
                        <div class="submenu-link"><a href="uu-dai.htm" tppabs="https://lauphan.com/uu-dai">Ưu đãi</a></div>
                        <hr>
                        <div class="submenu-link"><a href="thuc-don.htm" tppabs="https://lauphan.com/thuc-don">Thực đơn</a></div>
                        <hr>
                        <div class="submenu-link"><a routerLink="/order"
                                tppabs="http://phanexpress.com/dat-ban?type=lauphan" target="_blank">Đặt bàn</a></div>
                        <hr>
                        <div class="submenu-link"><a href="javascript:if(confirm(%27http://phanexpress.com/dia-chi?type=lauphan  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27http://phanexpress.com/dia-chi?type=lauphan%27"
                                tppabs="http://phanexpress.com/dia-chi?type=lauphan" target="_blank">Địa chỉ</a></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `,
    styleUrls: [
        '../../assets/kassets/css/googleapis.css',
        '../../assets/kassets/css/bootstrap.css',
        '../../assets/kassets/css/style.css',
        '../../assets/kassets/css/fwslider.css']
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    activeMenuIndex: number;

    config: AppConfig;

    subscription: Subscription;

    versions: any[];

    constructor(
        private router: Router,
        private versionService: VersionService,
        private configService: AppConfigService
    ) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => (this.config = config)
        );
        this.versionService
            .getVersions()
            .then((data) => (this.versions = data));

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeMenuIndex = null;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
