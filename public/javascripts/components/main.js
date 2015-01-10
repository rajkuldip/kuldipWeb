var app = angular.module("kuldipWeb", []);

var headHome = window.kuldipWeb.headHome;
app.controller('home', function ($scope) {
	$scope.classNames = headHome.classNames;
	$scope.imgLink = headHome.imgLink;
	$scope.imgAlt = headHome.imgAlt;
});

var headEasyTabs = window.kuldipWeb.headEasyTabs;
app.controller('easyTabHead', function ($scope) {
	$scope.classNames = headEasyTabs.classNames;
	$scope.imgLink = headEasyTabs.imgLink;
	$scope.imgAlt = headEasyTabs.imgAlt;
});

var headAboutMe = window.kuldipWeb.headAboutMe;
app.controller('headAboutMe', function ($scope) {
	$scope.classNames = headAboutMe.classNames;
	$scope.imgLink = headAboutMe.imgLink;
	$scope.imgAlt = headAboutMe.imgAlt;
});

var welcomeJSON = window.kuldipWeb.welcomeJSON;
app.controller('mainInfo', function ($scope) {
	$scope.title = welcomeJSON.title;
	$scope.info_content = welcomeJSON.main_info;
	$scope.showButton = welcomeJSON.showButton;
	$scope.buttonLink = welcomeJSON.buttonLink;
	$scope.buttonTitle = welcomeJSON.buttonTitle;
	$scope.classNames = welcomeJSON.classNames;
});

var easyTabs = window.kuldipWeb.easyTabs;
app.controller('easyTabs', function ($scope) {
	$scope.title = easyTabs.title;
	$scope.info_content = easyTabs.main_info;
	$scope.showButton = easyTabs.showButton;
	$scope.buttonLink = easyTabs.buttonLink;
	$scope.buttonTitle = easyTabs.buttonTitle;
});

app.controller('recentEasyTabPost', function ($scope, $http) {
	$scope.list = function () {
		$http.get( "http://localhost:3000/showComment").success(function (data) {
			$scope.comments = data.length;
		});
	}
	$scope.list();
});
