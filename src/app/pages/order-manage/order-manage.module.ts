import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { AppMenuModule } from 'src/app/showcase/app-menu/app-menu.module';
import { AppConfigModule } from 'src/app/showcase/app-config/app-config.module';
import { AppFooterModule } from 'src/app/showcase/app-footer/app-footer.module';
import { AppTopbarModule } from 'src/app/showcase/app-topbar/app-topbar.module';


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
    
    AppMenuModule,
    AppConfigModule,
    AppFooterModule,
    AppTopbarModule,
  ],
  declarations: [
    OrderManageComponent,
    SelectFood,
  ],
  exports:[
    OrderManageComponent,
    SelectFood,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class OrderManageModule { }
