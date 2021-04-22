import {NgModule} from '@angular/core';
import {AccountLogin} from './account-login';
import {AccountLoginRoutingModule} from './account-login-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
	imports: [
		AccountLoginRoutingModule,
		ToastModule,
	],
	declarations: [
		AccountLogin
	]
})
export class AccountLoginModule {}
