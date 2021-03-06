var app = angular.module("kuldipWeb", []);

app.controller('home', function ($scope) {
	var headHome = window.kuldipWeb.headHome;
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

app.controller('easyTabHead', function ($scope) {
	var headEasyTabs = window.kuldipWeb.headEasyTabs;
	$scope.classNames = headEasyTabs.classNames;
	$scope.imgLink = headEasyTabs.imgLink;
	$scope.imgAlt = headEasyTabs.imgAlt;
});

app.controller('headAboutMe', function ($scope) {
	var headAboutMe = window.kuldipWeb.headAboutMe;
	$scope.classNames = headAboutMe.classNames;
	$scope.imgLink = headAboutMe.imgLink;
	$scope.imgAlt = headAboutMe.imgAlt;
});

app.controller('mainInfo', function ($scope) {
	var welcomeJSON = window.kuldipWeb.welcomeJSON;
	$scope.title = welcomeJSON.title;
	$scope.info_content = welcomeJSON.main_info;
	$scope.showButton = welcomeJSON.showButton;
	$scope.buttonLink = welcomeJSON.buttonLink;
	$scope.buttonTitle = welcomeJSON.buttonTitle;
	$scope.classNames = welcomeJSON.classNames;
});

app.controller('easyTabs', function ($scope) {
	var easyTabs = window.kuldipWeb.easyTabs;
	$scope.title = easyTabs.title;
	$scope.info_content = easyTabs.main_info;
	$scope.showButton = easyTabs.showButton;
	$scope.buttonLink = easyTabs.buttonLink;
	$scope.buttonTitle = easyTabs.buttonTitle;
});

app.controller('easyTabComments', function ($scope, $http) {
	var errorMessage = $('.post-comments').find('.postMsg');
	errorMessage.text('');

	function verifyEmail(element) {
		var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailReg.test($.trim($(element).val()))) {
			return false;
		} else {
			return true;
		}
	}

	//To post comment
	$scope.postComment = function ($event) {
		$event.preventDefault();
		$($event.currentTarget).attr('disabled','disabled');
		var messageInfo = {
			name : $('#name').val(),
			email : $('#email').val(),
			comments: $('#comments').val(),
			emails: $('#emails').val()
		}
		if (messageInfo.name == '' || messageInfo.email == '' || messageInfo.comments == '') {
			errorMessage.removeClass('success').addClass('error').text('Please fill all details!');
			return false;
		} else if (!verifyEmail($('#email'))) {
			errorMessage.removeClass('success').addClass('error').text('Please enter valid email!');
			return false;
		} else {
			errorMessage.removeClass('error').text('');
		}
		if (messageInfo.emails == '') {
	        $.get( "/postComment", messageInfo).done(function (data) {
	        	$($event.currentTarget).removeAttr('disabled');
	        	if (data=="sent") {
	        		errorMessage.removeClass('error').addClass('success').text('Your comment has been posted!');
	        		$('#name').val('');
	        		$('#email').val('');
	        		$('#comments').val('');
					$scope.list();
	        	} else {
	        		errorMessage.removeClass('success').addClass('error').text(data);
	        	}
			});
	    }
	};

	//To show comment
	$scope.list = function () {
		$http.get( "/showComment").success(function (data) {
			$scope.comments = data;
		});
	}
	$scope.list();
});