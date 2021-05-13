
function openNav() {
	$('#mySidenav').css('width', '80%');
	$(function () {
		var $win = $(window);
		var $box = $("#mySidenav");

		$win.on("mouseup", function (event) {
			if ($box.has(event.target).length == 0 && !$box.is(event.target)) {
				$('#mySidenav').css('width', '0');
			}
		});
	});
}

$("#tb-mob").click(function () {
	closeNav();
});

$("#dv-mob").click(function () {
	closeNav();
});

function closeNav() {
	$('#mySidenav').css('width', '0');
}

$(document).ready(function() {
	if (window.matchMedia("(min-width: 768px)").matches) {
		$('#dich-vu').click(function (){
			$('html, body').animate({
				scrollTop: $("#title-desk").offset().top
			}, 500)
		})
	} else {

	}
});