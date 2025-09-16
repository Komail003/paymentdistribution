function calculate() {
  const amount = parseFloat(document.getElementById("amount").value);
  const devCount = parseInt(document.getElementById("developers").value);
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (isNaN(amount) || amount <= 0) {
    resultsDiv.innerHTML =
      "<p style='color:#f87171'>⚠️ Please enter a valid amount.</p>";
    return;
  }
  if (isNaN(devCount) || devCount <= 0) {
    resultsDiv.innerHTML =
      "<p style='color:#f87171'>⚠️ Please enter number of developers.</p>";
    return;
  }
  
  // Fixed cuts
  const companyFund = (amount * 10) / 100;
  const commission = (amount * 15) / 100;
  const charity = (amount * 10) / 100;

  let remaining = amount - (companyFund + commission + charity);

  // Conditional logic
  let qa = 0;
  let nonWorking = 0;

  if (devCount >= 3) {
    qa = (remaining * 16) / 100;
    nonWorking = 0;
  } else {
    qa = (remaining * 20) / 100;
    nonWorking = (remaining * 10) / 100;
  }

  const devs = remaining - (qa + nonWorking);
  const perDev = devs / devCount;

  const breakdown = [
    ["🏢 Company Fund", companyFund],
    ["💼 Commission", commission],
    ["❤️ Charity", charity],
    ["💡 Remaining After Deductions", remaining],
    ["🛠 QA", qa],
  ];

  if (devCount < 3) {
    breakdown.push(["📋 Non-working", nonWorking]);
  }

  breakdown.push(
    ["👨‍💻 Developers (Total)", devs],
    [`👨‍👩‍👧 Each Developer (${devCount})`, perDev]
  );

  // Add all items
  breakdown.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `<span class="label">${label}</span>
                      <span class="value">Rs ${value.toFixed(2)}</span>`;
    resultsDiv.appendChild(item);
  });
}
