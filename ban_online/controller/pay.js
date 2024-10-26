import * as payService from './service/pay_service.js'

window.payCtrl = function ($scope, $location) {
    $scope.totalMoney = 0
    $scope.discountMoney = 0
    $scope.totalLastMoney = 0
    $scope.check_discount = false
    $scope.check_account = false
    $scope.list_item_pay = []

    const check_single_sp = JSON.parse(sessionStorage.getItem('product_buy_now'))
    const check_list_sp = JSON.parse(sessionStorage.getItem('listItemSelected'))

    const listItemSelectedArray = check_list_sp ? check_list_sp : [];

    $scope.list_item_pay = check_single_sp ? [check_single_sp] : listItemSelectedArray

    if (!$scope.list_item_pay.length) {
        window.location.href = '#web-null';
        return
    }

    setTimeout(() => {
        if ($scope.check_account === true) {
            payService.hanldeDropdownAddress()
        } else {
            payService.animationInputName()
            payService.animationInputPhone()
            payService.animationInputAddress()
        }
    }, 0)

    Array.from($scope.list_item_pay).forEach(element => {
        let gia = parseInt(element.gia)
        let soLuong = parseInt(element.soLuongTrongGio)
        $scope.totalMoney += gia * soLuong
    })

    $scope.totalLastMoney = $scope.totalMoney - $scope.discountMoney
}