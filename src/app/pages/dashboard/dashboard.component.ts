import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Declare } from 'src/app/declare';
import { AppConfig } from 'src/app/showcase/domain/appconfig';
import { AppConfigService } from 'src/app/showcase/service/appconfigservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[
    HttpClient,
    MessageService,
  ]
})
export class DashboardComponent implements OnInit {
  config: AppConfig;
  subscription: Subscription;

  constructor(
    private configService: AppConfigService,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,) { }

  ngOnInit() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async Logout(){
    await this.http.get(Declare.realtimeServer + 'Auth/Logout').toPromise().then((data: any) => {
      if(data.status == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Đăng xuất thành công' + data.data, life: 3000 });
        this.router.navigate(['/']);
      }
    })
  }
}
