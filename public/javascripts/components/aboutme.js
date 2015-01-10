var app = angular.module("kuldipWeb", []);

var headHome = window.kuldipWeb.headHome;
app.controller('home', function ($scope) {
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

var headAboutMe = window.kuldipWeb.headAboutMe;
app.controller('headAboutMe', function ($scope) {
	$scope.classNames = headAboutMe.classNames;
	$scope.imgLink = headAboutMe.imgLink;
	$scope.imgAlt = headAboutMe.imgAlt;
});

var welcomeJSON = window.kuldipWeb.aboutMeInfoJSON;
app.controller('mainInfo', function ($scope) {
	$scope.title = welcomeJSON.title;
	$scope.info_content = welcomeJSON.main_info;
	$scope.showButton = welcomeJSON.showButton;
	$scope.buttonLink = welcomeJSON.buttonLink;
	$scope.buttonTitle = welcomeJSON.buttonTitle;
	$scope.classNames = welcomeJSON.classNames;
});