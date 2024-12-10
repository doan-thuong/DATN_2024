import * as notiConfig from "./notification_config.js"

export function handleEventCart(maxQuantity, index, callback) {
    const cart = document.querySelectorAll(".quantity-cart")
    const input_quantity_cart = cart[index].querySelector(".input-quantity")
    const btn_minus_cart = cart[index].querySelector(".btn-minus")
    const btn_plus_cart = cart[index].querySelector(".btn-plus")

    let change_cart = false

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
        change_cart = true
        callback(change_cart)
    })

    btn_minus_cart.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--
            input_quantity_cart.value = quantity
        } else {
            let mess = 'Số lượng phải lớn hơn 0'
            notiConfig.configNotificationError(mess)
        }
        change_cart = true
        callback(change_cart)
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
        change_cart = true
        callback(change_cart)
    })
}

export function hanldeClickButtonBuy(listItem) {
    const btn_buy = document.querySelector('.btn-buy-cart')

    if (!btn_buy) {
        console.error('Button buy cart not found')
        return
    }

    if (!Array.isArray(listItem) || listItem.length === 0) {
        // console.error('listItem phải là một mảng hợp lệ và có ít nhất một phần tử')
        return
    }

    btn_buy.addEventListener('click', async () => {
        try {
            sessionStorage.setItem('product_buy_now', null)
            sessionStorage.removeItem('listItemSelected')
            sessionStorage.setItem('listItemSelected', JSON.stringify(listItem))

            let listMap = []

            for (let item of listItem) {
                listMap.push({
                    idCTSP: item.id,
                    soLuong: item.soLuongTrongGio
                })
            }

            const checkSL = await fetch('http://localhost:8083/chitiethoadon/checkSoLuong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listMap)
            })

            if (checkSL.status != 200) {

                const getResult = await checkSL.text()

                notiConfig.getWarningMessage('Vì số lượng nhiều!!! Bạn sẵn sàng nhận hàng có hạn sử dụng khác nhau chứ?', check => {
                    if (check) {
                        window.location.hash = '#!/pay'
                    } else {
                        notiConfig.configNotificationWarning('Bạn hãy chọn lại số lượng (gợi ý ' + getResult + ')');
                    }
                })
            } else {
                window.location.hash = '#!/pay'
            }
        } catch (error) {
            console.error('Lỗi khi lưu listItem vào sessionStorage:', error)
        }
    })
}

export async function getListCartClient(idKhach, callback) {
    try {
        const response = await fetch(`http://localhost:8083/giohangchitiet/detailByIdKhach?idKhach=${idKhach}`)
        if (response.status == 200) {
            const data = await response.json()
            callback(data)
        } else {
            // const er = await response.text()
            callback(null)
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error)
    }
}

export async function updateQuantityInCart(id, quantity) {
    try {
        const response = await fetch(`http://localhost:8083/giohangchitiet/updateQuantity?id=${id}&quantity=${quantity}`)
        if (response.status != 200) {
            const er = await response.text()
            notiConfig.configNotificationError(er)
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error)
    }
}

export async function deleteProductInCart(id) {
    try {
        const response = await fetch(`http://localhost:8083/giohangchitiet/delete/${id}`, { method: 'DELETE' })
        if (response.status != 200) {
            const er = await response.text()
            notiConfig.configNotificationError(er)
        } else {
            notiConfig.configNotificationSuccess('Xóa sản phẩm thành công')
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error)
    }
}