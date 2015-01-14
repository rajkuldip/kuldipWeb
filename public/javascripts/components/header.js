var homeBannerHeight = (function (window, undefined) {
	function _showMenu (argument) {
		$('.menuIcon').on('click', '.fa-navicon', function (event) {
			event.preventDefault();
			$('.menuList').addClass('show');
		});
		$('.closeBtn').on('click', 'a', function (event) {
			event.preventDefault();
			$('.menuList').removeClass('show');
		})
	}
	function _initializeHeight (argument) {
		var winHeight = $(window).height(),
			winWidth = $(window).width();
		if (winWidth < 768) {
			$('body .home').css({
				'height': winHeight + 50
			});
			$('.parallax-window').css({
				'height': winHeight
			});
		} else {
			$('body .home').removeAttr('style');
			$('.parallax-window').removeAttr('style');
		}
	}
	function _init (argument) {
		$(document).ready(function (argument) {
			_initializeHeight();
			_showMenu();
			$(window).on('resize', _initializeHeight);
		});
	}
	return {
		init : _init
	}
})(window).init();