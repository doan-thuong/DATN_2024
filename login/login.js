const inpUser = document.querySelector('#username')
const lbUser = document.querySelector('label[for="username"]')


const inpPass = document.querySelector('#current-password')
const lbPass = document.querySelector('label[for="current-password"]')

const inpEmailfg = document.querySelector('#emailfg')

const btnNextStep = document.querySelector('.btn-next-step')
const btnLogin = document.querySelector('.btn-login')
const formUser = document.querySelector('.form-user')
const formConfirm = document.querySelector('.form-confirm')

const errorTK = document.querySelector('#error-TK')
const errorPW = document.querySelector('#error-PW')

const inpOtp = document.querySelector('#otp');
const btnSubmitOtp = document.querySelector('.btn-submit-otp');
const errorOTP = document.querySelector('#error-OTP');

lbPass.classList.add('active-label')
lbUser.classList.add('active-label')

inpUser.addEventListener('focus', () => {
    lbUser.classList.add('no-active-label')
    lbUser.classList.remove('active-label')
})
inpUser.addEventListener('blur', () => {
    if (inpUser.value === '') {
        lbUser.classList.remove('no-active-label')
        lbUser.classList.add('active-label')
    }
})

inpPass.addEventListener('focus', () => {
    lbPass.classList.add('no-active-label')
    lbPass.classList.remove('active-label')
})
inpPass.addEventListener('blur', () => {
    if (inpPass.value === '') {
        lbPass.classList.remove('no-active-label')
        lbPass.classList.add('active-label')
    }
})

btnNextStep.addEventListener('click', (e) => {
    e.preventDefault()

    errorTK.innerText = ''
    errorPW.innerText = ''
    const email = inpUser.value.trim(); // Lấy giá trị từ input
    const password = inpPass.value.trim();

    if (inpUser.value.trim() === '') {
        errorTK.innerText = 'Vui lòng nhập tài khoản'
    }
    if (inpPass.value.trim() === '') {
        errorPW.innerText = 'Vui lòng nhập mật khẩu'
    }

    if (email !== '' && password !== '') {
        fetch('http://localhost:8083/login/onlineSale', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, passw: password, otp: otp })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formUser.classList.add('active-form-user')
                    formConfirm.classList.add('active-form-confirm')
                    // sessionStorage.setItem()
                } else {
                    // Hiển thị lỗi nếu đăng nhập thất bại
                    errorTK.innerText = data.message || 'Đăng nhập thất bại, vui lòng thử lại';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorTK.innerText = 'Đã xảy ra lỗi, vui lòng thử lại';
            });
    }
})

btnSubmitOtp.addEventListener('click', async (e) => {
    e.preventDefault();
    errorOTP.innerText = '';
    const otpValue = inpOtp.value.trim();
    if (otpValue === '') {
        errorOTP.innerText = 'Vui lòng nhập mã OTP';
        return;
    }

    // Lấy thông tin email từ session hoặc từ form trước đó
    const email = inpUser.value;

    // Gửi yêu cầu kiểm tra OTP
    const otpRequest = { email: email, otp: otpValue };
    const response = await fetch('http://localhost:8083/login/checkOtpOl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(otpRequest)
    });

    const result = await response.json();
    if (result.success === false) {
        errorOTP.innerText = result.message || 'Mã OTP không chính xác';
    } else {
        console.log(result)
        sessionStorage.setItem('user', result.getKH)
        window.location.href = result.redirectUrl
    }
})

function validateEmail(email) {
    const vali = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/
    return vali.test(email)
}

document.getElementById('verify-otp-btn').addEventListener('click', function () {
    errorOtpFG.innerText = ''
    const checkOtp = inpOtpFG.value.trim()

    if (checkOtp === '') {
        checkOtp.innerText = 'Vui lòng nhập mã OTP'
        return
    }

    fetch(`http://localhost:8083/login/checkOtpFG`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({ otp: checkOtp })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message)
                })
            }
            return response.json()
        })
        .then(data => {
            alert(data.message)
            document.getElementById('otp-verification-form').style.display = 'none';
            document.getElementById('reset-password-form').style.display = 'block';
        })
        .catch(error => {
            errorOtpFG.innerText = error.message
        })
});