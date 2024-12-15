const inpName = document.querySelector('#name');
const lbName = document.querySelector('label[for="name"]');

const inpEmail = document.querySelector('#email');
const lbEmail = document.querySelector('label[for="email"]');

const inpPassword = document.querySelector('#password');
const lbPassword = document.querySelector('label[for="password"]');

const inpPhone = document.querySelector('#phone');
const lbPhone = document.querySelector('label[for="phone"]');

const inpAddress = document.querySelector('#address');
const lbAddress = document.querySelector('label[for="address"]');

const btnNextStep = document.querySelector('.btn-next-step')
const formUser = document.querySelector('.form-user')
const formConfirm = document.querySelector('.form-confirm')


const inpOtp = document.querySelector('#otp');
const btnSubmitOtp = document.querySelector('.btn-submit-otp');
const errorOTP = document.querySelector('#error-OTP');

// Thêm class cho các label khi trang tải
lbName.classList.add('active-label');
lbEmail.classList.add('active-label');
lbPassword.classList.add('active-label');
lbPhone.classList.add('active-label');
lbAddress.classList.add('active-label');

// Xử lý sự kiện focus và blur cho các trường nhập liệu
inpName.addEventListener('focus', () => {
    lbName.classList.add('no-active-label');
    lbName.classList.remove('active-label');
});
inpName.addEventListener('blur', () => {
    if (inpName.value === '') {
        lbName.classList.remove('no-active-label');
        lbName.classList.add('active-label');
    }
});

inpEmail.addEventListener('focus', () => {
    lbEmail.classList.add('no-active-label');
    lbEmail.classList.remove('active-label');
});
inpEmail.addEventListener('blur', () => {
    if (inpEmail.value === '') {
        lbEmail.classList.remove('no-active-label');
        lbEmail.classList.add('active-label');
    }
});

inpPassword.addEventListener('focus', () => {
    lbPassword.classList.add('no-active-label');
    lbPassword.classList.remove('active-label');
});
inpPassword.addEventListener('blur', () => {
    if (inpPassword.value === '') {
        lbPassword.classList.remove('no-active-label');
        lbPassword.classList.add('active-label');
    }
});

inpPhone.addEventListener('focus', () => {
    lbPhone.classList.add('no-active-label');
    lbPhone.classList.remove('active-label');
});
inpPhone.addEventListener('blur', () => {
    if (inpPhone.value === '') {
        lbPhone.classList.remove('no-active-label');
        lbPhone.classList.add('active-label');
    }
});

inpAddress.addEventListener('focus', () => {
    lbAddress.classList.add('no-active-label');
    lbAddress.classList.remove('active-label');
});
inpAddress.addEventListener('blur', () => {
    if (inpAddress.value === '') {
        lbAddress.classList.remove('no-active-label');
        lbAddress.classList.add('active-label');
    }
});

btnNextStep.addEventListener('click', async function (event) {
    event.preventDefault(); // Ngăn chặn form gửi đi

    // Reset các lỗi trước đó
    // resetErrors();

    // Lấy giá trị từ các trường
    var name = document.getElementById('name')?.value.trim();
    var email = document.getElementById('email')?.value.trim();
    var phone = document.getElementById('phone')?.value.trim();
    var address = document.getElementById('address')?.value.trim();
    var gender = document.querySelector('input[name="gender"]:checked')?.value;
    var passw = document.getElementById('password')?.value.trim();

    // Kiểm tra tính hợp lệ của các trường
    var isValid = true;

    // Kiểm tra tên
    if (!name) {
        showError('NAME', 'Họ và tên không được để trống');
        isValid = false;
    }

    if (!email || !validateEmail(email)) {
        showError('EMAIL', 'Email không hợp lệ');
        isValid = false;
    } else {
        try {
            const emailExists = await checkEmailDuplicate(email);
            if (emailExists) {
                showError('EMAIL', 'Email đã được sử dụng');
                isValid = false;
            }
        } catch (error) {
            showError('EMAIL', 'Lỗi kiểm tra email');
            isValid = false;
        }
    }

    if (!phone || !validatePhone(phone)) {
        showError('PHONE', 'Số điện thoại không hợp lệ');
        isValid = false;
    } else {
        try {
            const phoneExists = await checkPhoneDuplicate(phone);
            if (phoneExists) {
                showError('PHONE', 'Số điện thoại đã được sử dụng');
                isValid = false;
            }
        } catch (error) {
            showError('PHONE', 'Lỗi kiểm tra số điện thoại');
            isValid = false;
        }
    }

    // Kiểm tra địa chỉ
    if (!address) {
        showError('ADDRESS', 'Địa chỉ không được để trống');
        isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!passw || passw.length < 6) {
        showError('PASSWORD', 'Mật khẩu phải từ 6 ký tự trở lên');
        isValid = false;
    }

    // Nếu tất cả hợp lệ, gửi dữ liệu đến server
    if (isValid) {
        let khachHang = {
            ten: name,
            email: email,
            sdt: phone,
            diaChi: address,
            gioiTinh: gender,
            passw: passw,
        };

        try {
            const response = await fetch('http://localhost:8083/khachhang/dangKy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(khachHang),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Lỗi: ${response.status}`)
            }
            // const data = await response.json()

            document.getElementById('registerForm')?.reset()

            window.location.href = 'http://127.0.0.1:5501/login/loginOnline.html'

        } catch (error) {
            console.log(error)
        } finally {
            console.log('Đăng ký hoàn tất.')
        }
    }
});

function showError(field, message) {
    var errorElement = document.getElementById('error-' + field);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = 'red'; // Thêm CSS tô đỏ
    }
}

function resetErrors() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (msg) {
        msg.textContent = '';
        msg.style.color = ''; // Xóa màu khi reset
    });
}

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
// Hàm kiểm tra email trùng trên backend
async function checkEmailDuplicate(email) {
    const url = `http://localhost:8083/khachhang/check-email?email=${encodeURIComponent(email)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Lỗi kiểm tra email: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        throw error;
    }
}

async function checkPhoneDuplicate(phone) {
    const url = `http://localhost:8083/khachhang/check-phone?phone=${phone}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Lỗi kiểm tra số điện thoại: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        throw error;
    }
}

function validatePhone(phone) {
    var re = /^[0-9]{10,15}$/;
    return re.test(phone);
}
