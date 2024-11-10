import * as noti from "./notification_config.js"

export function handleCloseForm() {
    const overlay = document.querySelector('.overlay-address')
    const form_add_address = document.querySelector('.form-add-new-address')
    const btn_cancel = document.querySelector('.bx-collapse')
    const loader = document.querySelector('.loader')

    const closeForm_address = () => {
        if (overlay.style.display == 'block') {
            overlay.style.display = 'none'
            form_add_address.style.display = 'none'
            loader.style.display = 'none'
        }
    }

    overlay.addEventListener('click', () => {
        closeForm_address()
    })

    btn_cancel.addEventListener('click', () => {
        closeForm_address()
    })
}

export function handleFormAddNewAddress() {
    const btn_add_address = document.querySelector('#add-new-address-account')
    const overlay = document.querySelector('.overlay-address')
    const form_add_address = document.querySelector('.form-add-new-address')

    btn_add_address.addEventListener('click', () => {
        let display_form_address = form_add_address.style

        if (display_form_address.display == 'none' || display_form_address.display == '') {
            display_form_address.display = 'grid'
            overlay.style.display = 'block'
        } else {
            display_form_address.display = 'none'
            overlay.style.display = 'none'
        }
    })
}

export function handleControlMenu() {
    const menu_acc = document.querySelectorAll(".menu")
    const content_acc = document.querySelectorAll(".content-acc")
    let get_index_menu = sessionStorage.getItem('index_menu') || 0

    content_acc.forEach(content => {
        content.style.display = 'none'
    })

    menu_acc[get_index_menu].classList.add('select-menu')
    content_acc[get_index_menu].style.display = 'grid'

    menu_acc.forEach((menu, index) => {
        menu.addEventListener('click', () => {
            content_acc.forEach(content => {
                content.style.display = 'none'
            })

            content_acc[index].style.display = 'grid'
            sessionStorage.setItem('index_menu', index)

            menu_acc.forEach(menu => {
                menu.classList.remove('select-menu')
            })

            menu.classList.add('select-menu')
        })
    })
}

export function handleAddNewAddress() {
    const input_new_name = document.querySelector("#name-new-address")
    const input_new_phone = document.querySelector("#phone-new-address")
    const input_new_address = document.querySelector("#address-new-address")
    const btn_new_submit = document.querySelector("#btn-new-submit")

    if (!input_new_name || !input_new_phone || !input_new_address) {
        console.error('No card name or phone or address')
        return
    }

    btn_new_submit.addEventListener('click', (e) => {
        e.preventDefault()

        if (input_new_name.value.trim() == '' || !input_new_name.value) {
            let mess = "Hãy nhập tên của bạn!"
            noti.configNotificationError(mess)
            input_new_name.style.borderBottom = '1px solid red'
            return
        } else {
            input_new_name.style.borderBottom = '1px solid rgb(45, 130, 255)'
        }

        if (input_new_phone.value.trim() == '' || !input_new_phone.value) {
            let mess = "Hãy nhập số điện thoại của bạn!"
            noti.configNotificationError(mess)
            input_new_phone.style.borderBottom = '1px solid red'
            return
        } else {
            input_new_phone.style.borderBottom = '1px solid rgb(45, 130, 255)'
        }

        if (input_new_address.value.trim() == '' || !input_new_address.value) {
            let mess = "Hãy nhập địa chỉ của bạn!"
            noti.configNotificationError(mess)
            input_new_address.style.borderBottom = '1px solid red'
            return
        } else {
            input_new_address.style.borderBottom = '1px solid rgb(45, 130, 255)'
        }

        let dataFormAddress = getFormAddInForAddress(input_new_name, input_new_phone, input_new_address)
        console.log(dataFormAddress)

        // call api để add address
    })
}

export function getInformationClient(idClient) {

    if (!idClient) {
        console.error('No id client')
        return null
    }

    const name = document.querySelector('#name')
    const male = document.querySelector('#male')
    const female = document.querySelector('#female')
    const phone = document.querySelector('#phone')
    const email = document.querySelector('#email')
    const address = document.querySelector('#address')

    const user_text = document.querySelector('#user-text')
    const text_acc = document.querySelector('#text-acc')
    const text_code_client = document.querySelector('#code-client')

    fetch('http://localhost:8083/khachhang/detail/' + idClient)
        .then((response) => {
            return response.json()
        }).then((data) => {
            user_text.textContent = data.ten[0].toUpperCase()
            text_acc.textContent = data.ten[0].toUpperCase()
            text_code_client.textContent = data.ma

            name.value = data.ten
            phone.value = data.sdt
            address.value = data.diaChi
            email.value = data.email
            data.gioiTinh == 1 ? male.checked = true : female.checked = true
        }).catch((e) => {
            console.error(e)
        })
}

export function getFormAddInForAddress({ value: newName }, { value: newPhone }, { value: newAddress }) {
    return { newName, newPhone, newAddress };
}

export function getDataFromClient(idClient) {
    let name = document.querySelector('#name').value
    let gender = document.querySelector('input[name="gioitinh"]:checked').value
    let phone = document.querySelector('#phone').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#address').value

    return {
        id: idClient,
        ten: name,
        email: email,
        gioiTinh: gender,
        sdt: phone,
        diaChi: address
    }
}