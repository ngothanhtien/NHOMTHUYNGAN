// phần chuyển tranh ảnh động
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
// phần thêm sản phẩm vào shopping cart
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
function showFooter() {
    document.querySelector('footer').classList.add('fixed-footer');
}

// Hàm để xóa lớp 'fixed-footer'
function hideFooter() {
    document.querySelector('footer').classList.remove('fixed-footer');
}
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const searchBar = document.getElementById("search-bar");
    const searchInput = document.getElementById("search-input");
    const closeSearch = document.getElementById("close-search");
    const productItems = document.querySelectorAll(".product-item");
    const searchMessage = document.getElementById("search-message"); // Lấy thẻ p để hiển thị thông báo

    // Bắt sự kiện click vào nút tìm kiếm
    searchButton.addEventListener("click", function () {
        searchBar.style.display = "flex"; // Hiển thị thanh tìm kiếm
        searchInput.value = ""; // Xóa nội dung tìm kiếm khi mở thanh tìm kiếm
        searchInput.focus(); // Đặt con trỏ vào ô tìm kiếm
        searchMessage.style.display = "none"; // Ẩn thông báo tìm kiếm khi mở thanh tìm kiếm
    });

    // Bắt sự kiện click vào nút close để đóng thanh tìm kiếm
    closeSearch.addEventListener("click", function () {
        searchBar.style.display = "none"; // Ẩn thanh tìm kiếm
        searchInput.value = ""; // Xóa nội dung tìm kiếm
        productItems.forEach(item => item.style.display = "block"); // Hiển thị tất cả sản phẩm
        searchMessage.style.display = "none"; // Ẩn thông báo tìm kiếm
        hideFooter();
    });

    // Bắt sự kiện khi người dùng gõ trong ô tìm kiếm
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển về chữ thường
        let foundProduct = false; // Biến để kiểm tra nếu sản phẩm được tìm thấy

        // Tìm kiếm sản phẩm khớp và ẩn các sản phẩm không khớp
        productItems.forEach(item => {
            const productNameElement = item.querySelector(".name-item"); // Truy cập phần tử chứa tên sản phẩm
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase(); // Lấy tên sản phẩm và chuyển về chữ thường
                if (productName.includes(searchValue)) {
                    item.style.display = "block"; // Hiển thị sản phẩm nếu tên khớp
                    foundProduct = true; // Đánh dấu là đã tìm thấy sản phẩm
                } else {
                    item.style.display = "none"; // Ẩn sản phẩm không khớp
                }
            }
        });

        // Nếu không tìm thấy sản phẩm nào
        if (!foundProduct && searchValue.trim() !== "") {
            searchMessage.textContent = `Sản phẩm "${searchValue}" không có trong danh sách!`; // Cập nhật nội dung thông báo
            searchMessage.style.display = "block"; // Hiển thị thông báo
            showFooter();
        } else {
            searchMessage.style.display = "none"; // Ẩn thông báo nếu tìm thấy sản phẩm
            hideFooter();
        }
    });
});


