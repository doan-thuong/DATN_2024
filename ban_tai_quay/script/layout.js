
document.addEventListener("DOMContentLoaded", () => {
    const control_nav = document.getElementById("control-nav")
    const logo = document.getElementById("logo")
    const body_nav = document.getElementById("body-nav")
    const control_acc = document.getElementById("control-account")
    const nav = document.querySelector("nav")

    let isOpen = true

    if (control_nav) {
        control_nav.addEventListener("click", () => {
            if (nav) {
                if (isOpen) {

                    nav.style.width = "60px"
                    nav.style.borderRight = "none"
                    logo.style.display = "none"
                    body_nav.style.display = "none"
                    control_acc.style.display = "none"

                } else {

                    nav.style.width = "220px"
                    nav.style.borderRight = "0.5px solid rgb(210, 210, 210)"
                    logo.style.display = "flex"
                    body_nav.style.display = "block"
                    control_acc.style.display = "flex"

                }
                isOpen = !isOpen // Chuyển trạng thái
            } else {
                console.error("Element 'nav' not found.")
            }

        })
    } else {
        console.error("Element 'control-nav' not found.")
    }
})

var app = angular.module("myApp", ['ngRoute'])

app.config(function ($routeProvider) {
    $routeProvider
        .when('/sanpham', {
            templateUrl: 'view/sanpham.html',
            controller: sanphamCtrl
        })
        .when('/giamgia', {
            templateUrl: 'view/giamgia.html',
            controller: giamgiaCtrl
        })
        .when('/banhang', {
            templateUrl: 'view/banhang.html',
            controller: banhangCtrl
        })
        .when('/nhansu', {
            templateUrl: 'view/nhansu.html',
            controller: nhansuCtrl
        })
        .when('/khachhang', {
            templateUrl: 'view/khachhang.html',
            controller: khachhangCtrl
        })
        .when('/thongke', {
            templateUrl: 'view/thongke.html',
            controller: thongkeCtrl
        })
        .otherwise({
            redirectTo: '/sanpham'
        })
})

app.controller('myCtrl', function () { })