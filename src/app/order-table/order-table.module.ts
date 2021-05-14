import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OrderTableComponent } from './order-table.component';
import { OrderTableRoutes } from './order-table.routing';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    OrderTableRoutes,
    CommonModule,
    ToastModule,
    FormsModule,
  ],
  declarations: [OrderTableComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrderTableModule { }
