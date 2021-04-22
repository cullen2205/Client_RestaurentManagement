import { NgModule } from '@angular/core';
import { BookTableComponent } from './book-table.component';
import { DropdownModule } from '../components/dropdown/dropdown';
import { BookTableRoutingModule } from './book-table-routing.module';

@NgModule({
  imports: [
    BookTableRoutingModule,
    DropdownModule,
  ],
  declarations: [BookTableComponent]
})
export class BookTableComponentModule { }
