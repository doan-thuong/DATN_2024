const inpOtpFG = document.querySelector('#otp-code')
const errorOtpFG = document.querySelector('#error-otp-forgot')

const inpNewPW = document.querySelector('#new-password')
const confirmPW = document.querySelector('#confirm-password')
const erPW = document.querySelector('#error-password')

document.getElementById('send-otp-btn').addEventListener('click', function () {

    const email = inpEmailfg.value

    if (validateEmail(email)) {
        fetch(`http://localhost:8083/login/getmail?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    localStorage.setItem('forgotEmail', email);//lưu lại mail để cho đổi mk(xuống nhớ lấy ra)
                    document.getElementById('forgot-password-form').style.display = 'none';
                    document.getElementById('otp-verification-form').style.display = 'block';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        alert("Vui lòng nhập mail hợp lệ")
    }
});

document.getElementById('reset-password-btn').addEventListener('click', function () {
    const newPassW = inpNewPW.value.trim()
    const nhapLaiPassW = confirmPW.value.trim()

    const email = localStorage.getItem('forgotEmail')

    erPW.innerText = ''

    if (!newPassW || !nhapLaiPassW) {
        erPW.innerText = 'Vui lòng nhập đầy đủ mật khẩu !'
        return
    }

    if (newPassW !== nhapLaiPassW) {
        erPW.innerText = 'Mật khẩu xác nhận không khớp !!'
        return
    }

    fetch(`http://localhost:8083/login/changePW`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassW, nhapLaiPassW })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                localStorage.removeItem('forgotEmail');
                window.location.href = data.redirectUrl;
            } else {
                erPW.innerText = data.message
            }
        })
        .catch(error => {
            console.error(error)
            erPW.innerText = 'Có lỗi xảy ra, vui lòng thử lại sau.';
        })
});