import * as noti from './notification_config.js'

export async function getDataOrder(callback) {
    const url = 'http://localhost:8083/hoadon/getHDbyClientSDT?sdt='
    const input_sdt = document.querySelector('#find-order').value

    if (input_sdt.trim() == '') {
        noti.configNotificationError('Số điện thoại đang trống')
        return
    }

    try {
        const response = await fetch(url + input_sdt)

        if (response.status === 200) {
            const data = await response.json()
            callback(data)
        } else {
            const mess = await response.text()
            noti.configNotificationError(mess)
        }
    } catch (err) {
        console.log("Lỗi: " + err)
    }
}

export async function getDataOrderDetails(idHD, callback) {
    try {
        const response = await fetch('http://localhost:8083/chitiethoadon/getAllByOrderId?idHD=' + idHD)

        if (response.status === 200) {
            callback(await response.json())
        } else {
            const mess = await response.text()
            noti.configNotificationError(mess)
        }
    } catch {
        console.log("Lỗi khi lấy hdDetail")
    }
}

export async function getDataOrderByOrderId(idHD, callback) {
    try {
        const response = await fetch('http://localhost:8083/hoadon/detail?idHD=' + idHD)

        if (response.status === 200) {
            callback(await response.json())
        } else {
            const mess = await response.text()
            noti.configNotificationError(mess)
        }
    } catch {
        console.log("Lỗi khi lấy hd")
    }
}