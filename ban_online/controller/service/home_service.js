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
            toggleClass ? element.classList.remove(addClass) : element.classList.add(addClass);
        });
    });
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
                <a class="page-link" href="#">${text}</a>
            </li>`;
};

export function generatePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');

    if (totalPages <= 1) return;

    if (!paginationContainer.innerHTML) {

        paginationContainer.innerHTML += createPageItem('prev', '&laquo;', currentPage === 1);
        paginationContainer.innerHTML += createPageItem(1, 1, false, currentPage === 1);

        if (currentPage > 3) paginationContainer.innerHTML += createPageItem('dots', '...', true);

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            paginationContainer.innerHTML += createPageItem(i, i, false, i === currentPage);
        }

        if (currentPage < totalPages - 2) paginationContainer.innerHTML += createPageItem('dots', '...', true);

        paginationContainer.innerHTML += createPageItem(totalPages, totalPages, false, currentPage === totalPages);

        paginationContainer.innerHTML += createPageItem('next', '&raquo;', currentPage === totalPages);
    } else {
        const prevItem = paginationContainer.querySelector('.page-item:first-child');
        prevItem.classList.toggle('disabled', currentPage === 1);

        const pageItems = paginationContainer.querySelectorAll('.page-item');
        pageItems.forEach(item => {
            const page = parseInt(item.textContent);
            if (!isNaN(page)) {
                item.classList.toggle('active-page', page === currentPage);
            }
        });

        const nextItem = paginationContainer.querySelector('.page-item:last-child');
        nextItem.classList.toggle('disabled', currentPage === totalPages);
    }
}