import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Declare } from '../declare';
import { map } from 'rxjs/operators';
import { InputNumberModule } from 'primeng/inputnumber';

interface Center {
  code?: string,
  ngayThem?: Date,
  ngayChinhSua?: Date,
  nguoiThem?: string,
  nguoiChinhSua?: string,
  suDung?: number,
  hinhAnh?: string,
  ten?: string,
  diaChi?: string,
  kieuChiNhanh?: number
}

interface Request {
  maChiNhanh: any;
  soNguoi?: number;
  ngayGio?: Date | number;
  tenNguoiDat: string;
  soDienThoai: string;
  ghiChu?: string;
}

@Component({
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  providers: [
    MessageService,
    InputNumberModule,
  ],
})

export class OrderTableComponent implements OnInit {
  selectedDay: number = 0;
  responsePage: any;
  requestForm: Request = {
    maChiNhanh: -1,
    ngayGio: -1,
    soNguoi: -1,
    tenNguoiDat: "",
    soDienThoai: "",
    ghiChu: ""
  };
  centers: Center[] = [];
  peopleRange: number[] = [];
  dateRande: number[] = [];
  timeRange: string[] = [];
  constructor(
    private elementRef: ElementRef
    , private messageService: MessageService
    , private http: HttpClient) {
  }

  getCenter() {
    var result = this.http.get(Declare.serverApiPath + 'v2.0/Order').toPromise().then(
      (data: any) => {
        this.responsePage = data;
        switch (data.status) {
          case 200:
            // get data from server
            this.centers = data.data.centers;
            for (let index = data.data.peopleRange[0]; index <= data.data.peopleRange[1]; index++) {
              this.peopleRange.push(index);
            }
            this.dateRande.push(data.data.dateTimeRange);
            this.timeRange = data.data.dateTimeRange.data.filter(x => x.dayId == this.selectedDay).map(m => m.time);

            // default value
            this.requestForm.soNguoi = this.peopleRange[0];
            //this.requestForm.ngayGio = this.timeRange[0];
            break;
          case 400:
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            break;
          default:
            break;
        }
      }
    ).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Đã có lỗi khi cố gắng kết nối tới server.\nNếu liên tục xảy ra, xin hãy liên hệ tới bộ phận quản lý.' });
    });
  }

  dayChange(newValue) {
    try {
      this.selectedDay = newValue;
      this.timeRange = this.responsePage.data.dateTimeRange.data.filter(x => x.dayId == this.selectedDay).map(m => m.time);
    }
    catch { }
  }

  validate(){
    if(this.requestForm.maChiNhanh === -1){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hãy chọn chi nhánh.' });
      return false;
    }
    if(this.requestForm.ngayGio === -1){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hãy chọn giờ ăn.' });
      return false;
    }
    if(this.requestForm.soDienThoai.length < 8){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Số điện thoại sai định dạng.' });
      return false;
    }
    return true;
  }

  submit() {
    if(!this.validate())
      return;
    
    var path = Declare.realtimeServer + "api/v2.0/Order/PostOrder";
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.requestForm);
    
    this.http.post(path, this.requestForm, { 'headers':headers }).toPromise().then(
      (data: any) => {
        this.responsePage = data;
        switch (data.status) {
          case 200:
            switch (data.data) {
              case 0:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cửa hàng sẽ sớm liên lạc với bạn nhanh nhất có thể.' });
                return;
              case 1:
                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
                return;
              case -1:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cửa hàng sẽ sớm liên lạc với bạn nhanh nhất có thể.' });
                return;
              case -2:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không được phép để trống thông tin. Xin hãy kiểm tra lại.' });
                return;
              case -3:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không tồn tại thời gian đặt bàn.' });
                return;
              case -4:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sai định dạng tên. Xin hãy kiểm tra lại thông tin.' });
                return;
              case -5:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không tồn tại chi nhánh.' });
                return;
              case -6:
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Số điện thoại sai định dạng.' });
                return;
              default:
                break;
            }
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lỗi không xác định trong quá trình đặt bàn, xin hãy thử lại sau.\nChúng tôi rất tiếc vì sự cố này.' });
            break;
          case 400:
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            break;
          default:
            break;
        }
      }
    ).catch((e) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lỗi nhập liệu hoặc sự cố kết nối tới máy chủ.\nNếu sự cố liên tục xảy ra, xin hãy liên hệ tới bộ phận hỗ trợ.' });
    });
  }

  ngOnInit() {
    this.getCenter();
  }

  settingScripts() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.text = `
        $("#newUserInfo-Birthday").mask("99/99/9999");
        $.validator.addMethod(
        "DOBFormatValidate",
        function(value, element) {
          return value.match(
          /(?:(?:(0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])|(?:29|30)\/(?:0[13-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/[1-9]\d{3}|29\/02(?:\/[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00))/
          );
        },
        "Ngày sinh không hợp lệ"
        );

        $.validator.addMethod(
        "DOB100Year",
        function(value, element) {
          var thisYear = new Date().getFullYear();
          var year = value.substring(value.lastIndexOf("/") + 1);
          if (thisYear - year > 100) {
            return false;
          } else {
            return true;
          }
        },
        "Năm sinh không hợp lệ"
        );
        $.validator.addMethod(
        "DOBValidate",
        function(value, element) {
          var isValid = value.match(
          /(?:(?:(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])|(?:29|30)\/(?:0[13-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/[1-9]\d{3}|29\/02(?:\/[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00))/
          );
          var today = new Date();
          var DOB = Date.parse(value);
          if (DOB >= today) {
            isValid = false;
          }
          return isValid;
        },
        "Ngày sinh phải nhỏ hơn ngày hiện tại"
        );
        $.validator.addMethod(
        "phoneValidate",
        function(value, element) {
          return this.optional(element) || /^(\+91-|\+91|0)?\d{9}$/.test(value);
        },
        "Số điện thoại không đúng định dạng"
        );
        $("#send-otp").click(function() {
          $("#send-otp-form").submit();
        });
        $("#login-otp").click(function() {
          $("#login-otp-form").submit();
        });
        $("#newUserInfo-submit").click(function() {
          $("#newUserInfo-form").submit();
        });

        $(".check-id").click(function() {
          var formData = "_LPLogin_INSTANCE_#portlet_userPhone=0987654321";
          $.ajax({
            url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=checkNewUser",
            type: "POST",
            data: formData,
            success: function(result) {
              console.log("result la " + result);
              if (result == "true") {
                $.fancybox.open({
                  src: "#newUserInfo",
                  clickSlide: false,
                  clickOutside: false,
                  smallBtn: false,
                });
              } else {
                alert("ngon");
              }
            },
          });
        });

        $(document).ready(function() {
          $("#newUserInfo").fancybox({
            clickSlide: false,
            touch: false,
          });

          //$.removeCookie("customerName");
          $(".user-logout").click(function() {
            $.ajax({
              url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=userLogOut",
              type: "POST",
              success: function(result) {
                if (result == 1) {
                  location.reload();
                }
              },
            });
          });
          $("#send-otp-form").validate({
            rules: {
              userPhone: {
                required: true,
                rangelength: [10, 10],
                phoneValidate: true,
              },
            },
            messages: {
              userPhone: {
                required: "Bạn cần nhập Số điện thoại",
                rangelength: "Số điện thoại phải có 10 chữ số",
              },
            },
            errorPlacement: function(error, element) {
              error.insertAfter(element);
            },
            submitHandler: function(form) {
              $("#login-loading").show();
              $("#send-otp").hide();
              var userPhone = $("#sdt").val();
              var formData = "_LPLogin_INSTANCE_#portlet_userPhone=" + userPhone;

              $.ajax({
                url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=sendOTP",
                type: "POST",
                data: formData,
                success: function(result) {
                  var jsonResult = JSON.parse(result);
                  var otpResult = jsonResult.success;
                  if (String(otpResult) == "false") {
                    $(".login-error-message").show();
                    $(".login-error-message").html(jsonResult.message);
                    $("#login-loading").hide();
                    $("#send-otp").show();
                  } else {
                    $.fancybox.close({
                      src: "#loginOTP",
                    });
                    $("#login-loading").hide();
                    $("#send-otp").show();
                    $.fancybox.open({
                      src: "#submitOTP",
                    });
                  }
                },
              });
            },
          });
          $("#newUserInfo-form").validate({
            rules: {
              newUserInfoUsername: {
                required: true,
                minlength: 2,
                maxlength: 128,
              },
              newUserInfoBirthday: {
                required: true,
                DOBFormatValidate: true,
                DOBValidate: true,
                DOB100Year: true,
              },
              newUserInfoGender: {
                required: true,
              },
              newUserInfoDistrict: {
                required: true,
              },
            },
            onkeyup: false,
            messages: {
              newUserInfoUsername: {
                required: "Bạn cần nhập Họ tên",
                minlength: "Họ tên không được nhỏ hơn 2 ký tự",
                maxlength: "Họ tên không được lớn hơn 128 ký tự",
              },
              newUserInfoGender: {
                required: "Bạn cần chọn Giới tính",
              },
              newUserInfoDistrict: {
                required: "Bạn cần chọn Quận",
              },
            },
            errorPlacement: function(error, element) {
              error.insertAfter(element);
            },
            submitHandler: function(form) {
              $("#newUserInfo-submit").hide();
              $("#newUserInfo-loading").show();
              var Username = $("#newUserInfo-Username").val();
              var Birthday = $("#newUserInfo-Birthday").val();
              var Gender = $("#newUserInfo-Gender").val();
              var District = $("#newUserInfo-District").val();
              var customerOtp = $("#temp-customerOtp").val();

              var formData =
              "_LPLogin_INSTANCE_#portlet_Username=" +
              Username +
              "&_LPLogin_INSTANCE_#portlet_Birthday=" +
              Birthday +
              "&_LPLogin_INSTANCE_#portlet_Gender=" +
              Gender +
              "&_LPLogin_INSTANCE_#portlet_District=" +
              District +
              "&_LPLogin_INSTANCE_#portlet_customerOtp=" +
              customerOtp;
              $("#newUserInfo-loading").show();
              $.ajax({
                url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=newUserAddInfo",
                type: "POST",
                data: formData,
                success: function(result) {
                  if (result == "true") {
                    $.cookie("customerOTP", customerOtp, {
                      expires: 1,
                      path: "/"
                    });
                    location.reload();
                  } else {
                    console.log("error");
                    location.reload();
                  }
                },
              });
            },
          });

          $("#login-otp-form").validate({
            rules: {
              phoneOTP: {
                required: true,
              },
            },
            messages: {
              phoneOTP: {
                required: "Bạn cần nhập Mã OTP",
              },
            },
            errorPlacement: function(error, element) {
              error.insertAfter(element);
            },
            submitHandler: function(form) {
              $("#login-otp-loading").show();
              $("#login-otp").hide();
              var loginPhone = $("#sdt").val();
              var loginOTP = $("#otp").val();
              var formData = "_LPLogin_INSTANCE_#portlet_loginPhone=" + loginPhone + "&_LPLogin_INSTANCE_#portlet_loginOTP=" + loginOTP;
              $.ajax({
                url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=submitOTP",
                type: "POST",
                data: formData,
                success: function(result) {
                  var jsonResult = JSON.parse(result);
                  var otpResult = jsonResult.success;
                  var userToken = jsonResult.token;
                  $("#temp-customerOtp").val(userToken);
                  if (String(otpResult) == "false") {
                    $(".otp-error-message").show();
                    $(".otp-error-message").html("Mã OTP sai, vui lòng nhập lại!");
                    $("#login-otp-loading").hide();
                    $("#login-otp").show();
                  } else {
                    var formData = "_LPLogin_INSTANCE_#portlet_userPhone=" + loginPhone;
                    $.ajax({
                      url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=checkNewUser",
                      type: "POST",
                      data: formData,
                      success: function(result) {
                        console.log("result la " + result);
                        if (result == "true") {
                          $.fancybox.open({
                            src: "#newUserInfo",
                            clickSlide: false,
                            clickOutside: false,
                            smallBtn: false,
                          });
                        } else {
                          $.cookie("customerOTP", userToken, {
                            expires: 1,
                            path: "/"
                          });
                          //getCutomerInfo(jsonResult.token);
                          location.reload();
                        }
                      },
                    });
                  }
                },
              });
            },
          });

          function getCutomerInfo(customerOTP) {
            var formData = "_LPLogin_INSTANCE_#portlet_customerOTP=" + customerOTP;
            $.ajax({
              url: "https://phanexpress.com/dat-ban?p_p_id=LPLogin_INSTANCE_%23portlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPLogin_INSTANCE_%23portlet_javax.portlet.action=getCustomerInfo",
              type: "POST",
              data: formData,
              success: function(result) {
                var jsonResult = JSON.parse(result);
                var userData = jsonResult.data;

                var userProfile = userData.profile;
                var customerName = userProfile.name;
                var customerPhone = userProfile.phone;
                var customerEmail = userProfile.email;
                var customerDOB = userProfile.birthday;
                var customerGender = userProfile.gender;
                var customerLocation = userProfile.location;
                var customerPCoin = userData.voucher;
                var customerDistrict = userData.idQuan;

                $.cookie("customerName", customerName, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerPhone", customerPhone, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerEmail", customerEmail, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerDOB", customerDOB, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerGender", customerGender, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerLocation", customerLocation, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerPCoin", customerPCoin, {
                  expires: 1,
                  path: "/"
                });
                $.cookie("customerDistrict", customerDistrict, {
                  expires: 1,
                  path: "/"
                });
                location.reload();
              },
            });
          }
          $("#hide").click(function() {
            $("#hide").hide();
            $("#show").show();
            $("#mainLogin").show();
          });
          $("#show").click(function() {
            $("#show").hide();
            $("#hide").show();
            $("#mainLogin").hide();
          });
        });

        $(".btn-close").click(function() {
          window.location.reload();
        });
        $(".fancybox-container").click(function() {
          window.location.reload();
        });
        $(document).ready(function() {
          $("a.fancybox").fancybox();

          $("#btn1").click(function() {
            $(".btn-lau-1").addClass("add-gbcolor1");
            $(".btn-lau-2").addClass("rm-gbcolor");
            $(".btn-lau-2").removeClass("add-gbcolor2");
          });

          $("#btn2").click(function() {
            $(".btn-lau-2").addClass("add-gbcolor2");
            $(".btn-lau-1").removeClass("add-gbcolor1");
            $(".btn-lau-2").removeClass("rm-gbcolor");
          });
        });

        $(document).ready(function() {
          function orderInfoChange(cosoId) {
            if (cosoId == "-1") {
              $("#selectHour").html("<option value='0'>Chọn</option>");
              $("#address").html("");
              $("#location-icon-href").attr("href", "/dia-chi");
              $("#ahref").attr("href", "/dia-chi");
            } else {
              $("#selectHour").css("opacity", "0.5");
              $("#loading-time").show();
              var formData = "_LPOrder_INSTANCE_ZNe1lxOW8SmF_cosoId=" + cosoId;
              $.ajax({
                url: "https://phanexpress.com/dat-ban?p_p_id=LPOrder_INSTANCE_ZNe1lxOW8SmF&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPOrder_INSTANCE_ZNe1lxOW8SmF_javax.portlet.action=loadCosoInfo",
                type: "POST",
                data: formData,
                success: function(result) {
                  var jsonResult = JSON.parse(result);
                  var jsonCoso = JSON.parse(jsonResult.resultCS);
                  var jsonTimeOrder = JSON.parse(jsonResult.resultTimeOrder);

                  var address = jsonCoso.address;
                  var lat = jsonCoso.lat;
                  var log = jsonCoso.log;
                  $("#address").html(address);
                  var url = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + log;
                  $("#location-icon-href").attr("href", url);
                  $("#ahref").attr("href", url);
                  loadGioDatBan(jsonTimeOrder);
                  $("#selectHour").css("opacity", "1");
                  $("#loading-time").hide();
                },
              });
            }
          }
          $("#selectCoso").on("change", function() {
            orderInfoChange(this.value);
          });

          function loadGioDatBan(json) {
            var ngaydat = $("#selectDay option:selected").val();
            var giodat = $("#selectHour option:selected").val();
            var listTime = json.listTime;
            var timeOrder = getTimeOrderByDate(ngaydat, listTime);
            var htmlBody = "<option value='0'>Chọn</option>";
            var halfHourForward = new Date(Date.now() + 1000 * 60 * 30);
            var halfHourForwardHour = halfHourForward.getHours();
            var halfHourForwardMinutes = halfHourForward.getMinutes();
            if (halfHourForwardHour < 10) {
              halfHourForwardHour = "0" + halfHourForwardHour;
            }
            if (halfHourForwardMinutes < 10) {
              halfHourForwardMinutes = "0" + halfHourForwardMinutes;
            }

            var currentTime = halfHourForwardHour + ":" + halfHourForwardMinutes;
            for (var i = 0; i < timeOrder.length; i++) {
              var time = timeOrder[i];
              var timeValue = time + ":00";
              if (ngaydat == 0 && currentTime > time) {
                htmlBody += "<option value='" + timeValue + "' disabled='disabled' class='text-danger'>" + time + " Hết bàn</option>";
              } else {
                htmlBody += "<option value='" + timeValue + "'>" + time + "</option>";
              }
            }
            $("#selectHour").html(htmlBody);
          }

          $("#selectDay").on("change", function() {
            orderInfoChange($("#selectCoso").val());
          });

          $("#btn-datban").click(function() {
            var errors = validateForm();

            if (errors == "") {
              $("#btn-datban-loading").show();

              var cosoId = $("#selectCoso option:selected").val();
              var selectSoNguoi = $("#selectSoNguoi option:selected").val();
              var ngaydat = $("#selectDay option:selected").val();
              var giodat = $("#selectHour option:selected").val();
              var nameOrder = $("#nameOrder").val();
              var sdtOrder = $("#sdtOrder").val();
              var ghichu = $("#ghichu").val();

              $("#btn-datban").hide();
              var customerOTP = $("#customerOTP").val();
              var formData =
              "_LPOrder_INSTANCE_ZNe1lxOW8SmF_customerOTP=" +
              customerOTP +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_cosoId=" +
              cosoId +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_selectSoNguoi=" +
              selectSoNguoi +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_ngaydat=" +
              ngaydat +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_giodat=" +
              giodat +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_nameOrder=" +
              nameOrder +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_sdtOrder=" +
              sdtOrder +
              "&_LPOrder_INSTANCE_ZNe1lxOW8SmF_ghichu=" +
              ghichu;

              $.ajax({
                url: "https://phanexpress.com/dat-ban?p_p_id=LPOrder_INSTANCE_ZNe1lxOW8SmF&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_LPOrder_INSTANCE_ZNe1lxOW8SmF_javax.portlet.action=createOrder",
                type: "POST",
                data: formData,
                success: function(result) {
                  var r = Number(result);
                  if (r > 5) {
                    $.fancybox.open({
                      src: "#orderSuccess",
                    });
                    $("#btn-datban").show();
                    $("#btn-datban-loading").hide();
                  } else {
                    $.fancybox.open({
                      src: "#orderOverload",
                    });
                  }
                },
              });
            }
          });
        });

        function validateForm() {
          var errors = "";
          errors = checkLocation(errors);
          errors = checkGioAn(errors);
          errors = checkTen(errors);
          errors = checkPhone(errors);
          errors = checkPhone(errors);
          return errors;
        }

        function checkLocation(errors) {
          var locationId = $("#selectCoso option:selected").val();

          if (locationId == "-1") {
            $("#messageLocation").text("Vui lòng chọn cơ sở!");
            errors += "9";
            return errors;
          }
          $("#messageLocation").text("");
          return errors;
        }

        function checkGioAn(errors) {
          var giodat = $("#selectHour option:selected").val();

          if (giodat == "0") {
            $("#messageGioDat").text("Vui lòng chọn giờ ăn!");
            errors += "5";
            return errors;
          }

          $("#messageGioDat").text("");
          return errors;
        }

        function checkTen(errors) {
          var nameOrder = $("#nameOrder").val();

          if (nameOrder == "" || nameOrder == null) {
            $("#messageNameOrder").text("Vui lòng nhập Tên quý khách!");
            errors += "6";
            return errors;
          }

          $("#messageNameOrder").text("");
          return errors;
        }

        function checkPhone(errors) {
          var phone = $("#sdtOrder").val();

          if (phone == "" || phone == null) {
            $("#messageSDT").text("Vui lòng nhập số điện thoại!");
            errors += "7";
            return errors;
          }
          if (phone.length != 10) {
            $("#messageSDT").text("Số điện thoại phải có 10 chữ số!");
            errors += "8";
            return errors;
          }
          $("#messageSDT").text("");
          return errors;
        }

        function getTimeOrderByDate(dateSelect, listTime) {
          var date = new Date();
          date.setDate(date.getDate() + parseInt(dateSelect));
          var selectedDate = date.getDay();

          if (selectedDate == 0) {
            listTime = listTime.su_time;
          } else if (selectedDate == 1) {
            listTime = listTime.mo_time;
          } else if (selectedDate == 2) {
            listTime = listTime.tu_time;
          } else if (selectedDate == 3) {
            listTime = listTime.we_time;
          } else if (selectedDate == 4) {
            listTime = listTime.th_time;
          } else if (selectedDate == 5) {
            listTime = listTime.fr_time;
          } else if (selectedDate == 6) {
            listTime = listTime.sa_time;
          }
          return listTime;
        }

        function isNumberKey(evt) {
          var charCode = evt.which ? evt.which : evt.keyCode;
          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
          }
          return true;
        }`;
    this.elementRef.nativeElement.appendChild(s);
  }
}