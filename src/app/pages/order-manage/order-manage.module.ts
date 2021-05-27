import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManageComponent } from './order-manage.component';
import { PickListModule } from 'src/app/components/picklist/picklist';
import { TabViewModule } from 'src/app/components/tabview/tabview';
import { AppCodeModule } from 'src/app/showcase/app.code.component';
import { AppDemoActionsModule } from 'src/app/showcase/app.demoactions.component';
import { OrderManageRoutes } from './order-manage.routing';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    OrderManageRoutes,
    PickListModule,
    TabViewModule,
    AppCodeModule,
    AppDemoActionsModule,
    ToastModule,
  ],
  declarations: [OrderManageComponent]
})
export class OrderManageModule { }
