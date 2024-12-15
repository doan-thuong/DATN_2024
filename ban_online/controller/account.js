import * as accService from './service/account_service.js'
import * as noti from './service/notification_config.js'
import * as orderService from './service/order_service.js'

window.accountCtrl = function ($scope, $http) {
    const account = JSON.parse(sessionStorage.getItem('user'))

    if (!account) {
        window.location.href = 'http://127.0.0.1:5501/login/loginOnline.html'
        return
    }

    const idAcc = account.id
    const client = sessionStorage.getItem('client')
    const overlayAcc = document.querySelector('.overlay-address')
    const detailOd = document.querySelector('.detail-order')
    const inp_findVC = document.querySelector('#search-voucher')
    let cachedVoucher = []
    const number_cart = document.querySelector('#number-cart')

    number_cart.textContent = ''
    if (!client) {
        accService.getInformationClient(idAcc)
        sessionStorage.setItem('check_account', idAcc)
    }

    $scope.check_default = false

    $http.get('http://localhost:8083/thongtingiaohang/detailByKhach/' + idAcc)
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

    accService.getVoucherClient(idAcc, (list) => {
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

    accService.getOrderByClient(idAcc, (order) => {
        $scope.$apply(() => {
            $scope.listOrder = order
        })
    })

    function attachOrderClickHandler() {
        let btnOrder = document.querySelectorAll(".text-detail-order-acc")

        accService.handleFormCancelOrder()

        btnOrder.forEach(ele => {
            ele.addEventListener("click", async () => {
                let idOrd = ele.dataset.orderIdAcc
                document.querySelector('.content-reason').style.display = 'none'

                const order = await orderService.getDataOrderByOrderId(idOrd)
                const orderDetails = await orderService.getDataOrderDetails(idOrd)

                let tongTiens = 0
                for (const cthd of orderDetails) {
                    tongTiens += cthd.soLuong * cthd.giaSauGiam
                }

                $scope.$apply(() => {
                    $scope.detailOrder = order.hoaDonRep
                    $scope.listOdDtl = orderDetails
                    $scope.tongTienDtl = tongTiens
                })

                detailOd.style.display = 'block'
                overlayAcc.style.display = 'block'
            })
        })
    }

    attachOrderClickHandler()

    // Sử dụng MutationObserver để theo dõi các thay đổi trong DOM
    const observer = new MutationObserver(() => {
        attachOrderClickHandler()
    })

    // Theo dõi toàn bộ body hoặc phần tử cha cụ thể
    observer.observe(document.body, { childList: true, subtree: true })

    accService.handleAddNewAddress((data) => {
        if (data) {
            $scope.listTTGH.push(data)
        }
    })

    accService.updateClient(idAcc)

    $scope.closeFormOdDtl = function () {
        detailOd.style.display = 'none'
        overlayAcc.style.display = 'none'
    }

    accService.logOut()
}