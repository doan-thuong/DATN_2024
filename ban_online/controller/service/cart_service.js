export function handleEventCart(maxQuantity) {
    const quantityCarts = document.querySelectorAll(".quantity-cart")

    quantityCarts.forEach(cart => {
        const input_quantity_cart = cart.querySelector(".input-quantity")
        const btn_minus_cart = cart.querySelector(".btn-minus")
        const btn_plus_cart = cart.querySelector(".btn-plus")

        let quantity = parseInt(input_quantity_cart.value) || 1 // Khởi tạo quantity với giá trị từ input hoặc 1

        input_quantity_cart.addEventListener('input', () => {
            input_quantity_cart.value = input_quantity_cart.value.replace(/\D/g, '')
            if (input_quantity_cart.value === '') {
                input_quantity_cart.value = 1
            }
            quantity = parseInt(input_quantity_cart.value)
        })

        btn_minus_cart.addEventListener("click", function () {
            if (quantity > 1) {
                quantity--
                input_quantity_cart.value = quantity
            }
        })

        btn_plus_cart.addEventListener("click", function () {
            if (quantity < maxQuantity) {
                quantity++
                input_quantity_cart.value = quantity
            }
        })
    })
}

export function hanldeClickButtonBuy(listItem) {
    const btn_buy = document.querySelector('.btn-buy-cart')
    console.log(listItem)

    if (!btn_buy) return

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