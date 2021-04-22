import { Component, OnInit } from "@angular/core";
import { MessageService, MenuItem } from "primeng/api";

@Component({
    providers: [MessageService],
    templateUrl: "./home-page.component.html",
    styleUrls: [
        "./home-page.component.scss", 
        "./home-page.component.css", 
        "../../assets/kassets/css/googleapis.css",
        "../../assets/kassets/css/bootstrap.css",
        "../../assets/kassets/css/style.css",
        "../../assets/kassets/css/fwslider.css",],
})
export class HomePageComponent implements OnInit {
    constructor(private messageService: MessageService) {}

    ngOnInit() {
        let dropdown: any = document.getElementById(".dropdown img.flag");
        dropdown.addClass("flagvisibility");

        dropdown = document.getElementById(".dropdown dt a").click = () => {
            let xx: any = document.getElementById(".dropdown dd ul");
            xx.toggle();
        };

        // dropdown = document.getElementById(".dropdown dd ul li a").click = () => {
        //     var text = document.getElementById(this).html();
        //     dropdown = document.getElementById(".dropdown dt a span").html(text);
        //     dropdown = document.getElementById(".dropdown dd ul").hide();
        //     dropdown = document.getElementById("#result").html("Selected value is: " + getSelectedValue("sample"));
        // });

        // function getSelectedValue(id) {
        //     return dropdown = document.getElementById("#" + id).find("dt a span.value").html();
        // }

        // dropdown = document.getElementById(document).bind('click', function (e) {
        //     var dropdown = document.getElementByIdclicked = dropdown = document.getElementById(e.target);
        //     if (!dropdown = document.getElementByIdclicked.parents().hasClass("dropdown"))
        //         dropdown = document.getElementById(".dropdown dd ul").hide();
        // });


        // dropdown = document.getElementById("#flagSwitcher").click(function () {
        //     dropdown = document.getElementById(".dropdown img.flag").toggleClass("flagvisibility");
        // });
    }

    ngOnDestroy() {
    }
}
