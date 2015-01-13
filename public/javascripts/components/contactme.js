var app = angular.module("kuldipWeb", []);

var headHome = window.kuldipWeb.headHome;
app.controller('home', function ($scope) {
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

var headContactMe = window.kuldipWeb.headContactMe;
app.controller('headContactMe', function ($scope) {
	$scope.classNames = headContactMe.classNames;
	$scope.imgLink = headContactMe.imgLink;
	$scope.imgAlt = headContactMe.imgAlt;
});

var welcomeJSON = window.kuldipWeb.contactMeInfoJSON;
app.controller('mainInfo', function ($scope) {
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
	        message : $.trim($("#message").val())
		}
		if (messageInfo.name != '' && messageInfo.email != '' && messageInfo.message != '' ) {
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