import * as payService from './service/pay_service.js'
import * as noti from './service/notification_config.js'

window.payCtrl = function ($scope, $location, $http) {

    let idClient = null
    const btn_pay = document.querySelector('#btn-pay')
    const payment = document.querySelectorAll('[name="payment"]')
    let dataPay = {}

    $scope.totalMoney = 0
    $scope.discountMoney = 0
    $scope.totalLastMoney = 0
    $scope.check_discount = false
    $scope.check_account = (sessionStorage.getItem('check_account') != null) ? true : false
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
                $scope.index_address = index
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

    btn_pay.addEventListener('click', () => {
        let inforClient = null
        let checkConfirm = false

        let getPayment

        if ($scope.check_account) {
            // add id khách vào data
            dataPay.idkh = idClient

            if ($scope.index_address != 0) {
                // nếu địa chỉ khách chọn khác 0 thì sẽ lấy index để gửi sang backend xử lý
                dataPay.indexAddress = $scope.index_address
            }

            // add mã giảm vào data
            dataPay.discountCode = $scope.discountCode

            console.log(idClient)
            console.log($scope.index_address)
            console.log($scope.discountCode)
        } else {
            let checkData = payService.getDataClientNoLogin(acc => {
                inforClient = acc
                console.log(inforClient)
                // add infor khách nếu không đăng nhập
                dataPay.inforNoLogin = inforClient
            })
            if (!checkData) return
        }

        console.log($scope.list_item_pay)
        // add list sản phẩm vào data
        dataPay.listProduct = $scope.list_item_pay

        payment.forEach(pm => {
            if (pm.checked) {
                console.log(pm.value)
                getPayment = pm.value
                return
            }
        })

        //add payment vào data
        dataPay.payment = getPayment

        noti.getConfirm((check) => {
            checkConfirm = check
            console.log("choose: " + check)

            if (checkConfirm) {
                //check nếu payment là tt online sẽ sang bên vnpay
                if (getPayment == 2) {
                    // console.log('http://localhost:8083/payment/vn-pay?amount=' + $scope.totalLastMoney + '&bankCode=NCB')
                    // return
                    fetch('http://localhost:8083/payment/vn-pay?amount=' + $scope.totalLastMoney + '&bankCode=NCB')
                        .then(response => response.json())
                        .then(data => {
                            window.location.href = data.result.paymentUrl
                        })
                        .catch(error => {
                            console.error('Error:', error)
                        })
                } else {
                    payService.postDataPay(data)
                }
                console.log(dataPay)
            }
        })
    })

    $scope.$on('$viewContentLoaded', () => {
        let urlParam = $location.search()
        let status = urlParam.vnp_ResponseCode

        if (!status) return

        if (status === '00') {
            noti.showSuccess('Thanh toán thành công')
            payService.postDataPay(dataPay)
            // setTimeout(() => {
            window.location.hash = '#!/home'
            // }, 2000)
        } else {
            noti.showError('Thanh toán thất bại')
        }
    })
}