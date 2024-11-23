import * as accService from './service/account_service.js'
import * as noti from './service/notification_config.js'
import * as orderService from './service/order_service.js'

window.accountCtrl = function ($scope, $http) {
    const client = sessionStorage.getItem('client')
    const overlayAcc = document.querySelector('.overlay-address')
    const detailOd = document.querySelector('.detail-order')
    const inp_findVC = document.querySelector('#search-voucher')
    let cachedVoucher = []

    if (!client) {
        accService.getInformationClient('BFD28409')
        sessionStorage.setItem('check_account', 'BFD28409')
    }

    $scope.check_default = false

    $http.get('http://localhost:8083/thongtingiaohang/detailByKhach/BFD28409')
        .then(res => {
            $scope.listTTGH = res.data
        })
        .catch(err => {
            console.error(err)
        })

    $scope.delete = function (ttgh) {
        $http.delete('http://localhost:8083/thongtingiaohang/delete/' + ttgh.id)
            .then((res) => {
                $scope.listTTGH = res.data
                noti.configNotificationSuccess('Đã xóa thành công!')
            }).catch((err) => {
                console.error(err)
                noti.configNotificationError('Xóa thất bại!')
            })
    }

    accService.handleControlMenu()

    accService.handleFormAddNewAddress()

    accService.handleCloseForm()

    accService.getVoucherClient('BFD28409', (list) => {
        $scope.$apply(() => {
            $scope.listVC = list
            cachedVoucher = list
        })
    })

    inp_findVC.addEventListener('input', () => {
        let value = inp_findVC.value
        accService.filterVouchers(cachedVoucher, value, (vc) => {
            $scope.$apply(() => {
                $scope.listVC = vc
            })
        })
    })

    accService.getOrderByClient('BFD28409', (order) => {
        $scope.$apply(() => {
            $scope.listOrder = order
        })
    })

    setTimeout(() => {
        let btnOrder = document.querySelectorAll(".text-detail-order-acc")
        btnOrder.forEach(ele => {
            ele.addEventListener("click", () => {
                let idOrd = ele.dataset.orderIdAcc

                orderService.getDataOrderByOrderId(idOrd, (od) => {
                    $scope.$apply(() => {
                        $scope.detailOrder = od
                    })
                })

                orderService.getDataOrderDetails(idOrd, (odDtl) => {
                    $scope.$apply(() => {
                        $scope.listOdDtl = odDtl
                    })
                })

                detailOd.style.display = 'block'
                overlayAcc.style.display = 'block'
            })
        })
    }, 1000)

    accService.handleAddNewAddress((data) => {
        if (data) {
            $scope.listTTGH.push(data)
        }
    })

    accService.updateClient('BFD28409')

    $scope.closeFormOdDtl = function () {
        detailOd.style.display = 'none'
        overlayAcc.style.display = 'none'
    }
}