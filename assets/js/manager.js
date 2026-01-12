document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const branch = localStorage.getItem("branch");

  if (!username) {
    window.location.href = "../index.html";
    return;
  }

  document.getElementById("managerName").textContent = username;
  document.getElementById("branchName").textContent = branch;
});
