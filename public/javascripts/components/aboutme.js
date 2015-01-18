var app = angular.module("kuldipWeb", []);

app.controller('home', function ($scope) {
	var headHome = window.kuldipWeb.headHome;
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

app.controller('headAboutMe', function ($scope) {
	var headAboutMe = window.kuldipWeb.headAboutMe;
	$scope.classNames = headAboutMe.classNames;
	$scope.imgLink = headAboutMe.imgLink;
	$scope.imgAlt = headAboutMe.imgAlt;
});

app.controller('mainInfo', function ($scope) {
	var welcomeJSON = window.kuldipWeb.aboutMeInfoJSON;
	$scope.title = welcomeJSON.title;
	$scope.info_content = welcomeJSON.main_info;
	$scope.showButton = welcomeJSON.showButton;
	$scope.buttonLink = welcomeJSON.buttonLink;
	$scope.buttonTitle = welcomeJSON.buttonTitle;
	$scope.classNames = welcomeJSON.classNames;
});