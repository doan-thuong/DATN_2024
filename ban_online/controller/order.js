import * as orderService from './service/order_service.js'

window.orderCtrl = function ($scope) {
    $scope.orders = []

    const mainOdDtl = document.querySelector(".detail-order")
    const overLayDtl = document.querySelector(".over-lay-order")


    const btnSearch = document.querySelector("#button-search-order")
    btnSearch.addEventListener("click", () => {
        orderService.getDataOrder((orders => {
            $scope.$apply(() => {
                $scope.orders = orders
            })
        }))

        let btnOrder = document.querySelectorAll(".text-detail-order")

        if (btnOrder.length > 0) {
            btnOrder.forEach(ele => {
                ele.addEventListener("click", () => {
                    let idOrd = ele.dataset.orderId

                    orderService.getDataOrderByOrderId(idOrd, (od) => {
                        $scope.$apply(() => {
                            $scope.detailOrder = od
                        })
                    })

                    orderService.getDataOrderDetails(idOrd, (odDtl) => {
                        $scope.$apply(() => {
                            $scope.listOdDtl = odDtl
                        })
                    })

                    mainOdDtl.style.display = 'block'
                    overLayDtl.style.display = 'block'
                })
            })
        } else {
            setTimeout(() => {
                btnOrder = document.querySelectorAll(".text-detail-order")
                btnOrder.forEach(ele => {
                    ele.addEventListener("click", () => {
                        let idOrd = ele.dataset.orderId

                        orderService.getDataOrderByOrderId(idOrd, (od) => {
                            $scope.$apply(() => {
                                $scope.detailOrder = od
                            })
                        })

                        orderService.getDataOrderDetails(idOrd, (odDtl) => {
                            $scope.$apply(() => {
                                $scope.listOdDtl = odDtl
                            })
                        })

                        mainOdDtl.style.display = 'block'
                        overLayDtl.style.display = 'block'
                    })
                })
            }, 1000)
        }
    })

    $scope.closeFormOdDtl = function () {
        mainOdDtl.style.display = 'none'
        overLayDtl.style.display = 'none'
    }
}