import { Component, OnInit } from "@angular/core";
import { MessageService, MenuItem } from "primeng/api";

declare let $: any;

@Component({
    providers: [MessageService],
    templateUrl: "./home-page.component.html",
    styleUrls: [
        "./home-page.component.scss",
        "../../assets/kassets/css/googleapis.css",
        "../../assets/kassets/css/bootstrap.css",
        "../../assets/kassets/css/style.css",
        "../../assets/kassets/css/fwslider.css",],
})
export class HomePage implements OnInit {
    constructor(private messageService: MessageService) {}
    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
