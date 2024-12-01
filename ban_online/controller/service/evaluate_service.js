import * as noti from './notification_config.js'

export function handleControlMenuClick(idClient, callNoDone, callDone) {
    const evalDone = document.querySelector(".eval-done")
    const evalNoDone = document.querySelector(".eval-noDone")
    const formDone = document.querySelector(".form-done-aval")
    const formNoDone = document.querySelector(".form-nodone-eval")
    let fDstyle = formDone.style
    let fNDstyle = formNoDone.style

    evalDone.addEventListener("click", async () => {
        console.log("click")
        if (fDstyle.display != "none" && fDstyle.display != "") {
            return
        }

        fDstyle.display = "grid"
        setTimeout(() => { fDstyle.opacity = 1 }, 10)
        evalDone.classList.add('eval-selected')

        fNDstyle.display = "none"
        fNDstyle.opacity = 0
        evalNoDone.classList.remove('eval-selected')

        //call api lấy ds đã đánh giá
        const listDone = await getEvaluateDone(idClient)
        console.log(listDone)
        callDone(listDone)
    })

    evalNoDone.addEventListener("click", async () => {
        if (fNDstyle.display != "none" && fNDstyle.display != "") {
            return
        }

        fDstyle.display = "none"
        fDstyle.opacity = 0
        evalDone.classList.remove('eval-selected')

        fNDstyle.display = "grid"
        setTimeout(() => { fNDstyle.opacity = 1 }, 10)
        evalNoDone.classList.add('eval-selected')

        //call api lấy ds chưa đánh giá
        const listNoDone = await getEvaluateNoDone(idClient)
        console.log(listNoDone)
        callNoDone(listNoDone)
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

export async function getEvaluateNoDone(idClient) {
    const response = await fetch('http://localhost:8083/danh-gia/listNoDone?idKH=' + idClient)
    if (response.status == 200)
        return await response.json()
    else {
        noti.configNotificationError('Lỗi (' + response.status + ')')
        return []
    }
}

export async function getEvaluateDone(idClient) {
    const response = await fetch('http://localhost:8083/danh-gia/listDone?idKH=' + idClient)
    if (response.status == 200)
        return await response.json()
    else {
        noti.configNotificationError('Lỗi (' + response.status + ')')
        return []
    }
}

export function getDataEvaluate(idEval, callback) {
    const result = document.querySelector('.text-result-star')
    const resultText = document.querySelector('.text-evaluate')

    let resultStar = result.textContent[0]
    let comment = resultText.value

    if (parseInt(resultStar) <= 0 || parseInt(resultStar) > 5) {
        noti.configNotificationError('Số sao phải từ 1 đến 5')
        return
    }

    if (comment.trim() == "") {
        noti.configNotificationError('Vui lòng nhập nội dung đánh giá')
        return
    }

    var dataEvaluate = {
        idDG: idEval,
        sao: resultStar,
        nhanXet: comment
    }

    fetch('http://localhost:8083/danh-gia/update',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataEvaluate)
        }
    ).then(response => {
        if (response.ok) {
            noti.configNotificationSuccess('Cập nhật đánh giá thành công')
            return response.json()
        }
        else
            throw new Error('Http error: ' + response.status)

    }).then(data => {
        callback(data)
    }).catch(er => {
        noti.configNotificationError('Cập nhật đánh giá thất bại (' + er + ')')
    })
}