import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopBarComponent } from '../app.topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
  ],
  declarations: [
    AppTopBarComponent,
  ],
  exports:[
    AppTopBarComponent,
  ]
})
export class AppTopbarModule { }
