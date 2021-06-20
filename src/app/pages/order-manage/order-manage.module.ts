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
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';


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
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    CalendarModule,
    SliderModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ProgressBarModule,
    TooltipModule,
    RadioButtonModule,
    RatingModule,
    
    AppMenuModule,
    AppConfigModule,
    AppFooterModule,
    AppTopbarModule,
  ],
  declarations: [
    OrderManageComponent,
    SelectFood,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class OrderManageModule { }
