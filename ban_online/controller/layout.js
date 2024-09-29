var app = angular.module("myApp", ['ngRoute'])

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'view/home.html',
            controller: homeCtrl,
        })
        .when('/information', {
            templateUrl: 'view/information.html',
            controller: informationCtrl,
        })
        .when('/account', {
            templateUrl: 'view/account.html',
            controller: accountCtrl,
        })
        .otherwise({
            redirectTo: '/home',
        })
})

app.controller('myCtrl', function ($scope) { })