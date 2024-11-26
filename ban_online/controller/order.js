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

        function attachOrderClickHandler() {
            const btnOrder = document.querySelectorAll(".text-detail-order")

            btnOrder.forEach(ele => {
                ele.addEventListener("click", async () => {
                    const idOrd = ele.dataset.orderId

                    try {
                        const order = await orderService.getDataOrderByOrderId(idOrd)
                        const orderDetails = await orderService.getDataOrderDetails(idOrd)

                        let tongTiens = 0
                        for (const cthd of orderDetails) {
                            tongTiens += cthd.soLuong * cthd.giaSauGiam
                        }

                        $scope.$apply(() => {
                            $scope.detailOrder = order
                            $scope.listOdDtl = orderDetails
                            $scope.tongTienDtl = tongTiens
                        })

                        mainOdDtl.style.display = 'block'
                        overLayDtl.style.display = 'block'
                    } catch (err) {
                        console.error("Error fetching order data:", err)
                    }
                })
            })
        }

        attachOrderClickHandler()

        // Sử dụng MutationObserver để theo dõi các thay đổi trong DOM
        const observer = new MutationObserver(() => {
            attachOrderClickHandler()
        })

        // Theo dõi toàn bộ body hoặc phần tử cha cụ thể
        observer.observe(document.body, { childList: true, subtree: true })
    })

    $scope.closeFormOdDtl = function () {
        mainOdDtl.style.display = 'none'
        overLayDtl.style.display = 'none'
    }
}