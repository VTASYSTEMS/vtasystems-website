// ======================================================
// VTA SYSTEMS - CART
// ======================================================

const CART_KEY = "vta_cart";

// Lấy giỏ hàng
export function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));

    if (!Array.isArray(cart)) {
      return [];
    }

    return cart;
  } catch (error) {
    console.error("Lỗi đọc giỏ hàng:", error);
    return [];
  }
}

// Lưu giỏ hàng
export function saveCart(cart) {
  if (!Array.isArray(cart)) {
    cart = [];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // Thông báo cho các trang khác nếu cần cập nhật giỏ hàng
  window.dispatchEvent(
    new CustomEvent("cartUpdated", {
      detail: cart
    })
  );
}

// Thêm sản phẩm
export function addToCart(name, price, image = "", productId = "") {

  const cart = getCart();

  const id = String(productId || name);

  const existing = cart.find(
    item => String(item.productId || item.name) === id
  );

  if (existing) {
    existing.qty = Number(existing.qty || 0) + 1;
  } else {

    cart.push({
      productId: productId || "",
      name: name || "Sản phẩm",
      price: Number(price) || 0,
      image: image || "",
      qty: 1
    });

  }

  saveCart(cart);

  return cart;
}

// Xóa sản phẩm
export function removeFromCart(productIdOrName) {

  let cart = getCart();

  cart = cart.filter(
    item =>
      String(item.productId || item.name) !==
      String(productIdOrName)
  );

  saveCart(cart);

  return cart;
}

// Thay đổi số lượng
export function updateCartQuantity(productIdOrName, quantity) {

  const cart = getCart();

  const item = cart.find(
    item =>
      String(item.productId || item.name) ===
      String(productIdOrName)
  );

  if (!item) {
    return cart;
  }

  quantity = Number(quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {

    return removeFromCart(productIdOrName);

  }

  item.qty = Math.floor(quantity);

  saveCart(cart);

  return cart;
}

// Xóa toàn bộ giỏ
export function clearCart() {

  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(
    new CustomEvent("cartUpdated", {
      detail: []
    })
  );

}

// Tổng số sản phẩm
export function getCartCount() {

  return getCart().reduce(
    (total, item) =>
      total + Number(item.qty || 0),
    0
  );

}

// Tổng tiền
export function getCartTotal() {

  return getCart().reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.qty || 0),
    0
  );

}

// Định dạng tiền Việt Nam
export function formatPrice(price) {

  return Number(price || 0)
    .toLocaleString("vi-VN") + "đ";

}

// Cập nhật tất cả phần tử hiển thị số lượng giỏ hàng
export function updateCartBadges() {

  const count = getCartCount();

  document
    .querySelectorAll(
      "#cartCount, .cart-count, [data-cart-count]"
    )
    .forEach(element => {

      element.textContent = count;

      if (count > 0) {
        element.style.display = "";
      }

    });

}

// Khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {

  updateCartBadges();

});

// Khi giỏ hàng thay đổi
window.addEventListener("cartUpdated", () => {

  updateCartBadges();

});
