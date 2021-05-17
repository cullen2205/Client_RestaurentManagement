import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CrudNhanVienModule } from './crud-nhanvien/crud-nhanvien.module';

@NgModule({
  imports: [
    CrudNhanVienModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CrudModule { }
