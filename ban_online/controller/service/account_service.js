export function handleCloseForm() {
    const overlay = document.querySelector('.overlay-address')
    const form_add_address = document.querySelector('.form-add-new-address')
    const btn_cancel = document.querySelector('.bx-collapse')

    const closeForm_address = () => {
        if (overlay.style.display == 'block') {
            overlay.style.display = 'none'
            form_add_address.style.display = 'none'
        }
    }

    overlay.addEventListener('click', () => {
        closeForm_address()
    })

    btn_cancel.addEventListener('click', () => {
        closeForm_address()
    })
}

export function handleAddNewAddress() {
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

    content_acc.forEach(content => {
        content.style.display = 'none'
    })

    menu_acc[0].classList.add('select-menu')
    content_acc[0].style.display = 'grid'

    menu_acc.forEach((menu, index) => {
        menu.addEventListener('click', () => {
            content_acc.forEach(content => {
                content.style.display = 'none'
            })
            content_acc[index].style.display = 'grid'

            menu_acc.forEach(menu => {
                menu.classList.remove('select-menu')
            })
            menu.classList.add('select-menu')
        })
    })
}