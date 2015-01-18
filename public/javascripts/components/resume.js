var app = angular.module("kuldipWeb", []);

app.controller('educationController', function ($scope) {
	var education = window.kuldipWeb.resumeEducation;
	$scope.fieldHeader = education.header;
	$scope.dataset = education.detail;
});

app.controller('experienceController', function ($scope) {
	var experience = window.kuldipWeb.resumeExperience;
	$scope.fieldHeader = experience.header;
	$scope.dataset = experience.detail;
});


app.controller('projectController', function ($scope) {
	var project = window.kuldipWeb.resumeProject;
	$scope.fieldHeader = project.header;
	$scope.dataset = project.detail;
});

var resumePage = (function () {
	var $el = $('.resume'),
		scrollPoints = [],
		mobileScrollPoints = [];

	function _handleMenuClick () {
		scrollPoints = [];
		var sections = $el.find('.main-data > .main-container').find('section');
		$.each(sections, function (index, value) {
			scrollPoints.push({
				'id':$(this).attr('id'),
				'offset':$(this).offset().left
			});
		})
		$el.find('.menu-container').find('.desktopMenu').on('click', 'a', function (event) {
			var $anchor = $(this);
			$el.find('.menu-container').find('a').removeClass('selected');
			$(this).addClass('selected');
			$.each(scrollPoints, function (index, value) {
				if ('#'+value.id === $anchor.attr('href')) {
					$el.find('.main-data').stop().animate({
			            scrollLeft: value.offset - ($(window).width()*0.2)
			        }, 700, 'easeInOutQuint');
				}
			});

	        event.preventDefault();
		})
	}
	function _mobileMenuClick () {
		$('.mobile-menu').on('click', '.fa-navicon', function (event) {
			event.preventDefault();
			$(this).addClass('hide');
			$(this).siblings('.fa-times-circle').removeClass('hide');
			$('.menu-container').addClass('show');
		});
		$el.find('.menu-container').find('li').on('click', 'a', function (event) {
			$('.menu-container').removeClass('show');
			$('.fa-navicon').removeClass('hide');
			$('.fa-times-circle').addClass('hide');
		});
		$('.mobile-menu').on('click', '.fa-times-circle', function (event) {
			event.preventDefault();
			$(this).addClass('hide');
			$('.fa-navicon').removeClass('hide');
			$('.menu-container').removeClass('show');
		});

	}
	function _initialize() {
		var container = $el.find('> .container'),
			mainContainer = container.find('.main-container');
		var sectionLength = $(mainContainer).find('> section').length;
		var width = $(window).outerWidth(true),
			height = $(window).outerHeight(true);
		container.css({
			'width' : width+'px',
			'height' : height+'px'
		});
		if (width >767) {
			$el.find('.menu-container').find('li').addClass('desktopMenu');
			$(mainContainer)
				.css({
					'width': (sectionLength * width * .6)+'px',
					'height': '100%'
				})
				.find('> section.topic')
				.css({
					'width': (width * .6)+'px',
					'height': '100%'
				});
			$(mainContainer).find('.about').css({
				'margin-top': '0'
			})
			$el.find('.resume-menu').css({
				'margin-top': '0px'
			})
		} else {
			$el.find('.menu-container').find('li').removeClass('desktopMenu');
			$(mainContainer)
				.css({
					'width' : width+'px',
					'height' : height+'px'
				})
				.find('> section.topic')
				.css({
					'width' : width+'px',
					'height' : 'auto'
				});
			$el.find('.resume-menu').css({
				'margin-top': '0px'
			})
			$(mainContainer).find('.about').css({
				'margin-top': '0'
			})
			_mobileMenuClick();
		}
		$('#contact').width($('.resume-menu').outerWidth(true));
		_handleMenuClick();

	}
	function init() {
		_initialize();
		$(window).on('resize', _initialize);
	}
	return {
		init : init
	}
})().init();