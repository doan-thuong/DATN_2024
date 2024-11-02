import * as inforService from './service/information_service.js'

window.informationCtrl = function ($scope, $http, $location) {
    const itemCarts = document.querySelector('#cart-items');

    const sp = $location.search().sp

    let api_getSPCT = $http.get('http://localhost:8080/chi-tiet-san-pham?idSP=' + sp)
    let api_getSP = $http.get('http://localhost:8080/san-pham/detail?idSP=' + sp)

    var data
    var index_category = 0

    // get data spct
    api_getSPCT
        .then(function (response) {
            data = response.data

            if (!data) return

            $scope.categorys = []
            $scope.soLuong = data[0].soLuong
            $scope.gia = data[0].gia
            $scope.idCTSP = data[0].id

            data.forEach((ctps) => {
                $scope.categorys.push(ctps.soNgaySuDung)
            })

            console.log(data)
            inforService.handleChangeTotal($scope.soLuong)

            delay_spct
        })
        .catch((err) => {
            console.error(err)
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

    const check_account = false

    // if (!check_account) {
    // }

    const btn_cart = document.querySelector('.add-cart')
    btn_cart.addEventListener('click', function (e) {
        e.preventDefault()
        setTimeout(() => {
            let list_item_product_detail = JSON.parse(sessionStorage.getItem('item_product_detail'))

            if (list_item_product_detail == null) {
                list_item_product_detail = []
            }

            let data_get = data[index_category]
            data_get['soLuongTrongGio'] = parseInt(document.querySelector("#input-quantity").value)
            data_get['tenSanPhamTrongGio'] = $scope.sp.tenSP
            data_get['isSelected'] = false

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

            sessionStorage.setItem('item_product_detail', JSON.stringify(list_item_product_detail))
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