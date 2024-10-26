// hàm set cho 2 thanh input trống mỗi khi reset lại trang
window.onload = function() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
};
// Hàm hiển thị mật khẩu khi người dùng nhất vào icon-eye
const showPassword = document.querySelector('.show-password');
const passwordInput = document.querySelector('input[type="password"]');
showPassword.addEventListener('click', () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        showPassword.textContent = "👁️";
    }
});
// hàm chuyển cảnh
document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    
    // Khi trang được tải xong, thêm lớp fade-in
    body.classList.add('fade-in');
    
    // Khi người dùng click vào link, thực hiện hiệu ứng fade-out trước khi chuyển trang
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Xóa lớp fade-in và thêm lớp fade để mờ dần trang hiện tại
            body.classList.remove('fade-in');
            body.classList.add('fade');
            
            // Chờ 0.5 giây (thời gian của hiệu ứng) trước khi chuyển trang
            setTimeout(function() {
                window.location.href = href;
            }, 500);
        });
    });
});
// Đăng nhập vào
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

     // kiểm tra nếu email và mật khẩu trùng
    if (email === 'thuyngan@gmail.com' && password === '12345') {
        alert('đăng nhập thành công');
        window.location.href = "/1_home_PAGE/home.html";
    } else {
        alert('Email hoặc mật khẩu không chính xác');
    }
});