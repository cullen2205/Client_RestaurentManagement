import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { CrudGiamGiaComboComponent } from './crud-giam-gia-combo.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { AppCodeModule } from 'src/app/showcase/app.code.component';
import { AppDemoActionsModule } from 'src/app/showcase/app.demoactions.component';
import { ToastModule } from 'primeng/toast';
import { CrudRoutes } from '../crud.routing';
import { AppMenuModule } from 'src/app/showcase/app-menu/app-menu.module';
import { AppConfigModule } from 'src/app/showcase/app-config/app-config.module';
import { AppFooterModule } from 'src/app/showcase/app-footer/app-footer.module';
import { AppTopbarModule } from 'src/app/showcase/app-topbar/app-topbar.module';

@NgModule({
  imports: [
    CrudRoutes,
    CommonModule,
    FormsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ProgressBarModule,
    TooltipModule,
    RadioButtonModule,
    ToolbarModule,
    FileUploadModule,
    TabViewModule,
    RatingModule,
    AppCodeModule,
    AppDemoActionsModule,

    AppMenuModule,
    AppConfigModule,
    AppFooterModule,
    AppTopbarModule,
  ],
  declarations: [
    CrudGiamGiaComboComponent,
  ],
  exports:[
    CrudGiamGiaComboComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CrudGiamGiaComboModule { }