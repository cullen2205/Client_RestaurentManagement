import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { AppMenuModule } from 'src/app/showcase/app-menu/app-menu.module';
import { AppConfigModule } from 'src/app/showcase/app-config/app-config.module';
import { AppTopbarModule } from 'src/app/showcase/app-topbar/app-topbar.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppMenuModule,
    AppConfigModule,
    AppTopbarModule,
    ToastModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
