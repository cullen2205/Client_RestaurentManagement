import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderManageComponent } from './order-manage.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: OrderManageComponent },
		])
	],
	exports: [
		RouterModule
	]
})

export class OrderManageRoutes {}