document.addEventListener("DOMContentLoaded", () => {
  let allMessages = [];
  const tableBody = document.getElementById("messageTableBody");
  const searchInput = document.getElementById("messageSearch");

  const loadMessages = () => {
    const stored = localStorage.getItem("contactMessages");
    allMessages = stored ? JSON.parse(stored) : [];
    renderMessages(allMessages);
  };

  const renderMessages = (messages) => {
    tableBody.innerHTML = "";

    if (messages.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4">No messages found.</td></tr>';
      return;
    }

    messages.forEach((msg) => {
      const row = tableBody.insertRow();
      const date = msg.date ? new Date(msg.date).toLocaleDateString() : "N/A";

      row.innerHTML = `
        <td>${msg.name || "N/A"}</td>
        <td>${msg.email || "N/A"}</td>
        <td>${date}</td>
        <td class="message-col" title="${msg.message || ""}">
          ${msg.message || "No Message"}
        </td>
      `;
    });
  };

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = allMessages.filter((msg) => {
      const name = msg.name?.toLowerCase() || "";
      const email = msg.email?.toLowerCase() || "";
      const content = msg.message?.toLowerCase() || "";
      return (
        name.includes(query) || email.includes(query) || content.includes(query)
      );
    });
    renderMessages(filtered);
  });

  loadMessages();
});
