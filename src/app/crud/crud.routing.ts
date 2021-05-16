import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudNhanvienComponent } from './crud-nhanvien/crud-nhanvien.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path:'nhan-vien',component: CrudNhanvienComponent },
		])
	],
	exports: [
		RouterModule
	]
})
export class CrudRoutes {}
