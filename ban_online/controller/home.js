import * as homeService from "./service/home_service.js"

window.homeCtrl = function ($scope, $http) {

    $scope.noDataNewProduct = true

    homeService.handleShoWHiddenFormFilter()

    // check discount
    let isDiscount = true;
    let elementsMap = [
        { elements: document.getElementsByClassName('price'), addClass: 'text-discount', toggleClass: false },
        { elements: document.getElementsByClassName('price-discount'), addClass: 'hidden', toggleClass: true },
        { elements: document.getElementsByClassName('ribbon-wrapper'), addClass: 'hidden', toggleClass: true }
    ];

    elementsMap.forEach(({ elements, addClass, toggleClass }) => {
        Array.from(elements).forEach(element => {
            if (isDiscount) {
                toggleClass ? element.classList.remove(addClass) : element.classList.add(addClass);
            } else {
                toggleClass ? element.classList.add(addClass) : element.classList.remove(addClass);
            }
        });
    });


    //check input price
    homeService.handleCheckInputFindPrice()

    // // ghep api page
    $http.get('http://localhost:8080/san-pham/getSanPham-online')
        .then((response) => {
            const data = response.data.data
            const totalPages = response.data.total

            $scope.listSP = data

            homeService.generatePagination(1, totalPages)
        }).catch((err) => {
            console.error(err)
            $scope.noData = true
        })

    // chuyen trang
}
