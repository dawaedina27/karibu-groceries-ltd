document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".procurement-form");

  const tonnageInput = form.querySelector('[name="tonnage"]');
  const unitCostInput = form.querySelector('[name="unitCost"]');
  const amountInput = form.querySelector('[name="amount"]');

  // ============================
  // HELPER VALIDATION FUNCTIONS
  // ============================
  const isAlpha = value => /^[A-Za-z\s]+$/.test(value);
  const isAlphaNumeric = value => /^[A-Za-z0-9\s]+$/.test(value);
  const isValidPhone = value => /^07[0-9]{8}$/.test(value);

  // ============================
  // AUTO CALCULATE AMOUNT
  // ============================
  const calculateAmount = () => {
    const tonnage = Number(tonnageInput.value);
    const unitCost = Number(unitCostInput.value);

    if (tonnage > 1000 && unitCost > 10000) {
      amountInput.value = tonnage * unitCost;
    } else {
      amountInput.value = "";
    }
  };

  tonnageInput.addEventListener("input", calculateAmount);
  unitCostInput.addEventListener("input", calculateAmount);

  // ============================
  // FORM SUBMISSION
  // ============================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const produceName = form.produceName.value.trim();
    const produceType = form.produceType.value.trim();
    const dealerName = form.dealerName.value.trim();
    const dealerContact = form.dealerContact.value.trim();
    const branch = form.branch.value;
    const date = form.date.value;
    const time = form.time.value;

    const tonnage = Number(tonnageInput.value);
    const unitCost = Number(unitCostInput.value);
    const amount = Number(amountInput.value);

    // ============================
    // VALIDATIONS
    // ============================
    if (!isAlphaNumeric(produceName)) {
      alert("Produce name must be alphanumeric");
      return;
    }

    if (!isAlpha(produceType) || produceType.length < 2) {
      alert("Produce type must be alphabetic and at least 2 characters");
      return;
    }

    if (!date || !time) {
      alert("Date and time are required");
      return;
    }

    if (tonnage < 1000) {
      alert("Tonnage must be at least 1000kg");
      return;
    }

    if (unitCost < 10000 ) {
      alert("Unit cost must not be empty and not less than 5 digits");
      return;
    }

    if (!isAlphaNumeric(dealerName) || dealerName.length < 2) {
      alert("Dealer name must be alphanumeric and at least 2 characters");
      return;
    }

    if (!isValidPhone(dealerContact)) {
      alert("Enter a valid dealer contact number");
      return;
    }

    // ============================
    // SAVE PROCUREMENT
    // ============================
    const procurement = {
      produceName,
      produceType,
      tonnage,
      unitCost,
      amount,
      dealerName,
      dealerContact,
      branch,
      date,
      time
    };

    let procurements = JSON.parse(localStorage.getItem("procurements")) || [];
    procurements.push(procurement);
    localStorage.setItem("procurements", JSON.stringify(procurements));

    // ============================
    // UPDATE STOCK
    // ============================
    let stock = JSON.parse(localStorage.getItem("stock")) || [];

    const existingStock = stock.find(
      item => item.produceName === produceName && item.branch === branch
    );

    if (existingStock) {
      existingStock.tonnage += tonnage;
    } else {
      stock.push({
        produceName,
        produceType,
        tonnage,
        branch
      });
    }

    localStorage.setItem("stock", JSON.stringify(stock));

    alert("Procurement recorded and stock updated successfully!");
    form.reset();
    amountInput.value = "";
  });

});
