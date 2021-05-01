import {NgModule} from '@angular/core';
import {AccountForgotPassword} from './account-forgot-password.component';
import { ToastModule } from 'primeng/toast';
import { AccountForgotPasswordRoutingModule } from './account-forgot-password-routing.module';

@NgModule({
	imports: [
		AccountForgotPasswordRoutingModule,
		ToastModule,
	],
	declarations: [
		AccountForgotPassword
	]
})
export class AccountForgotPasswordModule {}
