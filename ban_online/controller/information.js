window.informationCtrl = function ($scope, $http) {
    const url = ""
    $scope.title = "Hello World!";

    const title_constituent = document.querySelector(".title-constituent")
    const content_constituent = document.querySelector(".content-constituent")

    const title_instructions = document.querySelector(".title-instructions")
    const content_instructions = document.querySelector(".content-instructions")

    title_constituent.addEventListener("click", function () {
        content_constituent.classList.toggle("show")
    })

    title_instructions.addEventListener("click", function () {
        content_instructions.classList.toggle("show")
    })

    const btn_categorys = document.querySelectorAll(".btn-category")
    btn_categorys[0].classList.add("active")
    btn_categorys.forEach(btn => {
        btn.addEventListener("click", function () {
            btn_categorys.forEach(b => b.classList.remove("active"))
            btn.classList.add("active")
        })
    })
}