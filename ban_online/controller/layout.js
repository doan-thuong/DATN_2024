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
        .when('/order', {
            templateUrl: 'view/order.html',
            controller: orderCtrl,
        })
        .when('/evaluate', {
            templateUrl: 'view/evaluate.html',
            controller: evaluateCtrl,
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

    const text_acc = document.querySelector('#text-acc')
    let acc = JSON.parse(sessionStorage.getItem('user'))
    if (acc) {
        text_acc.textContent = acc.ten[0]
    } else {
        text_acc.textContent = '?'
    }
})