import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManageComponent } from './order-manage.component';
import { PickListModule } from 'src/app/components/picklist/picklist';
import { TabViewModule } from 'src/app/components/tabview/tabview';
import { AppCodeModule } from 'src/app/showcase/app.code.component';
import { AppDemoActionsModule } from 'src/app/showcase/app.demoactions.component';
import { OrderManageRoutes } from './order-manage.routing';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { SelectFood } from './select-food';


@NgModule({
  imports: [
    CommonModule,
    OrderManageRoutes,
    PickListModule,
    TabViewModule,
    AppCodeModule,
    AppDemoActionsModule,
    ToastModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
  ],
  declarations: [
    OrderManageComponent,
    SelectFood,
  ],
  exports:[
    OrderManageComponent,
    SelectFood,
  ]
})
export class OrderManageModule { }
