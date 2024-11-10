import * as accService from './service/account_service.js'
import * as notiConfig from './service/notification_config.js'

window.accountCtrl = function ($scope, $http) {
    const client = sessionStorage.getItem('client')
    const btn_remove = document.querySelector('.remove-address')
    const btn_save_changes = document.querySelector('#save-changes')
    // sessionStorage.setItem('index_menu', 0)

    if (!client) {
        // window.location.hash = '#!/web400';
        accService.getInformationClient('08C2AA4E')
    }

    $scope.check_default = false

    accService.handleControlMenu()

    accService.handleFormAddNewAddress()

    accService.handleCloseForm()

    accService.handleAddNewAddress()

    btn_save_changes.addEventListener('click', async function () {
        const overlay = document.querySelector('.overlay-address')
        const loading = document.querySelector('.loader')
        let data, status

        overlay.style.display = 'block'
        loading.style.display = 'block'
        try {
            const response = await fetch('http://localhost:8083/khachhang/update/' + '08C2AA4E',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(accService.getDataFromClient('08C2AA4E'))
                })
            data = await response.text()
            status = response.status

        } catch {
            er => { console.error(er) }
        } finally {
            overlay.style.display = 'none'
            loading.style.display = 'none'
            console.log(status + ": " + data)
            switch (status) {
                case 200:
                    notiConfig.configNotificationSuccess(data)
                    break
                case 400:
                case 404:
                    notiConfig.configNotificationError(data)
                    break
                case 500:
                    notiConfig.configNotificationError('Internal Server Error')
                    break
                default:
                    console.warn("Unhandled status:", status)
            }
        }

    })

    if (btn_remove) {
        btn_remove.addEventListener('click', () => {
            console.log('click reomove')
        })
    }
}