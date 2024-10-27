export function handleEventCart(maxQuantity) {
    const quantityCarts = document.querySelectorAll(".quantity-cart")

    quantityCarts.forEach(cart => {
        const input_quantity_cart = cart.querySelector(".input-quantity")
        const btn_minus_cart = cart.querySelector(".btn-minus")
        const btn_plus_cart = cart.querySelector(".btn-plus")

        const error_message = document.querySelector('.notification-error')
        const error_text = document.querySelector('#content-error')
        const progress_error = document.querySelector('.progress-bar-error')

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
            } else {
                error_message.style.display = 'flex'
                error_text.textContent = 'Số lượng phải lớn hơn 0'

                progress_error.style.width = '0%'
                setTimeout(() => {
                    progress_error.style.width = '100%'
                }, 100)

                setTimeout(() => {
                    error_message.style.display = 'none'
                    progress_error.style.width = '0%'
                }, 2000)
            }
        })

        btn_plus_cart.addEventListener("click", function () {
            if (quantity < maxQuantity) {
                quantity++
                input_quantity_cart.value = quantity
            } else {
                error_message.style.display = 'flex'
                error_text.textContent = 'Số lượng đã quá số trong kho '

                progress_error.style.width = '0%'
                setTimeout(() => {
                    progress_error.style.width = '100%'
                }, 100)

                setTimeout(() => {
                    error_message.style.display = 'none'
                    progress_error.style.width = '0%'
                }, 2000)
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