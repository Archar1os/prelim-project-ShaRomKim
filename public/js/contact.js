document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const number = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !number || !email || !message) return;

    const dateSent = new Date().toISOString();

    // Save message separately
    const contactMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];
    contactMessages.push({
      name,
      number,
      email,
      message,
      date: dateSent,
    });
    localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

    // Save customer info with date
    const customerList = JSON.parse(localStorage.getItem("customerList")) || [];
    customerList.push({ name, email, date: dateSent });
    localStorage.setItem("customerList", JSON.stringify(customerList));

    alert("Message sent successfully!");
    form.reset();
  });
});
