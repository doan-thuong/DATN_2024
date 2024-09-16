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
        .otherwise({
            redirectTo: '/home',
        })
})

app.controller('myCtrl', function ($scope) { })