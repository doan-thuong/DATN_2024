import * as accService from './service/account_service.js'

window.accountCtrl = function ($scope) {
    const client = sessionStorage.getItem('client')
    const btn_remove = document.querySelector('.remove-address')
    // sessionStorage.setItem('index_menu', 0)

    if (!client) {
        // window.location.hash = '#!/web400';
    }

    $scope.check_default = false

    accService.handleControlMenu()

    accService.handleFormAddNewAddress()

    accService.handleCloseForm()

    accService.handleAddNewAddress()

    if (btn_remove) {
        btn_remove.addEventListener('click', () => {
            console.log('click reomove')
        })
    }
}