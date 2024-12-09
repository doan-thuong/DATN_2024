import * as inforService from './service/information_service.js'
import * as evalService from './service/evaluate_service.js'
import * as noti from './service/notification_config.js'

window.informationCtrl = function ($scope, $http, $location) {

    const sp = $location.search().sp
    const check_account = sessionStorage.getItem('check_account')

    let api_getSPCT = $http.get('http://localhost:8083/chi-tiet-san-pham/getAllCTSP?idSP=' + sp)
    let api_getSP = $http.get('http://localhost:8083/san-pham/detail?idSP=' + sp)

    var data
    let index_category = 0

    // get data spct
    api_getSPCT
        .then(function (response) {
            data = response.data
            console.log(data)

            if (!data) return

            $scope.categorys = []
            $scope.soLuong = data[0].soLuong
            $scope.giaBanDau = Number(data[0].gia) + Number(data[0].tienGiam)
            $scope.gia = data[0].gia
            $scope.idCTSP = data[0].id
            $scope.listAnh = []
            data.forEach(item => {
                $scope.listAnh.push(item.linkAnhList[0])
            })

            evalService.getEvaluateByIdCTSP(data[0].id, (dataEval) => {
                let starTotal = 0

                dataEval.forEach((itemEval) => {
                    starTotal += itemEval.sao
                })

                $scope.$apply(() => {
                    $scope.listEvaluate = dataEval

                    $scope.soLuot = dataEval.length
                    $scope.danhGia = starTotal / dataEval.length
                })
            })

            data.forEach((ctps) => {
                $scope.categorys.push(ctps.soNgaySuDung)
            })

            inforService.handleChangeTotal($scope.soLuong)

            delay_spct
        })
        .catch((err) => {
            if (err.status == 400) {
                noti.configNotificationError(err.data)
            }
        })

    // delay để lấy data cho html
    let delay_spct = setTimeout(function () {
        const btn_categorys = document.querySelectorAll(".btn-category")
        const img_overlay = document.querySelectorAll(".overlay")
        const review_img = document.querySelector("#review-image-product")
        const img_category = document.querySelectorAll(".img-category")

        if (btn_categorys.length == 0) return

        btn_categorys[0].classList.add("active")
        img_overlay[0].classList.add("no-overlay")
        btn_categorys.forEach((btn, index) => {
            btn.addEventListener("click", function () {
                btn_categorys.forEach(b => b.classList.remove("active"))
                btn.classList.add("active")

                img_overlay.forEach(o => o.classList.remove("no-overlay"))
                img_overlay[index].classList.add("no-overlay")

                review_img.src = img_category[index].src

                index_category = index

                $scope.$apply(() => {
                    $scope.idCTSP = data[index].id
                    $scope.soLuong = data[index].soLuong
                    $scope.gia = data[index].gia
                })

                evalService.getEvaluateByIdCTSP(data[index].id, (dataEval) => {
                    let starTotal = 0

                    dataEval.forEach((itemEval) => {
                        starTotal += itemEval.sao
                    })

                    $scope.$apply(() => {
                        $scope.listEvaluate = dataEval

                        $scope.soLuot = dataEval.length
                        $scope.danhGia = starTotal / (dataEval.length == 0 ? 1 : dataEval.length)
                    })
                })
            })
        })

    }, 500)

    //  get data sp
    api_getSP
        .then(function (response) {
            $scope.sp = response.data
        })
        .catch((error) => {
            console.error(error)
        })

    // show/ hide information product
    inforService.handleActiveInformation()

    // control quantity
    const btn_cart = document.querySelector('.add-cart')
    const number_cart = document.querySelector('#number-cart')
    btn_cart.addEventListener('click', function (e) {
        e.preventDefault()
        setTimeout(() => {
            if (!check_account) {
                let list_item_product_detail = JSON.parse(sessionStorage.getItem('item_product_detail'))

                if (list_item_product_detail == null) {
                    list_item_product_detail = []
                }

                let data_get = data[index_category]
                data_get['soLuongTrongGio'] = parseInt(document.querySelector("#input-quantity").value)
                data_get['tenSanPhamTrongGio'] = $scope.sp.tenSP

                let productExists = false;

                //check sản phẩm đã có thì cập nhật sl
                list_item_product_detail.forEach((item) => {
                    if (item.id == data[index_category].id) {
                        item.soLuongTrongGio = parseInt(item.soLuongTrongGio) || 0
                        item.soLuongTrongGio += parseInt(document.querySelector("#input-quantity").value)
                        productExists = true
                        return
                    }
                })

                if (!productExists) list_item_product_detail.push(data[index_category])

                number_cart.textContent = list_item_product_detail.length
                sessionStorage.setItem('item_product_detail', JSON.stringify(list_item_product_detail))
            } else {
                let data_cartKhack = {}
                data_cartKhack['idCTSP'] = data[index_category].id
                data_cartKhack['idKH'] = check_account
                data_cartKhack['soLuong'] = parseInt(document.querySelector("#input-quantity").value)

                inforService.handleAddCartForClient(data_cartKhack, get => {
                    number_cart.textContent = get
                })
            }
        }, 800)

        inforService.handleEffectAddCart()
    })

    const btn_buy = document.querySelector('#btn-buy-now')
    btn_buy.addEventListener('click', () => {
        let data_get = data[index_category]

        data_get['soLuongTrongGio'] = parseInt(document.querySelector("#input-quantity").value)
        data_get['tenSanPhamTrongGio'] = $scope.sp.tenSP

        sessionStorage.removeItem('product_buy_now')
        sessionStorage.setItem('product_buy_now', JSON.stringify(data_get))

        setTimeout(() => {
            window.location.hash = '#!/pay'
        })
    })
}