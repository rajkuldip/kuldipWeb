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

app.controller('recentEasyTabPost', function ($scope, $http) {
	$scope.list = function () {
		$http.get( "/showComment").success(function (data) {
			$scope.comments = data.length;
		});
	}
	$scope.list();
});