window.onload = function() {
    // localStorage.removeItem('shoppingCart');
    // Lấy danh sách sản phẩm từ Local Storage
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Chọn phần tử chứa sản phẩm
    const productContainer = document.querySelector('.product-list');

    // Xóa nội dung cũ nếu có
    productContainer.innerHTML = '';

    // Kiểm tra xem giỏ hàng có sản phẩm không
    if (cart.length === 0) {
        productContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        return;
    }

    // Duyệt qua từng sản phẩm và thêm vào giỏ hàng
    cart.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">Giá: ${product.price}₫</p>
                <p class="product-quantity">
                    Số lượng:
                    <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
                </p>
                <i class="ti-trash delete-icon" onclick="deleteProduct(${index})"></i>
                <button class="order-button" onclick="placeOrder(${index})" style="margin-left: 10px;">Đặt hàng</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}
// Hàm xóa sản phẩm icon-trash
function deleteProduct(index) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    if (confirm('Bạn có thật sự muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        // Xóa sản phẩm tại chỉ số đã cho
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));

        // Tải lại trang để cập nhật giỏ hàng
        window.onload();
    }
}
// hàm giảm số lượng
function decreaseQuantity(element) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let quantity = element.parentElement.querySelector('.quantity');
    let currentValue = parseInt(quantity.textContent);
    if (currentValue > 1) {
        quantity.textContent = currentValue - 1;

        // Lấy tên sản phẩm từ phần tử HTML và cập nhật trong Local Storage
        const productName = element.closest('.product-card').querySelector('.product-name').textContent;
        const productIndex = cart.findIndex(item => item.name === productName);
        if (productIndex > -1) {
            cart[productIndex].quantity -= 1;
        }

        // Lưu lại giỏ hàng đã cập nhật
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
}
// hàm tăng số lượng
function increaseQuantity(element) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let quantity = element.parentElement.querySelector('.quantity');
    let currentValue = parseInt(quantity.textContent);
    quantity.textContent = currentValue + 1;

    // Lấy tên sản phẩm từ phần tử HTML và cập nhật trong Local Storage
    const productName = element.closest('.product-card').querySelector('.product-name').textContent;
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    }

    // Lưu lại giỏ hàng đã cập nhật
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function placeOrder(index) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const product = cart[index];

    if (product) {
        // Hiển thị dialog
        document.getElementById('orderDialog').style.display = 'block';
        // Lưu chỉ số sản phẩm vào biến toàn cục để sử dụng sau này
        window.currentOrderIndex = index;
    }
}
// hiển thị dialog
function closeDialog() {
    document.getElementById('orderDialog').style.display = 'none';
}
// hàm xóa sản phẩm sau khi đặt
function deleteProduct_afterOrder(index) {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        // Xóa sản phẩm tại chỉ số đã cho
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        // Tải lại trang để cập nhật giỏ hàng
        window.onload();
}
function confirmOrder() {
    const name = document.getElementById('customerName').value; // Sửa ID ở đây
    const address = document.getElementById('customerAddress').value; // Sửa ID ở đây
    const phone = document.getElementById('customerPhone').value; // Sửa ID ở đây
    
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (!name || !address || !phone) {
        // Hiển thị thông báo trong placeholder
        if (!name) {
            document.getElementById('customerName').placeholder = "Vui lòng nhập tên!"; // Sửa ID ở đây
            document.getElementById('customerName').classList.add('input-error'); // Thêm lớp lỗi nếu cần
        }
        if (!address) {
            document.getElementById('customerAddress').placeholder = "Vui lòng nhập địa chỉ!"; // Sửa ID ở đây
            document.getElementById('customerAddress').classList.add('input-error'); // Thêm lớp lỗi nếu cần
        }
        if (!phone) {
            document.getElementById('customerPhone').placeholder = "Vui lòng nhập số điện thoại!"; // Sửa ID ở đây
            document.getElementById('customerPhone').classList.add('input-error'); // Thêm lớp lỗi nếu cần
        }
        return; // Dừng hàm nếu thông tin chưa đầy đủ
    }

    // Lấy thông tin sản phẩm từ giỏ hàng
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const product = cart[window.currentOrderIndex];

    if (product) {
        // Tính phí ship (có thể thay đổi theo yêu cầu)
        const shippingFee = 30000; // Ví dụ: phí ship cố định
        const totalPrice = (product.price * product.quantity) + shippingFee;

        // Hiển thị thông tin đặt hàng
        alert(`Đặt hàng thành công!\nThông tin đơn hàng:\nTên\u2003\u2003\u2003\u2003  : ${name}\nĐịa chỉ\u2003\u2003\u2003: ${address}\nSố điện thoại: ${phone}\nTên hàng\u2003\u2003: ${product.name}\nSố lượng\u2003\u2003: ${product.quantity}\nGiá\u2003\u2003\u2003\u2003  : ${product.price}₫/1sp\nPhí ship\u2003\u2003  : ${shippingFee}₫\nTổng tiền\u2003   : ${totalPrice}₫`);

        // Xóa sản phẩm khỏi giỏ hàng
        deleteProduct_afterOrder(window.currentOrderIndex);
        // Đóng dialog
        closeDialog();
    }
}
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