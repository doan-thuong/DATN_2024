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