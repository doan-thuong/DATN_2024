import * as homeService from "./service/home_service.js"

window.homeCtrl = function ($scope, $http, $timeout) {

    $scope.noDataNewProduct = true
    $scope.checkFind = false

    homeService.handleShoWHiddenFormFilter()

    //check input price
    homeService.handleCheckInputFindPrice()

    homeService.handleClickButtonFind(check => {
        $scope.$apply(() => {
            $scope.checkFind = check
        })
    })

    // // ghep api page
    $http.get('http://localhost:8083/san-pham/getSanPham-online')
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
    $scope.handleCallAPIPage = function () {
        const pageIndex = document.querySelectorAll('.page-item')

        if (pageIndex.length == 0) {
            setTimeout($scope.handleCallAPIPage, 800)
            return
        }

        pageIndex.forEach((item, ind) => {
            item.addEventListener('click', () => {
                let page = item.innerText

                console.log(ind)

                if (Number.isInteger(parseInt(page))) {
                    $http.get("http://localhost:8083/san-pham/getSanPham-online?page=" + (parseInt(page) - 1))
                        .then((response) => {
                            const data = response.data
                            const total = response.data.total

                            $scope.listSP = data.data

                            homeService.generatePagination(ind, total)
                        })
                        .catch((err) => {
                            console.error("Error getting data:", err)
                        })
                }
            })
        })
    }

    $scope.handleCallAPIPage()

    homeService.callAPIgetDataFilter()
}
