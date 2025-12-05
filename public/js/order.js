document.addEventListener("DOMContentLoaded", () => {
  const orderItems = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  const clearBtn = document.getElementById("clear-cart");
  const placeBtn = document.getElementById("place-order");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Handle empty cart
  if (cart.length === 0) {
    orderItems.innerHTML =
      '<p class="empty-cart-msg">No items in your cart.</p>';
    orderTotal.textContent = "";
    placeBtn.disabled = true;
    return;
  }

  // Render each item
  cart.forEach((item) => {
    const price = parseFloat(item.price.replace("₱", ""));
    total += price;

    const div = document.createElement("div");
    div.classList.add("order-item");

    div.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">${item.price}</span>
    `;

    orderItems.appendChild(div);
  });

  // Display total
  orderTotal.textContent = `Total: ₱${total.toFixed(2)}`;

  // Clear cart
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    sessionStorage.clear();
    window.location.reload();
  });

  // Place order
  placeBtn.addEventListener("click", () => {
    alert("Thank you! Your order has been placed.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
