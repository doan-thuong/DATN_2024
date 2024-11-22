import * as accService from './service/account_service.js'
import * as noti from './service/notification_config.js'

window.accountCtrl = function ($scope, $http) {
    const client = sessionStorage.getItem('client')
    // const idClient = sessionStorage.getItem('check_account')

    // sessionStorage.setItem('index_menu', 0)

    if (!client) {
        // window.location.hash = '#!/web400';
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
        })
    })

    accService.getOrderByClient('BFD28409', (order) => {
        $scope.$apply(() => {
            $scope.listOrder = order
        })
    })

    accService.handleAddNewAddress((data) => {
        if (data) {
            $scope.listTTGH.push(data)
        }
    })

    accService.updateClient('BFD28409')
}