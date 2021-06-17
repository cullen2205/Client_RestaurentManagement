import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';
import { DomHandler } from 'primeng/dom';

@Component({
    selector: 'app-config',
    templateUrl: './app-config/app-config.component.html',
    styleUrls: [
        './app-config/app-config.component.scss',
    ],
    providers:[
        AppConfigService,
    ]
})
export class AppConfigComponent implements OnInit, OnDestroy {

    active: boolean;

    scale: number = 14;
    scales: number[] = [12,13,14,15,16];

    outsideClickListener: any;

    config: AppConfig;

    subscription: Subscription;

    constructor(private el: ElementRef, private router: Router, private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            if (this.config.theme === 'nano')
                this.scale = 12;
            else
                this.scale = 14;

            this.applyScale();
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.active = false
             }
        });

        if (this.config.theme === 'nano')
            this.scale = 12;
    }

    toggleConfigurator(event: Event) {
        this.active = !this.active;
        event.preventDefault();

        if (this.active)
            this.bindOutsideClickListener();
        else
            this.unbindOutsideClickListener();
    }

    hideConfigurator(event) {
        this.active = false;
        this.unbindOutsideClickListener();
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        let themeElement = document.getElementById('theme-link');
        themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.config.theme, theme));
        this.configService.updateConfig({...this.config, ...{theme, dark}});
        event.preventDefault();
    }

    onRippleChange() {
        this.configService.updateConfig(this.config);
        if (this.config.ripple)
            DomHandler.removeClass(document.body, 'p-ripple-disabled');
        else
            DomHandler.addClass(document.body, 'p-ripple-disabled');
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.active && this.isOutsideClicked(event)) {
                    this.active = false;
                }
            };
            document.addEventListener('click', this.outsideClickListener);
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
