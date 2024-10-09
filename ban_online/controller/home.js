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

    let isDiscount = true
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
}
