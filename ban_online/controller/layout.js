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
            resolve: {
                delay: function ($timeout) {
                    return $timeout(function () { }, 500)
                }
            }
        })
        .when('/account', {
            templateUrl: 'view/account.html',
            controller: accountCtrl,
        })
        .when('/notification', {
            templateUrl: 'view/notification.html',
            controller: notifiCtrl,
        })
        .when('/pay', {
            templateUrl: 'view/pay.html',
            controller: payCtrl,
        })
        .when('/cart', {
            templateUrl: 'view/cart.html',
            controller: cartCtrl,
        })
        .when('/web400', {
            templateUrl: 'view/web400.html'
        })
        .otherwise({
            redirectTo: '/home',
        })
})

app.controller('myCtrl', function ($rootScope, $scope) {
    $rootScope.$on('$routeChangeSuccess', function () {
        window.scrollTo(0, 0)
    })
})