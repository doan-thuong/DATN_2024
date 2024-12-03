import * as cartService from './service/cart_service.js'
import * as noti from './service/notification_config.js'

window.cartCtrl = function ($scope) {

    $scope.checkAccount = sessionStorage.getItem('check_account')
    $scope.totalList = 0

    const number_cart = document.querySelector('#number-cart')

    if ($scope.checkAccount) {
        //call api để get list cart
        cartService.getListCartClient($scope.checkAccount, function (data) {
            $scope.$apply(function () {
                $scope.litsCart = data || []
                $scope.checkList = $scope.litsCart.length > 0

                console.log(data)

                number_cart.textContent = $scope.litsCart.length
            })
        })
    } else {
        $scope.litsCart = JSON.parse(sessionStorage.getItem('item_product_detail')) || []
        $scope.checkList = $scope.litsCart.length > 0
        number_cart.textContent = $scope.litsCart.length
        console.log($scope.litsCart)
    }

    const updateSelectedList = () => {
        const list_checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

        $scope.litsCart.forEach((item, index) => {
            if (Array.from(list_checkBox).some(checkbox => checkbox.value === String(item.id))) {
                item['isSelected'] = true
            } else {
                item['isSelected'] = false
            }
            item.soLuongTrongGio = document.querySelectorAll('.input-quantity')[index].value
        })

        const listSelected = $scope.litsCart.filter(item => item.isSelected)

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

            cartService.handleEventCart(parseInt($scope.litsCart[index].soLuong), index, (check) => {
                if (check) {
                    $scope.litsCart[index].soLuongTrongGio = parseInt(document.querySelectorAll('.quantity-cart')[index]
                        .querySelector('.input-quantity').value) || 1

                    if ($scope.checkAccount) {
                        // checkAccount là true -> gọi API để lưu vào db
                        cartService.updateQuantityInCart($scope.litsCart[index].id, parseInt($scope.litsCart[index].soLuongTrongGio))
                    } else {
                        // checkAccount là false, lưu tạm vào session
                        sessionStorage.setItem('item_product_detail', JSON.stringify($scope.litsCart))
                    }
                }
            })
        })
    }, 550)

    $scope.removeCartItem = function (index) {
        if ($scope.checkAccount) {
            cartService.deleteProductInCart($scope.litsCart[index].id)
                .then(() => {
                    $scope.$apply(() => {
                        $scope.litsCart.splice(index, 1);
                        number_cart.textContent = $scope.litsCart.length;
                    })
                })
                .catch((error) => {
                    console.error("Failed to delete product:", error)
                })
        } else {
            $scope.litsCart.splice(index, 1)
            noti.configNotificationSuccess("Xóa sản phẩm thành công")
            number_cart.textContent = $scope.litsCart.length
            sessionStorage.setItem('item_product_detail', JSON.stringify($scope.litsCart))
        }
    }
}