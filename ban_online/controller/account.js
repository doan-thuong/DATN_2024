import * as accService from './service/account_service.js'
import * as noti from './service/notification_config.js'

window.accountCtrl = function ($scope, $http) {
    const client = sessionStorage.getItem('client')
    const btn_new_submit = document.querySelector("#btn-new-submit")

    // sessionStorage.setItem('index_menu', 0)

    if (!client) {
        // window.location.hash = '#!/web400';
        accService.getInformationClient('08C2AA4E')
        sessionStorage.setItem('check_account', '08C2AA4E')
    }

    $scope.check_default = false

    $http.get('http://localhost:8083/thongtingiaohang/detailByKhach/08C2AA4E')
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

    accService.handleAddNewAddress((data) => {
        if (data) {
            $scope.listTTGH.push(data)
        }
    })

    accService.updateClient('08C2AA4E')
}