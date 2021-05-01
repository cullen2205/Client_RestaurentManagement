import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { OrderTableComponent } from './order-table.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: OrderTableComponent},
		])
	],
	exports: [
		RouterModule
	]
})
export class OrderTableRoutes {}
