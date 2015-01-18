var app = angular.module("kuldipWeb", []);

app.controller('home', function ($scope) {
	var headHome = window.kuldipWeb.headHome;
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

app.controller('headContactMe', function ($scope) {
	var headContactMe = window.kuldipWeb.headContactMe;
	$scope.classNames = headContactMe.classNames;
	$scope.imgLink = headContactMe.imgLink;
	$scope.imgAlt = headContactMe.imgAlt;
});

app.controller('mainInfo', function ($scope) {
	var welcomeJSON = window.kuldipWeb.contactMeInfoJSON;
	$scope.title = welcomeJSON.title;
	$scope.info_content = welcomeJSON.main_info;
	$scope.showButton = welcomeJSON.showButton;
	$scope.buttonLink = welcomeJSON.buttonLink;
	$scope.buttonTitle = welcomeJSON.buttonTitle;
	$scope.classNames = welcomeJSON.classNames;
});

app.controller('queryController', function () {
	var to, subject, message;
	this.sendQuery = function () {
		var messageInfo = {
			name: $.trim($("#name").val()),
	        email : $.trim($("#email").val()),
	        website : $.trim($("#website").val()),
	        message : $.trim($("#message").val()),
	        emails : $('#email').val()
		}
		if (messageInfo.name != '' && messageInfo.email != '' && messageInfo.message != '' &&  tempEmail == '') {
	        $.get( "/sendQuery", messageInfo).done(function (data) {
	        	if (data=="sent") {
	            	$("#confirmation").empty().html("Your query/request/suggestion has been sent.").addClass('success').removeClass('error');
	            	$('.send-message').find('input[type=text], textarea').val('');
	        	} else {
	        		$("#confirmation").empty().html("Please Fill required fields.").addClass('error').removeClass('success');
	        	}
			});
	    } else {
	    	$("#confirmation").empty().html("Please Fill required fields.").addClass('error').removeClass('success');
	    }
	};

	this.cancel = function () {
		$('.send-mail').removeClass('show');
		$('body').removeClass('fixed');
		$(window).scrollTop(window.apexair.fronTop);
	};
});