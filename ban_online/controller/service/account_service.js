import * as noti from "./notification_config.js"

export function handleCloseForm() {
    const overlay = document.querySelector('.overlay-address')
    const form_add_address = document.querySelector('.form-add-new-address')
    const btn_cancel = document.querySelector('.bx-collapse')
    const loader = document.querySelector('.loader')
    const detailOd = document.querySelector('.detail-order')

    const closeForm_address = () => {
        if (overlay.style.display == 'block') {
            overlay.style.display = 'none'
            form_add_address.style.display = 'none'
            loader.style.display = 'none'
            detailOd.style.display = 'none'
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

export function handleAddNewAddress(callback) {
    const input_new_name = document.querySelector("#name-new-address")
    const input_new_phone = document.querySelector("#phone-new-address")
    const input_new_address = document.querySelector("#address-new-address")
    const btn_new_submit = document.querySelector("#btn-new-submit")

    const overlay = document.querySelector('.overlay-address')
    const form_add_address = document.querySelector('.form-add-new-address')

    if (!input_new_name || !input_new_phone || !input_new_address) {
        console.error('No card name or phone or address')
        return
    }

    btn_new_submit.addEventListener('click', async (e) => {
        e.preventDefault()

        if (input_new_name.value.trim() == '' || !input_new_name.value) {
            let mess = "Hãy nhập tên của bạn!"
            noti.configNotificationError(mess)
            input_new_name.style.borderBottom = '1px solid red'
            return
        } else if (input_new_name.value.trim().length > 255) {
            let mess = "Tên đã quá 255 ký tự!"
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
        } else if (input_new_phone.value.trim().length != 10) {
            let mess = "Số điện thoại phải có 10 chữ số!"
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
        } else if (input_new_address.value.trim().length > 255) {
            let mess = "Địa chỉ đã quá 255 ký tự!"
            noti.configNotificationError(mess)
            input_new_address.style.borderBottom = '1px solid red'
            return
        } else {
            input_new_address.style.borderBottom = '1px solid rgb(45, 130, 255)'
        }

        let dataFormAddress = getFormAddInForAddress(input_new_name, input_new_phone, input_new_address)

        try {
            const res = await fetch('https://localhost:8083/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFormAddress)
            })

            if (res == 200) {
                callback(dataFormAddress)
                noti.configNotificationSuccess('Thêm thành công!')
                form_add_address.display = 'none'
                overlay.style.display = 'none'
            } else {
                noti.configNotificationError('Thêm thất bại! (' + res.status + ')')
                form_add_address.display = 'none'
                overlay.style.display = 'none'
            }
        } catch (e) {
            noti.configNotificationError('Thêm thất bại!')
            form_add_address.display = 'none'
            overlay.style.display = 'none'
        }
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

            sessionStorage.setItem('user', JSON.stringify(data))

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

export function getDataFromClient() {
    let name = document.querySelector('#name').value
    let gender = document.querySelector('input[name="gioitinh"]:checked').value
    let phone = document.querySelector('#phone').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#address').value

    return {
        ten: name,
        email: email,
        gioiTinh: gender,
        sdt: phone,
        diaChi: address
    }
}

export function updateClient(idClient) {
    const btn_save_changes = document.querySelector('#save-changes')

    btn_save_changes.addEventListener('click', async function () {
        const overlay = document.querySelector('.overlay-address')
        const loading = document.querySelector('.loader')
        let data, status

        overlay.style.display = 'block'
        loading.style.display = 'block'
        try {
            const response = await fetch('http://localhost:8083/khachhang/updateOnline/' + idClient,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(getDataFromClient())
                })
            data = await response.text()
            status = response.status

        } catch {
            er => { console.error(er) }
        } finally {
            setTimeout(() => {
                overlay.style.display = 'none'
                loading.style.display = 'none'

                switch (status) {
                    case 200:
                        noti.configNotificationSuccess(data)
                        break
                    case 400:
                    case 404:
                        noti.configNotificationError(data)
                        break
                    case 500:
                        noti.configNotificationError('Internal Server Error')
                        break
                    default:
                        console.warn("Unhandled status:", status)
                }
            }, 1000)
        }
    })
}

export async function getVoucherClient(idClient, callback) {
    const response = await fetch('http://localhost:8083/chi-tiet-voucher/getByIdKhach?idKh=' + idClient)

    if (response.status == 200) {
        const data = await response.json()
        callback(data)
    } else {
        console.error(await response.text())
    }
}

export async function getOrderByClient(idClient, callback) {
    const response = await fetch('http://localhost:8083/hoadon/getHDbyClientID?idKH=' + idClient)

    if (response.status == 200) {
        const data = await response.json()

        for (const hd of data) {
            const result = await fetch("http://localhost:8083/chitiethoadon/getAllByOrderId?idHD=" + hd.id)

            if (result.status != 200) {
                noti.configNotificationError(await result.text())
                return
            }

            const dataDetail = await result.json()
            let tongtien = 0

            Array.from(dataDetail).forEach(ele => {
                tongtien += ele.soLuong * ele.giaSauGiam
            })

            hd.tongTien = tongtien
        }

        callback(data)
    } else {
        const mess = await response.text()
        noti.configNotificationError(mess)
    }
}

export function filterVouchers(listCachedVC, query, callback) {
    if (!listCachedVC) {
        return
    }
    if (!query.trim()) {
        callback(listCachedVC)
        return
    }

    let queryFind = query.toLowerCase()

    var listFind = listCachedVC.filter(voucher =>
        voucher.ten.toLowerCase().includes(queryFind) ||
        voucher.ma.toLowerCase().includes(queryFind)
    )
    callback(listFind)
}

export function handleFormCancelOrder(idHD, trangThai) {
    const btn_cancel_order = document.querySelector('.btn-cancel-order')
    const contReason = document.querySelector('.content-reason')
    const textReason = document.querySelector('#inp-reason')

    if (trangThai != 1) {
        btn_cancel_order.style.display = 'none'
        contReason.style.display = 'none'
        return
    }

    try {
        btn_cancel_order.addEventListener('click', async () => {

            if (contReason.style.display == 'none' || contReason.style.display == "") {
                contReason.style.display = 'flex'
            } else {
                let valueReason = textReason.value
                if (valueReason.trim().length > 255) {
                    noti.configNotificationError('Lý do hủy đơn hàng phải dưới 255 ký tự!')
                    return
                }
                if (valueReason.trim() == "") {
                    noti.configNotificationError('Vui lòng nhập lý do hủy đơn hàng!')
                    return
                }

                //sẽ call api để gửi thông tin hủy đơn
                let request = {
                    idHD: idHD,
                    reason: valueReason
                }
                let url = 'http//localhost:8083/hoadon/huyHD'

                let response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                })

                if (response.status == 200) {
                    noti.configNotificationSuccess('Hủy đơn hàng thành công!')
                    contReason.style.display = 'none'
                } else {
                    let text = await response.text()
                    noti.configNotificationError('Hủy đơn hàng thất bại! (' + text + ')')
                }
            }
        })
    } catch (err) {
        //
    }
}

export function logOut() {
    const logout = document.querySelector('#logout')

    logout.addEventListener('click', () => {
        let title = "Đăng xuất"
        let content = "Bạn có chắc muốn đăng xuất?"
        noti.getConfirm(title, content, (check) => {
            if (check) {
                // sessionStorage.removeItem('check_account')
                // sessionStorage.removeItem('user')
                sessionStorage.clear()
                window.location.hash = '#!home'
            }
        })
    })
}