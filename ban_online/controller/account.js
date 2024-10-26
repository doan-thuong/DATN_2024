import * as accService from './service/account_service.js'

window.accountCtrl = function ($scope) {
    const url = ""
    const btn_remove = document.querySelector('.remove-address')

    $scope.check_default = false

    accService.handleControlMenu()

    accService.handleAddNewAddress()

    accService.handleCloseForm()

    if (btn_remove) {
        btn_remove.addEventListener('click', () => {
            console.log('click reomove')
        })
    }
}