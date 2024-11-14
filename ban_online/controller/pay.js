import * as payService from './service/pay_service.js'

window.payCtrl = function ($scope, $http) {

    let idClient

    $scope.totalMoney = 0
    $scope.discountMoney = 0
    $scope.totalLastMoney = 0
    $scope.check_discount = false
    $scope.check_account = sessionStorage.getItem('check_account') ? true : false
    $scope.list_item_pay = []
    $scope.discountCode = 'Chưa có'
    $scope.reducedMoney = 0

    $scope.index_address = 0

    const check_single_sp = JSON.parse(sessionStorage.getItem('product_buy_now'))
    const check_list_sp = JSON.parse(sessionStorage.getItem('listItemSelected'))

    const listItemSelectedArray = check_list_sp ? check_list_sp : [];

    $scope.list_item_pay = check_single_sp ? [check_single_sp] : listItemSelectedArray

    if ($scope.check_account) {
        idClient = sessionStorage.getItem('check_account')

        console.log($scope.index_address)

        $http.get('http://localhost:8083/thongtingiaohang/detailByKhach/' + idClient)
            .then(res => {
                $scope.list_address_client = res.data
            })
            .catch(err => {
                console.error(err)
            })

        $http.get('http://localhost:8083/chi-tiet-voucher/getByIdKhach/' + idClient)
            .then(res => {
                if (res.status == 200) {
                    $scope.check_discount = true

                    const today = new Date();
                    res.data.forEach(item => {
                        const targetDay = new Date(item.voucher.ngayKetThuc)
                        let deffDay = Math.ceil((targetDay - today) / (1000 * 60 * 60 * 24))
                        item.deffDay = deffDay
                    })

                    $scope.list_voucher = res.data

                } else {
                    $scope.check_discount = false
                    $scope.list_voucher = []
                }
            })
    }

    $scope.client = JSON.parse(sessionStorage.getItem('user'))

    if (!$scope.list_item_pay.length) {
        window.location.href = '#web-null';
        return
    }

    setTimeout(() => {
        if ($scope.check_account === true) {
            payService.hanldeDropdownAddress()
            payService.handleSelectAddress(index => {
                $scope.$apply(function () {
                    $scope.index_address = index
                })
            })
            $scope.useVoucher = function (voucher) {
                $scope.discountCode = voucher.ma
                $scope.reducedMoney = $scope.totalMoney * (voucher.giamGia / 100)
                $scope.discountMoney = $scope.reducedMoney
                $scope.totalLastMoney = $scope.totalMoney - $scope.discountMoney
            }
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