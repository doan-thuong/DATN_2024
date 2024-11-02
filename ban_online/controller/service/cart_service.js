import * as notiConfig from "./notification_config.js"

export function handleEventCart(maxQuantity, index) {
    const cart = document.querySelectorAll(".quantity-cart")

    // quantityCarts.forEach(cart => {
    const input_quantity_cart = cart[index].querySelector(".input-quantity")
    const btn_minus_cart = cart[index].querySelector(".btn-minus")
    const btn_plus_cart = cart[index].querySelector(".btn-plus")

    let quantity = parseInt(input_quantity_cart.value) || 1 // Khởi tạo quantity với giá trị từ input hoặc 1

    input_quantity_cart.addEventListener('input', () => {
        input_quantity_cart.value = input_quantity_cart.value.replace(/\D/g, '')
        if (input_quantity_cart.value === '' || input_quantity_cart.value == 0) {
            input_quantity_cart.value = 1
        } else if (input_quantity_cart.value > maxQuantity) {
            input_quantity_cart.value = maxQuantity

            let mess = 'Số lượng đã quá số trong kho'
            notiConfig.configNotificationError(mess)
        }
        quantity = parseInt(input_quantity_cart.value)
    })

    btn_minus_cart.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--
            input_quantity_cart.value = quantity
        } else {
            let mess = 'Số lượng phải lớn hơn 0'
            notiConfig.configNotificationError(mess)
        }
    })

    btn_plus_cart.addEventListener("click", function () {
        if (quantity < maxQuantity) {
            quantity++
            input_quantity_cart.value = quantity
        } else {
            let mess = 'Số lượng đã quá số trong kho'
            notiConfig.configNotificationError(mess)
            input_quantity_cart.value = maxQuantity
        }
    })
    // })
}

export function hanldeClickButtonBuy(listItem) {
    const btn_buy = document.querySelector('.btn-buy-cart')

    if (!btn_buy) {
        console.error('Button buy cart not found')
        return
    }

    if (!Array.isArray(listItem) || listItem.length === 0) {
        console.error('listItem phải là một mảng hợp lệ và có ít nhất một phần tử')
        return
    }

    btn_buy.addEventListener('click', () => {
        try {
            sessionStorage.setItem('product_buy_now', null)
            sessionStorage.removeItem('listItemSelected')
            sessionStorage.setItem('listItemSelected', JSON.stringify(listItem))

            window.location.hash = '#!/pay';
        } catch (error) {
            console.error('Lỗi khi lưu listItem vào sessionStorage:', error);
        }
    })
}