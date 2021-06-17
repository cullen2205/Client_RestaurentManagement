import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppConfigComponent } from '../app.config.component';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppInputStyleSwitchModule } from '../app.inputstyleswitch.component';
import { AppConfigService } from '../service/appconfigservice';
import { IconService } from '../service/iconservice';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    RadioButtonModule,
    InputSwitchModule,
    AppInputStyleSwitchModule,
  ],
  declarations: [AppConfigComponent],
  exports:[AppConfigComponent],
  providers:[
    AppConfigService,
    IconService,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppConfigModule { }
