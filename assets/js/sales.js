const saleType = document.getElementById("saleType");
const cashSection = document.getElementById("cashSection");
const creditSection = document.getElementById("creditSection");

saleType.addEventListener("change", () => {
  cashSection.classList.add("hidden");
  creditSection.classList.add("hidden");

  if (saleType.value === "cash") cashSection.classList.remove("hidden");
  if (saleType.value === "credit") creditSection.classList.remove("hidden");
});

// Stock & prices (manager-set)
const stockData = {
  Beans: { stock: 5000, price: 2500, type: "Cereal" },
  Maize: { stock: 8000, price: 1800, type: "Grain" }
};

// Populate produce dropdowns
[produce, cProduce].forEach(select => {
  for (let p in stockData) {
    select.innerHTML += `<option value="${p}">${p}</option>`;
  }
});

// Cash Sale logic
produce.addEventListener("change", () => {
  stock.value = stockData[produce.value].stock;
  price.value = stockData[produce.value].price;
});

cashSaleForm.addEventListener("submit", e => {
  e.preventDefault();

  if (tonnage.value > stockData[produce.value].stock) {
    alert("Insufficient stock");
    return;
  }

  stockData[produce.value].stock -= tonnage.value;

  cashTable.innerHTML += `
    <tr>
      <td>${produce.value}</td>
      <td>${tonnage.value}</td>
      <td>${amountPaid.value}</td>
      <td>${buyer.value}</td>
      <td>${agent.value}</td>
    </tr>
  `;

  cashSaleForm.reset();
  alert("Cash sale recorded");
});

// Credit Sale logic
cProduce.addEventListener("change", () => {
  type.value = stockData[cProduce.value].type;
});

creditSaleForm.addEventListener("submit", e => {
  e.preventDefault();

  if (cTonnage.value > stockData[cProduce.value].stock) {
    alert("Insufficient stock");
    return;
  }

  stockData[cProduce.value].stock -= cTonnage.value;

  creditTable.innerHTML += `
    <tr>
      <td>${cBuyer.value}</td>
      <td>${cProduce.value}</td>
      <td>${cTonnage.value}</td>
      <td>${amountDue.value}</td>
      <td>${dueDate.value}</td>
    </tr>
  `;

  creditSaleForm.reset();
  alert("Credit sale recorded");
});
