export function handleControlMenuClick() {
    const evalDone = document.querySelector(".eval-done")
    const evalNoDone = document.querySelector(".eval-noDone")
    const formDone = document.querySelector(".form-done-aval")
    const formNoDone = document.querySelector(".form-nodone-eval")
    let fDstyle = formDone.style
    let fNDstyle = formNoDone.style

    evalDone.addEventListener("click", () => {
        if (fDstyle.display == "none" || fDstyle.display == "") {
            fDstyle.display = "grid"
            setTimeout(() => { fDstyle.opacity = 1 }, 10)
            evalDone.classList.add('eval-selected')

            fNDstyle.display = "none"
            fNDstyle.opacity = 0
            evalNoDone.classList.remove('eval-selected')
        }
    })

    evalNoDone.addEventListener("click", () => {
        if (fNDstyle.display == "none" || fNDstyle.display == "") {
            fDstyle.display = "none"
            fDstyle.opacity = 0
            evalDone.classList.remove('eval-selected')

            fNDstyle.display = "grid"
            setTimeout(() => { fNDstyle.opacity = 1 }, 10)
            evalNoDone.classList.add('eval-selected')
        }
    })
}

export function showPopupEvaluate(callback) {
    const popupEvaluate = document.querySelector(".popup-evaluate")
    const overlayEvaluate = document.querySelector(".overlay-eval")

    if (popupEvaluate.style.display == '' || popupEvaluate.style.display == 'none') {
        popupEvaluate.style.display = 'block'
        setTimeout(() => { popupEvaluate.style.opacity = 1 }, 10)
        overlayEvaluate.style.display = 'block'
    }

    overlayEvaluate.addEventListener('click', () => {
        popupEvaluate.style.display = 'none'
        overlayEvaluate.style.display = 'none'
        popupEvaluate.style.opacity = 0
        clearFormEvaluate()
        callback(0)
    })
}

export function eventStarEvaluate(callback) {
    const starAll = document.querySelectorAll('.icon-star .bxs-star')

    starAll.forEach((star, index) => {
        star.addEventListener('click', () => {
            starAll.forEach(s => s.classList.remove('star-select'))
            for (let i = 0; i <= index; i++) {
                starAll[i].classList.add('star-select')
            }
            callback(index + 1)
        })
    })
}

export function clearFormEvaluate() {
    const starAll = document.querySelectorAll('.icon-star .bxs-star')
    const inputComment = document.querySelector('.text-evaluate')
    starAll.forEach(s => s.classList.remove('star-select'))
    inputComment.value = ''
}