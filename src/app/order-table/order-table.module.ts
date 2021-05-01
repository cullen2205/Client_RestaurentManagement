import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DropdownModule } from '../components/dropdown/dropdown';
import { OrderTableComponent } from './order-table.component';
import { OrderTableRoutes } from './order-table.routing';

@NgModule({
  imports: [
    OrderTableRoutes,
    DropdownModule,
  ],
  declarations: [OrderTableComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrderTableModule { }
