import * as homeService from "./service/home_service.js"

window.homeCtrl = function ($scope, $http, $timeout) {

    $scope.noDataNewProduct = true
    $scope.checkFind = false
    const user = JSON.parse(sessionStorage.getItem('user')) || "?"
    const textAcc = document.querySelector('#text-acc')
    if (user != '?') {
        textAcc.textContent = user.ten[0]
    } else {
        textAcc.textContent = '?'
    }

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
            const data = response.data.content
            console.log(response)
            const totalPages = response.data.totalPages

            const currentDate = new Date()

            data.forEach((item) => {
                if (item.giaGiam === null) {
                    item.isDiscount = false
                } else {
                    const ngayBatDau = new Date(item.ngayBatDau)
                    const ngayKetThuc = new Date(item.ngayKetThuc)
                    if (currentDate >= ngayBatDau && currentDate <= ngayKetThuc) {
                        item.isDiscount = true
                    } else {
                        item.isDiscount = false
                    }
                }
            })

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
