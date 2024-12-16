import * as noti from './notification_config.js'

export function hanldeDropdownAddress() {
    const option_address = document.querySelector("#option-add")
    const drop_down_address = document.querySelector(".drop-down-address")

    if (option_address) {
        option_address.addEventListener("click", function () {
            let d_d_address_style = drop_down_address.style;

            (d_d_address_style.display === "none" || d_d_address_style.display === "") ? d_d_address_style.display = "grid" : d_d_address_style.display = "none"
        })
    }
}
export function animationInputName() {
    const input_name_address_nologin = document.querySelector('#name-client-noLogin')
    const div_name_address_nologin = document.querySelector('.name-client-for-address')

    input_name_address_nologin.addEventListener('focus', () => {
        input_name_address_nologin.placeholder = ''
        div_name_address_nologin.classList.add('active-name-nologin')
    })

    input_name_address_nologin.addEventListener('blur', () => {
        setTimeout(() => {
            input_name_address_nologin.placeholder = 'Họ và tên'
        }, 500)
        div_name_address_nologin.classList.remove('active-name-nologin')
    })

    input_name_address_nologin.addEventListener('input', () => {
        const value = input_name_address_nologin.value
        const regex = /^[a-zA-Z\s]+$/
        if (regex.test(value) && value.trim() !== "") {
            input_name_address_nologin.style.borderBottom = '.5px solid rgb(155, 215, 255)'
        } else {
            input_name_address_nologin.style.borderBottom = '.5px solid red'
        }
    })
}

export function animationInputPhone() {
    const input_phone_address_nologin = document.querySelector('#phone-client-noLogin')
    const div_phone_address_nologin = document.querySelector('.phone-client-for-address')

    input_phone_address_nologin.addEventListener('focus', () => {
        input_phone_address_nologin.placeholder = ''
        div_phone_address_nologin.classList.add('active-name-nologin')
    })

    input_phone_address_nologin.addEventListener('blur', () => {
        setTimeout(() => {
            input_phone_address_nologin.placeholder = 'Số điện thoại'
        }, 500)
        div_phone_address_nologin.classList.remove('active-name-nologin')
    })

    input_phone_address_nologin.addEventListener('input', () => {
        const value = input_phone_address_nologin.value
        const regex = /^(?:\+84|0)(?:\d{9}|\d{2}-\d{7,8})$/
        if (regex.test(value) && value.trim() !== "") {
            input_phone_address_nologin.style.borderBottom = '.5px solid rgb(155, 215, 255)'
        } else {
            input_phone_address_nologin.style.borderBottom = '.5px solid red'
        }
    })
}

export function animationInputAddress() {
    const input_address_address_nologin = document.querySelector('#address-client-noLogin')
    const div_address_address_nologin = document.querySelector('.bottom-form-address')

    input_address_address_nologin.addEventListener('focus', () => {
        input_address_address_nologin.placeholder = ''
        div_address_address_nologin.classList.add('active-name-nologin')
    })

    input_address_address_nologin.addEventListener('blur', () => {
        setTimeout(() => {
            input_address_address_nologin.placeholder = 'Địa chỉ'
        }, 500)
        div_address_address_nologin.classList.remove('active-name-nologin')
    })

    input_address_address_nologin.addEventListener('input', () => {
        if (input_address_address_nologin.value.trim() !== "") {
            input_address_address_nologin.style.borderBottom = '.5px solid rgb(155, 215, 255)'
        } else {
            input_address_address_nologin.style.borderBottom = '.5px solid red'
        }
    })
}

export function checkSingleSP(idctsp) {
    fetch('http://localhost:8083/chi-tiet-san-pham/detail?id=' + idctsp).then((response) => {
        return response.json()
    }).catch((error) => {
        console.log(error)
    })
}

export async function getDataClient(idClient, callback) {
    try {
        const client = await fetch('http://localhost:8083/khachhang/detail/' + idClient)
        if (client.status == 200) {
            const dataClient = await client.json()
            callback(dataClient)
        } else {
            noti.configNotificationError('Lỗi (' + client.status + ')')
        }
    } catch (e) {
        console.error(e)
    }
}

export function handleFormDataAddress() {
    const btn_add_new_address = document.querySelector('#add-new-address')
    const view_add = document.querySelector('.form-add-new-address')
    const overlay_add = document.querySelector('.overlay-address')
    const btn_close_add = document.querySelector('.bx-collapse')

    btn_add_new_address.addEventListener('click', () => {
        if (view_add.style.display == 'none' || !overlay_add.style.display) {
            view_add.style.display = 'block'
            overlay_add.style.display = 'block'
        }
    })

    btn_close_add.addEventListener('click', () => {
        view_add.style.display = 'none'
        overlay_add.style.display = 'none'
    })

    overlay_add.addEventListener('click', () => {
        view_add.style.display = 'none'
        overlay_add.style.display = 'none'
    })
}

export function handleSubmitAddress(idClient, callback) {
    const name = document.querySelector('#name-new-address')
    const phone = document.querySelector('#phone-new-address')
    const address = document.querySelector('#address-new-address')
    const btnSubmitAddress = document.querySelector('#btn-new-submit')
    const drop_down_address = document.querySelector(".drop-down-address")

    const view_add = document.querySelector('.form-add-new-address')
    const overlay_add = document.querySelector('.overlay-address')

    const phoneRegex = /^0\d{9}$/

    btnSubmitAddress.disabled = true

    function validateField(field, validator) {
        const value = field.value.trim()
        const isValid = validator(value)

        field.style.borderBottom = isValid
            ? '.5px solid rgb(155, 215, 255)'
            : '.5px solid red'

        return isValid
    }

    function validateForm() {
        const isNameValid = validateField(name, value => value !== "")
        const isPhoneValid = validateField(phone, value => phoneRegex.test(value))
        const isAddressValid = validateField(address, value => value !== "")

        const isFormValid = isNameValid && isPhoneValid && isAddressValid

        btnSubmitAddress.disabled = !isFormValid
        return isFormValid
    }

    [name, phone, address].forEach(field => {
        field.addEventListener('input', validateForm)
    })

    async function submitAddress(callback) {
        const dataAddress = {
            idKH: idClient,
            tenNguoiNhan: name.value.trim(),
            sdtNguoiNhan: phone.value.trim(),
            dcNguoiNhan: address.value.trim()
        }

        try {
            const response = await fetch('http://localhost:8083/thongtingiaohang/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataAddress),
            })

            if (!response.ok) {
                const mess = await response.text()
                noti.configNotificationError(mess)
                throw new Error('Failed to save address')
            }

            const listAddresses = await response.json()

            callback(listAddresses)
            view_add.style.display = 'none'
            overlay_add.style.display = 'none'
            drop_down_address.style.display = 'none'
        } catch (error) {
            console.error('Error submitting address:', error)
        }
    }

    btnSubmitAddress.addEventListener('click', () => {
        if (validateForm()) {
            submitAddress(listAddresses => {
                callback(listAddresses)
            })
        }
    })

}

export function handleSelectAddress(callback) {
    const drop_down = document.querySelector('#option-add')
    let prevIndex = 0
    drop_down.addEventListener('click', (e) => {
        e.stopPropagation()

        const selectAddress = document.querySelectorAll('.select-address-main')

        Array.from(selectAddress).forEach((address, index) => {
            const icons = document.querySelectorAll('.icon-map .bx-map')

            if (prevIndex == 0) {
                icons.forEach(icon => {
                    icon.style.display = 'none'
                })
                icons[0].style.display = 'block'
            }

            address.addEventListener('click', function () {
                icons.forEach(icon => {
                    icon.style.display = 'none'
                })

                icons[index].style.display = 'block'
                prevIndex = index

                callback(index)
            })
        })
    })
}

export function getDataClientNoLogin(callback) {
    const name = document.querySelector('#name-client-noLogin')
    const phone = document.querySelector('#phone-client-noLogin')
    const address = document.querySelector('#address-client-noLogin')

    if (!name.value || name.value.trim() == '') {
        noti.configNotificationError('Vui lòng nhập họ tên của bạn')
        return false
    }
    if (!phone.value || phone.value.trim() == '') {
        noti.configNotificationError('Vui lòng nhập số điện thoại của bạn')
        return false
    }
    if (!address.value || address.value.trim() == '') {
        noti.configNotificationError('Vui lòng nhập địa chỉ của bạn')
        return false
    }

    callback({
        nameNoLogin: name.value,
        phoneNoLogin: phone.value,
        addressNoLogin: address.value
    })
    return true
}

export async function postDataPay(data, callback) {
    const apiPostPay = await fetch('http://localhost:8083/hoadon/add-hD-online', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (apiPostPay.status == 200) {
        callback(true)
        noti.configNotificationSuccess('Đặt hàng thành công')
    } else {
        let textError = await apiPostPay.text()
        noti.configNotificationError('Lỗi khi thanh toán (' + apiPostPay.status + ')' + ((!textError || textError == '') ? '' : ': ' + textError))
    }
}