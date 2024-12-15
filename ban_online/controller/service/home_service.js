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

    paginationContainer.innerHTML = ''
    if (totalPages <= 1) {
        return
    }

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
    const priceMin = document.querySelector('#price-min')
    const priceMax = document.querySelector('#price-max')

    const filters = {
        searchText: textFind.value.trim() || null,
        danhMuc: [
            categoryVitamin.checked ? categoryVitamin.value : null,
            categoryImproveSkin.checked ? categoryImproveSkin.value : null,
            categoryHealthCare.checked ? categoryHealthCare.value : null,
        ].filter(value => value !== null), // Loại bỏ các giá trị null
        giaMin: priceMin.value.trim() || null,
        giaMax: priceMax.value.trim() || null,
    }

    const isEmptyFilter = Object.values(filters).every(value =>
        value == null || (Array.isArray(value) && value.length === 0)
    )

    if (isEmptyFilter) {
        return '' // Trả về chuỗi rỗng nếu không có bộ lọc nào
    }

    let query = ''

    if (filters.searchText) {
        query += `searchText=${encodeURIComponent(filters.searchText)}&`
    }
    if (filters.danhMuc.length > 0) {
        query += filters.danhMuc.map(dm => `danhMuc=${encodeURIComponent(dm)}`).join('&') + '&'
    }
    if (filters.giaMin) {
        query += `giaMin=${encodeURIComponent(filters.giaMin)}&`
    }
    if (filters.giaMax) {
        query += `giaMax=${encodeURIComponent(filters.giaMax)}&`
    }

    return query.endsWith('&') ? query.slice(0, -1) : query
}

export function handleClickButtonFind(callback) {
    const btn_find = document.querySelector('#btn-find')

    btn_find.addEventListener('click', async (e) => {
        e.preventDefault()

        const resultRequest = getDataForFilter()

        var formSearch = {}
        formSearch['value'] = resultRequest
        formSearch['isBack'] = true
        sessionStorage.setItem('formSearch', JSON.stringify(formSearch))

        const callApiSearch = await fetch(`http://localhost:8083/san-pham/tim-kiem?${resultRequest}`)
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
    })
}