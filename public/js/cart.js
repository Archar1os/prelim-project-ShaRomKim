document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Add to cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.dataset.product;
      const itemPrice =
        btn.parentElement.querySelector(".item-price").textContent;

      // Always fetch the latest cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      const item = { name: itemName, price: itemPrice };
      currentCart.push(item);
      localStorage.setItem("cart", JSON.stringify(currentCart));
      updateCartUI();
    });
  });

  // Update cart UI
  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      let total = 0;

      cart.forEach((item) => {
        const price = parseFloat(item.price.replace("₱", ""));
        total += price;

        const div = document.createElement("div");
        div.textContent = `${item.name} - ${item.price}`;
        cartItemsContainer.appendChild(div);
      });

      if (cartTotal) {
        cartTotal.textContent = `₱${total.toFixed(2)}`;
      }
    }

    if (cartCount) {
      cartCount.textContent = cart.length;
    } else {
      console.warn("Cart count element not found.");
    }
  }

  // Toggle cart dropdown
  if (cartBtn && cartDropdown) {
    cartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cartDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!cartDropdown.contains(e.target) && e.target.id !== "cart-btn") {
        cartDropdown.classList.remove("show");
      }
    });
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "receipt.html";
    });
  }

  // Initialize cart display
  updateCartUI();
});
