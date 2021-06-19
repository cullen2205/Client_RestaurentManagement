import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { AppMenuModule } from 'src/app/showcase/app-menu/app-menu.module';
import { AppConfigModule } from 'src/app/showcase/app-config/app-config.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppMenuModule,
    AppConfigModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
