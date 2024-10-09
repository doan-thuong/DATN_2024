window.homeCtrl = function ($scope) {
    const url = ""
    $scope.title = "Home"

    let btn_filter = document.querySelector("#btn-loc")
    let form_filter = document.querySelector("#filter")

    btn_filter.addEventListener('click', function (event) {
        event.preventDefault()
        let dpl = form_filter.style

        dpl.display == "none" ? dpl.display = "flex" : dpl.display = "none"
    })

    let isDiscount = false
    let priceElements = document.getElementsByClassName('price')
    let discountElements = document.getElementsByClassName('price-discount')
    let ribbonElements = document.getElementsByClassName('ribbon-wrapper')

    Array.from(priceElements).forEach(function (priceElement) {
        if (isDiscount) {
            priceElement.classList.add('text-discount')
        } else {
            priceElement.classList.remove('text-discount')
        }
    })

    Array.from(discountElements).forEach(function (discountElement) {
        if (isDiscount) {
            discountElement.classList.remove('hidden')
        } else {
            discountElement.classList.add('hidden')
        }
    })

    Array.from(ribbonElements).forEach(function (ribbonElement) {
        if (isDiscount) {
            ribbonElement.classList.remove('hidden')
        } else {
            ribbonElement.classList.add('hidden')
        }
    })

    const prc_min = document.querySelector('#price-min')
    const prc_max = document.querySelector('#price-max')

    prc_min.addEventListener('input', (e) => {
        prc_min.value = prc_min.value.replace(/\D/g, '')

        if (parseInt(prc_min.value) > parseInt(prc_max.value)) {
            prc_min.style.border = '1px solid red'
        } else {
            prc_min.style.border = '.5px solid rgb(130, 205, 255)'
        }
    })
    prc_max.addEventListener('input', (e) => {
        prc_max.value = prc_max.value.replace(/\D/g, '')

        if (parseInt(prc_max.value) < parseInt(prc_min.value)) {
            prc_max.style.border = '1px solid red'
        } else {
            prc_max.style.border = '.5px solid rgb(130, 205, 255)'
        }
    })
}
