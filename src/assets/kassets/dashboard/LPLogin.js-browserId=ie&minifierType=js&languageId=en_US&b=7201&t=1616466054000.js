/*1620426908000*/

function checkLogin(){
	var customerOTP = $.cookie("customerOTP");
	console.log("customerOTP la"+customerOTP);
	if(customerOTP!=null){
		$(".btn-dangnhap").hide();
		$(".os_user-login").show();
		var customerName = $.cookie("customerName");
		var customerEmail = $.cookie("customerEmail");
		var customerGender = $.cookie("customerGender");
		var customerLocation = $.cookie("customerLocation");
		var customerPhone = $.cookie("customerPhone");
		var customerPCoin = $.cookie("customerPCoin");
		
		if(customerName!="undefined"){
			$("#os_name").html(customerName);
		}else{
			$("#os_name").html(customerPhone);
		}
		$("#p_coin").html(customerPCoin);
				
	}else{
		$(".btn-dangnhap").show();
		$(".os_user-login").hide();
	}
}

/*
{
    "success": true,
    "data": {
        "name": "",
        "email": "",
        "gender": "",
        "location": "",
        "phone": "0976559597",
        "totalPoint": "https://phanexpress.com/o/WebCAMFE/js/0.00"
    },
    "message": "Lấy thông tin khách hàng thành công!"
}
*/