
// thêm ảnh để random
const bannerImages = [
    "https://kiseki.ca/media/ves/brand/romandbrand.jpg",
    "https://chaustore.vn/wp-content/uploads/2020/08/romand-new-zero-velvet-tint.jpg"
];
let currentIndex = 0;
function changeBannerImage() {
    const bannerImageElement = document.querySelector('.banner-image');
    currentIndex = (currentIndex + 1) % bannerImages.length; 
    bannerImageElement.src = bannerImages[currentIndex]; 
}
// Gọi hàm changeBannerImage mỗi 5 giây
setInterval(changeBannerImage, 5000);

function addToCart(productName, productPrice, productImage) {
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 
    };
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    // Lưu danh sách sản phẩm vào Local Storage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    alert(`${productName} đã được thêm vào giỏ hàng!`);
}
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

function noTifyMessage(){
    alert("Vui lòng chuyển sang các trang khác để tìm kiếm sản phẩm!");
}

