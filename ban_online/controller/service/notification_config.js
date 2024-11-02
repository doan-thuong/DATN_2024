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
    const error_message = document.querySelector('.notification-success')
    const error_text = document.querySelector('#content-success')
    const progress_error = document.querySelector('.progress-bar-success')

    error_message.style.display = 'flex'
    error_text.textContent = message

    progress_error.style.width = '0%'
    setTimeout(() => {
        progress_error.style.width = '100%'
    }, 100)

    setTimeout(() => {
        error_message.style.display = 'none'
        progress_error.style.width = '0%'
    }, 2000)
}