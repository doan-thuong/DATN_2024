import * as cartService from './service/cart_service.js'

window.cartCtrl = function ($scope) {
    $scope.totalList = 0
    $scope.litsCart = JSON.parse(sessionStorage.getItem('item_product_detail')) || []
    $scope.checkList = $scope.litsCart.length > 0

    const updateSelectedList = () => {
        const list_checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

        $scope.litsCart.forEach((item, index) => {
            if (Array.from(list_checkBox).some(checkbox => checkbox.value === String(item.id))) {
                item.isSelected = true
                item.soLuongTrongGio = document.querySelectorAll('.input-quantity')[index].value
            }
        })

        sessionStorage.setItem('item_product_detail', JSON.stringify($scope.litsCart))

        const listSelected = $scope.litsCart.filter(item => item.isSelected)

        $scope.$apply(() => {
            $scope.totalList = listSelected.length
        })

        cartService.hanldeClickButtonBuy(listSelected)
    }

    setTimeout(() => {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkBox, index) => {
            checkBox.addEventListener('change', updateSelectedList)
            cartService.handleEventCart(parseInt($scope.litsCart[index].soLuong))
        })
    }, 550)
}