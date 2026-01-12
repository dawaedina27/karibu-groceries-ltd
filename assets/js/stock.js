document.addEventListener("DOMContentLoaded", () => {

  const tableBody = document.querySelector("#stockTable tbody");
  const stock = JSON.parse(localStorage.getItem("stock")) || [];

  if (stock.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">No stock available</td>
      </tr>
    `;
    return;
  }

  stock.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.produceName}</td>
      <td>${item.produceType}</td>
      <td>${item.quantity}</td>
      <td>${item.unitPrice}</td>
      <td>${item.branch}</td>
    `;

    tableBody.appendChild(row);
  });

});
