var app = angular.module("kuldipWeb", []);

app.controller('galleryController', function ($scope) {
	$scope.gallery = window.kuldipWeb.gallery;
	$scope.imgCaption = $scope.gallery[0].imgCaption;
	$scope.clickHandler = function ($event, $index) {
		$event.preventDefault();
		if (!$($event.target).hasClass('active')) {
			$($event.target).addClass('active').parents('li').siblings().find('img').removeClass('active');
			var images = $('.gallery').find('.wallpaper img');
			$(images).not('.active').attr('src', $($event.target).attr('src'));
			$.each(images, function (index, val) {
				if ($(val).hasClass('active'))
					$(val).removeClass('active');
				else
					$(val).addClass('active');
			})
			$scope.imgCaption = $scope.gallery[$index].imgCaption;
		}
	}
});

var kuldipGallery = (function (window, undefined) {
	var $el = $('.gallery'),
		galleryJSON = window.kuldipWeb.gallery,
		wallpaper = $el.find('.container > .wallpaper'),
		mainGallery = $el.find('.container > .mainGallery'),
		thumbnailNos = 5;
		thumbnailWidth = 83,
		gutterSpace = 1,
		leftClickTime = 0,
		rightClickTime = 0,
		showWidth = (thumbnailNos * thumbnailWidth) + (thumbnailNos * gutterSpace);
		fullWidth = (galleryJSON.length * thumbnailWidth) + (galleryJSON.length * gutterSpace);

	var _showHideMenu = function () {
		$('.menu-list').on('click', function (event) {
			event.preventDefault();
			if ($(this).hasClass('icon-circle-with-minus')) {
				$(this).removeClass('icon-circle-with-minus').addClass('icon-circle-with-plus');
				$(mainGallery).addClass('hide');
			} else {
				$(this).removeClass('icon-circle-with-plus').addClass('icon-circle-with-minus');
				$(mainGallery).removeClass('hide');
			}
		});
	}
	var _handleClick = function (that) {
		var totalWidth = parseInt($(mainGallery).find('.galleryContainer ul').css('width').split('px')[0]),
			actualWidth = parseInt($(mainGallery).find('.galleryContainer').css('width').split('px')[0]),
			currentleft = parseInt($(mainGallery).find('.galleryContainer ul').css('left').split('px')[0]),
			left = parseInt($(mainGallery).find('.galleryContainer ul').attr('data-left')),
			totalLeft = parseInt(Math.ceil(totalWidth/actualWidth)) - 1;

		if ($(that).hasClass('gallery-next')) {
			if (left < totalLeft) {
				left = left + 1;
				currentleft = currentleft - showWidth;
				$(mainGallery).find('.galleryContainer ul').css('left', currentleft).attr('data-left', left);
			}
		}
		if ($(that).hasClass('gallery-prev')) {
			if (left > 0) {
				left = left - 1;
				currentleft = currentleft + showWidth;
				$(mainGallery).find('.galleryContainer ul').css('left', currentleft).attr('data-left', left);
			}
		}
	}
	var _initialize = function () {
		$(wallpaper).find('.wallpaper1').attr('src', galleryJSON[0].imgLink);
		$(mainGallery).find('.galleryContainer').width(showWidth);
		$(mainGallery).find('.galleryContainer ul').css({
			"width": fullWidth,
			"left": 0
		}).attr('data-left', 0);
		$(mainGallery).find('.gallery-prev').on('click', function (event) {
			event.preventDefault();
            var timeNow = new Date().getTime();
            if (timeNow - leftClickTime > 1000) {
				_handleClick(this);
				leftClickTime = timeNow;
            }
		});
		$(mainGallery).find('.gallery-next').on('click', function (event) {
			event.preventDefault();
            var timeNow = new Date().getTime();
			if (timeNow - rightClickTime > 1000) {
				_handleClick(this);
				rightClickTime = timeNow;
            }
		});
		_showHideMenu();
	}
	var _init = function () {
		$(document).ready(function () {
			_initialize();
		})
	}
	return {
		init: _init
	}
})(window).init();