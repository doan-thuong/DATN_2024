import * as notiConfig from "./notification_config.js"

export function handleActiveInformation() {

    const title_constituent = document.querySelector(".title-constituent")
    const content_constituent = document.querySelector(".content-constituent")

    const title_instructions = document.querySelector(".title-instructions")
    const content_instructions = document.querySelector(".content-instructions")

    title_constituent.addEventListener("click", function () {
        content_constituent.classList.toggle("show")
    })

    title_instructions.addEventListener("click", function () {
        content_instructions.classList.toggle("show")
    })
}
export function handleEffectAddCart() {
    var start_index = document.getElementById('btn-add-cart').getBoundingClientRect()
    var end_index = document.getElementById('cart-items').getBoundingClientRect()
    var effect_add = document.getElementById('effect-add-cart')

    var scrollX = window.scrollX
    var scrollY = window.scrollY

    effect_add.style.transition = 'none'
    effect_add.style.transform = 'none'
    effect_add.style.opacity = 0
    effect_add.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'

    effect_add.style.left = (start_index.left + scrollX + (start_index.width / 2) - (effect_add.offsetWidth / 2)) + 'px'
    effect_add.style.top = (start_index.top + scrollY + (start_index.height / 2) - (effect_add.offsetHeight / 2)) + 'px'

    setTimeout(() => {
        effect_add.style.opacity = 1
        effect_add.style.transition = 'all 1.5s ease-in-out'
        effect_add.style.zIndex = 10
        effect_add.style.backgroundColor = 'rgb(155, 215, 255)'
        effect_add.style.boxShadow = '0 0 50px rgba(155, 215, 255, 0.6), 0 0 100px rgba(155, 215, 255, 0.4), 0 0 200px rgba(155, 215, 255, 0.2)'

        var translateX = (end_index.left + (end_index.width / 2) - (start_index.left + start_index.width / 2))
        var translateY = (end_index.top + (end_index.height / 2) - (start_index.top + start_index.height / 2))

        effect_add.style.transform = `translate(${translateX}px, ${translateY}px)`

        setTimeout(function () {
            effect_add.style.opacity = 0
            effect_add.style.zIndex = -1
        }, 900)
    }, 100)
}

export function handleChangeTotal(maxTotal) {
    const input_quantity = document.querySelector("#input-quantity")
    const btn_minus = document.querySelector("#btn-minus")
    const btn_plus = document.querySelector("#btn-plus")

    let quantity = 1

    if (input_quantity) {
        quantity = parseInt(input_quantity.value)
    } else {
        console.log('Không có thẻ html')
        return
    }

    input_quantity.addEventListener('input', () => {
        input_quantity.value = input_quantity.value.replace(/\D/g, '')
        if (input_quantity.value == '') {
            input_quantity.value = 1
        }
        quantity = parseInt(input_quantity.value)
    })

    btn_minus.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--
            input_quantity.value = quantity
        } else {
            let mess = 'Số lượng phải lớn hơn 0'
            notiConfig.configNotificationError(mess)
        }
    })

    btn_plus.addEventListener("click", () => {
        if (quantity < maxTotal) {
            quantity++
            input_quantity.value = quantity
        } else {
            let mess = 'Số lượng đã quá số trong kho'
            notiConfig.configNotificationError(mess)
        }
    })
}

export async function handleAddCartForClient(data, callback) {
    try {
        const addResponse = await fetch("http://localhost:8083/giohangchitiet/addOnline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const message = await addResponse.text()

        if (addResponse.status === 200) {
            notiConfig.configNotificationSuccess(message)

            const detailResponse = await fetch(
                `http://localhost:8083/giohangchitiet/detailByIdKhach?idKhach=${data.idKh}`
            )

            if (!detailResponse.ok) {
                throw new Error(`Error fetching cart details: ${detailResponse.status}`)
            }

            const detailData = await detailResponse.json()

            callback(detailData.length)
        } else {
            notiConfig.configNotificationError(message)
        }
    } catch (error) {
        console.error("Lỗi khi xử lý giỏ hàng:", error)
    }
}