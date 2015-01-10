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