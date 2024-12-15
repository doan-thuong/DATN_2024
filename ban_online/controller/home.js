import * as homeService from "./service/home_service.js"

window.homeCtrl = function ($scope, $http, $location) {

    let isS = $location.search().isS
    $scope.noDataNewProduct = true
    $scope.checkFind = false
    const user = JSON.parse(sessionStorage.getItem('user')) || "?"
    const textAcc = document.querySelector('#text-acc')
    if (user != '?') {
        textAcc.textContent = user.ten[0]
    } else {
        textAcc.textContent = '?'
    }

    let isSearch = JSON.parse(sessionStorage.getItem('formSearch'))
    if (isSearch && !isS) {
        isSearch.isBack = false
        sessionStorage.setItem('formSearch', JSON.stringify(isSearch))
    }

    homeService.handleShoWHiddenFormFilter()

    //check input price
    homeService.handleCheckInputFindPrice()

    function setDiscountStatus(products) {
        const currentDate = new Date();
        products.forEach(item => {
            const { giaGiam, ngayBatDau, ngayKetThuc } = item;
            item['isDiscount'] = giaGiam && new Date(ngayBatDau) <= currentDate && currentDate <= new Date(ngayKetThuc);
        })
    }

    homeService.handleClickButtonFind(data => {
        setDiscountStatus(data.result)
        homeService.generatePagination(1, data.totalPages)
        $scope.$apply(() => {
            $scope.listSP = data.result
        })
    })


    let url = 'http://localhost:8083/san-pham/tim-kiem'
    if (isS && isSearch) {
        if (isSearch.isBack) {
            url += '?' + isSearch.value
        }
    }
    $http.get(url)
        .then((response) => {
            const data = response.data.result
            const totalPages = response.data.totalPages

            setDiscountStatus(data)

            $scope.listSP = data

            homeService.generatePagination(1, totalPages)
        }).catch((err) => {
            $scope.noData = true
        })

    // chuyen trang
    let currentPage = 0
    $scope.handleCallAPIPage = function () {
        const paginationContainer = document.querySelector('.pagination')

        if (!paginationContainer) {
            setTimeout($scope.handleCallAPIPage, 800);
            return;
        }

        paginationContainer.addEventListener('click', (event) => {
            const item = event.target;

            if (!item.classList.contains('page-item')) {
                return
            }

            let page = item.innerText

            if (page == '«') {
                page = currentPage - 1
            } else if (page == '»') {
                page = currentPage + 1
            }

            currentPage = parseInt(page)

            let search = JSON.parse(sessionStorage.getItem('formSearch'))
            let param = ''
            let url = "http://localhost:8083/san-pham/tim-kiem?page=" + (parseInt(page) - 1)

            if (search || isS) {
                if (search.isBack || isS) {
                    param = search.value
                    url += '&' + param
                }
            }

            $http.get(url)
                .then((response) => {
                    const data = response.data.result
                    const total = response.data.totalPages

                    setDiscountStatus(data)
                    homeService.generatePagination(parseInt(page), total)

                    $scope.listSP = data
                })
                .catch((err) => {
                    console.error("Error getting data:", err)
                })
        })
    }

    $scope.handleCallAPIPage()
}
