document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("customerTableBody");
  const searchInput = document.getElementById("customerSearch");

  let customers = JSON.parse(localStorage.getItem("customerList")) || [];

  const renderCustomers = (list) => {
    tableBody.innerHTML = "";

    if (list.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3">No customers found.</td></tr>';
      return;
    }

    list.forEach((customer) => {
      const row = tableBody.insertRow();
      const date = customer.date
        ? new Date(customer.date).toLocaleDateString()
        : "N/A";

      row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${date}</td>
      `;
    });
  };

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
    );
    renderCustomers(filtered);
  });

  renderCustomers(customers);
});
