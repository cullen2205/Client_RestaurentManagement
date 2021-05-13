import {Component} from '@angular/core';

@Component({
    selector: "app-footer",
    template: `
    <footer id="footer" class="bs-docs-footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="info-bot">
                        <div class="nameCtybot">Công ty Cổ phần CAM</div>
                        <div>Địa chỉ: Số 9 Đào Duy Anh, Phường Phương Mai, Quận Đống Đa, Thành phố Hà Nội</div>
                        <div>Mã số thuế: 0108796725</div>
                        <div>Người ĐDPL: Phan Thanh Tùng</div>
                        <div>Ngày hoạt động: 25/06/2019</div>
                        <div>Giấy phép kinh doanh: 0108796725</div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="box-footer-r">
                        <div>
                            <a href="javascript:if(confirm(%27https://www.facebook.com/Lauphanbuffet  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27https://www.facebook.com/Lauphanbuffet%27"
                                tppabs="https://www.facebook.com/Lauphanbuffet" target="_blank"><img src="../../assets/kassets/dashboard/icon-fb.svg" tppabs="https://lauphan.com/WebLauPhan/theme/icon-fb.svg"></a>
                        </div>
                        <div>
                            <a href="javascript:if(confirm(%27https://www.instagram.com/lau.phan/  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27https://www.instagram.com/lau.phan/%27"
                                tppabs="https://www.instagram.com/lau.phan/" target="_blank"><img src="../../assets/kassets/dashboard/icon-ins.svg" tppabs="https://lauphan.com/WebLauPhan/theme/icon-ins.svg"></a>
                        </div>
                        <div>
                            <a href="javascript:if(confirm(%27https://www.tiktok.com/@lau.phan  \n\nThis file was not retrieved by Teleport Ultra, because it is addressed on a domain or path outside the boundaries set for its Starting Address.  \n\nDo you want to open it from the server?%27))window.location=%27https://www.tiktok.com/@lau.phan%27"
                                tppabs="https://www.tiktok.com/@lau.phan" target="_blank"><img src="../../assets/kassets/dashboard/icon-tiktok.svg" tppabs="https://lauphan.com/WebLauPhan/theme/icon-tiktok.svg"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <div class=""></div>
            </div>
            <div class="col-12">
                <div id="loginOTP" style="display:none">
                    <div class="login">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="title-pu">Nhập Số Điện Thoại</div>
                                    <div class="OTPcode">Mã OTP đăng nhập sẽ được gửi tới bạn qua SMS</div>
                                    <div class="form-login-cam">
                                        <input type="text" class="form-control" id="sdt" placeholder="Số điện thoại">
                                    </div>
                                    <div class="send-otp">
                                        <button type="button" class="bnt-sendotp">Gửi OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  styleUrls: [
    '../../assets/kassets/css/googleapis.css',
    '../../assets/kassets/css/bootstrap.css',
    '../../assets/kassets/css/style.css',
    '../../assets/kassets/css/fwslider.css']
})
export class AppFooterComponent {
    currentYear: number = new Date().getFullYear();
}