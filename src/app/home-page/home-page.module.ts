import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home-page.component';
import { AppTopBarComponent } from '../showcase/app.topbar.component';

@NgModule({
	imports:[
		RouterModule.forChild([
			{path:'',component: HomePage},
		]),
	],
	exports: [
		RouterModule,
	],
})
export class HomePageModule {}
