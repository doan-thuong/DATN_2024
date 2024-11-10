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