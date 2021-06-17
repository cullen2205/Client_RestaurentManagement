import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';

import { CarService } from './service/carservice';
import { CountryService } from './service/countryservice';
import { EventService } from './service/eventservice';
import { NodeService } from './service/nodeservice';

import { IconService } from './service/iconservice';
import { CustomerService } from './service/customerservice';
import { PhotoService } from './service/photoservice';
import { VersionService } from './service/versionservice';
import { AppConfigService } from './service/appconfigservice';
import { ProductService } from './service/productservice';

import { AppNewsComponent } from './app.news.component';
import { AppInputStyleSwitchModule } from './app.inputstyleswitch.component';
import { AppDemoActionsModule } from './app.demoactions.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppTopbarModule } from './app-topbar/app-topbar.module';
import { AppFooterModule } from './app-footer/app-footer.module';
import { AppMenuModule } from './app-menu/app-menu.module';
import { AppConfigModule } from './app-config/app-config.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AppNewsComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AutoCompleteModule,
        ButtonModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        AppInputStyleSwitchModule,
        AppDemoActionsModule,
        AppTopbarModule,
        AppFooterModule,
        AppMenuModule,
        AppConfigModule,
    ],
    providers: [
        { 
            provide: LocationStrategy, 
            useClass: HashLocationStrategy 
        },
        CarService,
        CountryService,
        EventService,
        NodeService,
        IconService,
        CustomerService,
        PhotoService,
        VersionService,
        AppConfigService,
        ProductService,
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})
export class AppModule { }
