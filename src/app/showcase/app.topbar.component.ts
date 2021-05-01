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
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="header-left">
                            <div class="logo">
                                <a href="index.html"
                                    ><img
                                        src="../../../../assets/kassets/images/logo.png"
                                        alt=""
                                /></a>
                            </div>
                            <div class="menu">
                                <a class="toggleMenu" href="#"
                                    ><img
                                        src="../../../../assets/kassets/images/nav.png"
                                        alt=""
                                /></a>
                                <ul class="nav" id="nav">
                                    <li><a href="shop.html">Shop</a></li>
                                    <li><a href="team.html">Team</a></li>
                                    <li>
                                        <a href="experiance.html">Events</a>
                                    </li>
                                    <li>
                                        <a href="experiance.html">Experiance</a>
                                    </li>
                                    <li><a href="shop.html">Company</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                    <div class="clear"></div>
                                </ul>
                                <script
                                    type="text/javascript"
                                    src="../../../../assets/kassets/js/responsive-nav.js"
                                ></script>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="header_right">
                            <!-- start search-->
                            <div class="search-box">
                                <div id="sb-search" class="sb-search">
                                    <form>
                                        <input
                                            class="sb-search-input"
                                            placeholder="Enter your search term..."
                                            type="search"
                                            name="search"
                                            id="search"
                                        />
                                        <input
                                            class="sb-search-submit"
                                            type="submit"
                                            value=""
                                        />
                                        <span class="sb-icon-search"> </span>
                                    </form>
                                </div>
                            </div>
                            <!----search-scripts---->
                            <script src="../../../../assets/kassets/js/classie.js"></script>
                            <script src="../../../../assets/kassets/js/uisearch.js"></script>
                            <script>
                                new UISearch(
                                    document.getElementById("sb-search")
                                );
                            </script>
                            <!----//search-scripts---->
                            <ul class="icon1 sub-icon1 profile_img">
                                <li>
                                    <a class="active-icon c1" href="#"> </a>
                                </li>
                            </ul>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
