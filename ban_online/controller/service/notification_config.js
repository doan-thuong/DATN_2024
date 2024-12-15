let isTimeoutId

export function configNotificationError(message) {
    const error_message = document.querySelector('.notification-error')
    const error_text = document.querySelector('#content-error')
    const progress_error = document.querySelector('.progress-bar-error')

    if (isTimeoutId) {
        clearTimeout(isTimeoutId)
        progress_error.style.width = '0%'
        error_message.style.display = 'none'
    }

    error_message.style.display = 'flex'
    error_text.textContent = message

    progress_error.style.width = '0%'
    setTimeout(() => {
        progress_error.style.width = '100%'
    }, 100)

    isTimeoutId = setTimeout(() => {
        error_message.style.display = 'none'
        progress_error.style.width = '0%'
    }, 3000)
}

export function configNotificationSuccess(message) {
    const success_message = document.querySelector('.notification-success')
    const success_text = document.querySelector('#content-success')
    const progress_success = document.querySelector('.progress-bar-success')

    if (isTimeoutId) {
        clearTimeout(isTimeoutId)
        progress_success.style.width = '0%'
        success_message.style.display = 'none'
    }

    success_message.style.display = 'flex'
    success_text.textContent = message

    progress_success.style.width = '0%'
    setTimeout(() => {
        progress_success.style.width = '100%'
    }, 100)

    isTimeoutId = setTimeout(() => {
        success_message.style.display = 'none'
        progress_success.style.width = '0%'
    }, 3000)
}

export function configNotificationWarning(message) {
    const warning_message = document.querySelector('.notification-warning')
    const warning_text = document.querySelector('#content-warning')
    const progress_warning = document.querySelector('.progress-bar-warning')

    if (isTimeoutId) {
        clearTimeout(isTimeoutId)
        progress_warning.style.width = '0%'
        warning_message.style.display = 'none'
    }

    warning_message.style.display = 'flex'
    warning_text.textContent = message

    progress_warning.style.width = '0%'
    setTimeout(() => {
        progress_warning.style.width = '100%'
    }, 100)

    isTimeoutId = setTimeout(() => {
        warning_message.style.display = 'none'
        progress_warning.style.width = '0%'
    }, 3000)
}

export function getConfirm(title, mess, callback) {
    const popup = document.querySelector('.popup-confirm')
    const btn_confirm = document.querySelector('#confirm')
    const btn_cancel = document.querySelector('#cancel')
    const title_cp = document.querySelector('#text-popup')
    const text_cp = document.querySelector('#text-content-popup')
    const overlay = document.querySelector("#over-lay-layout")
    let checkConfirm = false

    // if (popup.style.display == 'none') {
    popup.style.display = 'flex'
    overlay.style.display = 'block'
    // }

    if (!title) {
        title_cp.textContent = title
    }

    if (!mess) {
        text_cp.textContent = mess
    }

    btn_confirm.removeEventListener('click', () => handleConfirmClick(true))

    btn_cancel.removeEventListener('click', () => handleConfirmClick(false))

    btn_confirm.addEventListener('click', () => { handleConfirmClick(true) })

    btn_cancel.addEventListener('click', () => { handleConfirmClick(false) })

    const handleConfirmClick = (confirm) => {
        checkConfirm = confirm
        popup.style.display = 'none'
        overlay.style.display = 'none'
        callback(checkConfirm)
    }
}

export function getWarningMessage(mess, callback) {
    const popup = document.querySelector('.popup-warning')
    const text_warning = document.querySelector("#text-warning")
    const btn_warning = document.querySelector("#confirm-warning")
    const btn_cancel_w = document.querySelector("#cancel-warning")
    const overlay = document.querySelector("#over-lay-layout")

    let checkConfirm = false

    popup.style.display = 'flex'
    overlay.style.display = 'block'

    text_warning.textContent = mess

    btn_warning.removeEventListener('click', () => handleConfirmClick(true))

    btn_cancel_w.removeEventListener('click', () => handleConfirmClick(false))

    btn_warning.addEventListener('click', () => { handleConfirmClick(true) })

    btn_cancel_w.addEventListener('click', () => { handleConfirmClick(false) })

    const handleConfirmClick = (confirm) => {
        checkConfirm = confirm
        popup.style.display = 'none'
        overlay.style.display = 'none'
        callback(checkConfirm)
    }
}