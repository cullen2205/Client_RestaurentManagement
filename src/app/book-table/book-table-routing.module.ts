import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { BookTableComponent } from './book-table.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: BookTableComponent},
		])
	],
	exports: [
		BookTableRoutingModule
	]
})
export class BookTableRoutingModule {}
