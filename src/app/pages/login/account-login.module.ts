import {NgModule} from '@angular/core';
import {AccountLogin} from './account-login';
import {AccountLoginRoutingModule} from './account-login-routing.module';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		AccountLoginRoutingModule,
		ToastModule,
		CommonModule,
		FormsModule,
	],
	declarations: [
		AccountLogin
	]
})
export class AccountLoginModule {}
