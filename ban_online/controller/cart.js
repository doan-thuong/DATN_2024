import * as cartService from './service/cart_service.js'

window.cartCtrl = function ($scope) {

    $scope.checkAccount = sessionStorage.getItem('tokenAccount')

    $scope.totalList = 0

    if ($scope.checkAccount) {
        //call api để get list cart
        $scope.litsCart = cartService.getListCartClient($scope.checkAccount.id) || []
    } else {
        $scope.litsCart = JSON.parse(sessionStorage.getItem('item_product_detail')) || []
    }
    $scope.checkList = $scope.litsCart.length > 0

    const updateSelectedList = () => {
        const list_checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

        $scope.litsCart.forEach((item, index) => {
            if (Array.from(list_checkBox).some(checkbox => checkbox.value === String(item.id))) {
                item.isSelected = true
            } else {
                item.isSelected = false
            }
            item.soLuongTrongGio = document.querySelectorAll('.input-quantity')[index].value
        })

        const listSelected = $scope.litsCart.filter(item => item.isSelected)

        if ($scope.checkAccount) {
            // checkAccount là true -> gọi API để lưu vào db

        } else {
            // checkAccount là false, lưu tạm vào session
            sessionStorage.setItem('item_product_detail', JSON.stringify($scope.litsCart))
        }
        updateTotalList(listSelected)
    }

    const updateTotalList = (listSelected) => {
        $scope.$apply(() => {
            $scope.totalList = listSelected.length
        })

        cartService.hanldeClickButtonBuy(listSelected)
    }

    setTimeout(() => {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkBox, index) => {
            checkBox.addEventListener('change', updateSelectedList)
            cartService.handleEventCart(parseInt($scope.litsCart[index].soLuong), index)
        })
    }, 550)
}