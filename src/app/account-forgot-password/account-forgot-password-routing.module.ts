import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {AccountForgotPassword} from './account-forgot-password.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: AccountForgotPassword},
		])
	],
	exports: [
		RouterModule
	]
})
export class AccountForgotPasswordRoutingModule {}
