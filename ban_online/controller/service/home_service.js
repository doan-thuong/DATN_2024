import * as noti from './notification_config.js'

export function handleShoWHiddenFormFilter() {
    let btn_filter = document.querySelector("#btn-loc")
    let form_filter = document.querySelector("#filter")

    btn_filter.addEventListener('click', function (event) {
        event.preventDefault()
        let dpl = form_filter.style

        dpl.display == "none" ? dpl.display = "flex" : dpl.display = "none"
    })
}

export function applyClassBasedOnDiscount(elementsMap) {
    elementsMap.forEach(({ elements, addClass, toggleClass }) => {
        Array.from(elements).forEach(element => {
            toggleClass ? element.classList.remove(addClass) : element.classList.add(addClass)
        })
    })
}

export function handleCheckInputFindPrice() {
    const prc_min = document.querySelector('#price-min')
    const prc_max = document.querySelector('#price-max')

    prc_min.addEventListener('input', () => {
        prc_min.value = prc_min.value.replace(/\D/g, '')

        if (parseInt(prc_min.value) > parseInt(prc_max.value)) {
            prc_min.style.border = '1px solid red'
        } else {
            prc_min.style.border = '.5px solid rgb(130, 205, 255)'
        }
    })
    prc_max.addEventListener('input', () => {
        prc_max.value = prc_max.value.replace(/\D/g, '')

        if (parseInt(prc_max.value) < parseInt(prc_min.value)) {
            prc_max.style.border = '1px solid red'
        } else {
            prc_max.style.border = '.5px solid rgb(130, 205, 255)'
        }
    })
}

function createPageItem(page, text = page, isDisabled = false, isActive = false) {
    return `<li class="page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active-page' : ''}">
                ${text}
            </li>`
}

export function generatePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination')

    if (totalPages <= 1) return

    if (!paginationContainer.innerHTML) {

        paginationContainer.innerHTML += createPageItem('prev', '&laquo', currentPage === 1)
        paginationContainer.innerHTML += createPageItem(1, 1, false, currentPage === 1)

        if (currentPage > 3) paginationContainer.innerHTML += createPageItem('dots', '...', true)

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            paginationContainer.innerHTML += createPageItem(i, i, false, i === currentPage)
        }

        if (currentPage < totalPages - 2) paginationContainer.innerHTML += createPageItem('dots', '...', true)

        paginationContainer.innerHTML += createPageItem(totalPages, totalPages, false, currentPage === totalPages)

        paginationContainer.innerHTML += createPageItem('next', '&raquo', currentPage === totalPages)
    } else {
        const prevItem = paginationContainer.querySelector('.page-item:first-child')
        prevItem.classList.toggle('disabled', currentPage === 1)

        const pageItems = paginationContainer.querySelectorAll('.page-item')
        pageItems.forEach(item => {
            const page = parseInt(item.textContent)
            if (!isNaN(page)) {
                item.classList.toggle('active-page', page === currentPage)
            }
        })

        const nextItem = paginationContainer.querySelector('.page-item:last-child')
        nextItem.classList.toggle('disabled', currentPage === totalPages)
    }
}

export function getDataForFilter() {
    const textFind = document.querySelector('#text-find')
    const categoryVitamin = document.querySelector('#vitamin')
    const categoryImproveSkin = document.querySelector('#cai-thien-da')
    const categoryHealthCare = document.querySelector('#cham-soc-suc-khoe')
    const categoryOther = document.querySelector('#khac')
    const priceMin = document.querySelector('#price-min')
    const priceMax = document.querySelector('#price-max')

    const filters = {
        textFind: textFind.value.trim() || null,
        vitamin: categoryVitamin.checked || false,
        improveSkin: categoryImproveSkin.checked || false,
        healthCare: categoryHealthCare.checked || false,
        other: categoryOther.checked || false,
        priceMin: priceMin.value.trim() || null,
        priceMax: priceMax.value.trim() || null
    }

    const isEmptyFilter = Object.values(filters).every(value => value == null || value == false)

    if (isEmptyFilter) {
        return { default: true }
    }

    return filters
}

export function handleClickButtonFind(callback) {
    const btn_find = document.querySelector('#btn-find')

    btn_find.addEventListener('click', async (e) => {
        e.preventDefault()

        const checkboxes = document.querySelectorAll('.select-category input[type="checkbox"]')
        const selectedValues = []
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedValues.push(checkbox.value)
            }
        })

        const resultRequest = getDataForFilter()

        if (resultRequest.default) {
            noti.configNotificationWarning('Hãy nhập từ khóa để tìm kiếm')
        } else {
            let searchText = resultRequest.textFind
            let danhMuc = selectedValues
            let giaMin = resultRequest.priceMin
            let giaMax = resultRequest.priceMax

            const params = new URLSearchParams()

            if (searchText) {
                params.append('searchText', searchText)
            }
            if (giaMin) {
                params.append('giaMin', giaMin)
            }
            if (giaMax) {
                params.append('giaMax', giaMax)
            }
            if (danhMuc && danhMuc.length > 0) {
                params.append('danhMuc', danhMuc.join(','))
            }

            const callApiSearch = await fetch(`http://localhost:8083/san-pham/tim-kiem?${params.toString()}`)
            if (callApiSearch.status != 200) {
                if (callApiSearch.status == 404) {
                    noti.configNotificationWarning('Không tìm thấy sản phẩm phù hợp')
                    return
                }
                noti.configNotificationError('Lỗi tìm kiếm')
                return
            } else {
                const data = await callApiSearch.json()
                console.log(data)
                callback(data)
            }
        }
    })
}