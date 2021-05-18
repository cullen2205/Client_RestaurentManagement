import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuComponent } from '../app.menu.component';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AutoCompleteModule,
  ],
  declarations: [AppMenuComponent],
  exports:[AppMenuComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppMenuModule { }
