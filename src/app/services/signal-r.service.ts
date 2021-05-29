import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { MessageService } from 'primeng/api';
import { Declare } from '../declare';
import { HoaDon } from '../models/hoadon';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  public constructor(private http: HttpClient, private messageService: MessageService) {
    this.hubConnection = new signalR.HubConnectionBuilder().withAutomaticReconnect()
      .withUrl(Declare.realtimeServer + 'order')
      .build();
    this.hubConnection.start().catch((err) => console.log(err.toString()));
  }

  public syncOrder() {
    let results: HoaDon[];
    this.hubConnection.on('sync', (data) => {
      console.log(data);
      results = data;
      return data;
    });
    return results;
  }

  public async postOrderSync(hoaDons: HoaDon[]) {
    return this.http.put(Declare.serverApiPath + 'v2.0/Order/PutSync', hoaDons).toPromise();
  }
}
