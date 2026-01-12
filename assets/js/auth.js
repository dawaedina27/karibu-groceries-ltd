// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element by id or fallback to a form with class .login-form
  const loginForm = document.getElementById("loginForm") || document.querySelector("form.login-form");
  // Get the error display paragraph
  const errorEl = document.getElementById("error");
  // Get the role select element
  const roleSelect = document.getElementById("role");
  // Get the branch row container (so we can hide/show it)
  const branchRow = document.getElementById("branchRow");
  // Get the branch select element
  const branchSelect = document.getElementById("branch");
  // Get the username input
  const usernameInput = document.getElementById("username");
  // Get the password input
  const passwordInput = document.getElementById("password");
  // Get the toggle password button/icon
  const togglePasswordBtn = document.querySelector(".toggle-password");

  // If required elements are missing, log a warning and stop
  if (!loginForm || !roleSelect || !usernameInput || !passwordInput || !errorEl) {
    console.warn("Login form: missing required elements.");
    return;
  }

  // Demo list of users for client-side 
  const users = [
    { u: "Edina", p: "1234", role: "manager" },
    { u: "Dawa", p: "1234", role: "manager" },
    { u: "agentA1", p: "1234", role: "agent" },
    { u: "agentA2", p: "1234", role: "agent" },
    { u: "agentB1", p: "1234", role: "agent" },
    { u: "agentB2", p: "1234", role: "agent" },
    { u: "orban", p: "1234", role: "director" }
  ];

  // Show an error message in the error element
  function showError(msg) {
    // Set the text content to the passed message
    errorEl.textContent = msg;
    // Make sure the element is visible
    errorEl.style.display = "block";
    // Add ARIA attributes for screen readers
    errorEl.setAttribute("role", "alert");
    errorEl.setAttribute("aria-live", "polite");
  }

  // Clear any existing error message from the error element
  function clearError() {
    // Remove the text content
    errorEl.textContent = "";
    // Hide the element visually
    errorEl.style.display = "none";
  }

  // Update whether the branch row is shown based on selected role
  function updateBranchVisibility() {
    // Get the selected role in lowercase
    const role = (roleSelect.value || "").trim().toLowerCase();
    // If we have branch controls, toggle visibility and required attribute
    if (branchRow && branchSelect) {
      // If role is director, hide the branch row and remove the required attribute
      if (role === "director") {
        branchRow.classList.add("hidden");
        branchRow.setAttribute("aria-hidden", "true");
        branchSelect.required = false;
        branchSelect.value = "";
      } else {
        // Otherwise show the branch row and make it required
        branchRow.classList.remove("hidden");
        branchRow.removeAttribute("aria-hidden");
        branchSelect.required = true;
      }
    }
  }

  // Initialize by clearing errors and setting branch visibility correctly
  clearError();
  updateBranchVisibility();

  // When the role changes, update branch visibility and clear errors
  roleSelect.addEventListener("change", function () {
    updateBranchVisibility();
    clearError();
  });

  // If we have a toggle password control, attach click handler to show/hide password
  if (togglePasswordBtn) {
    // Prevent default behavior and toggle the input type between password and text
    togglePasswordBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      // Update aria-pressed for accessibility
      togglePasswordBtn.setAttribute("aria-pressed", String(isPassword));
      // Optionally toggle icon class if there's an <i> inside the toggle element
      const icon = togglePasswordBtn.querySelector("i");
      if (icon) icon.classList.toggle("fa-eye-slash");
    });
  }

  // Clear error only when the user types or changes a form control
  loginForm.addEventListener("input", function (e) {
    if (e.target && ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) clearError();
  });
  loginForm.addEventListener("change", function (e) {
    if (e.target && ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) clearError();
  });

  // Handle form submit
  loginForm.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Clear previous errors before validating
    clearError();

    // Read and normalize form values
    const roleRaw = (roleSelect.value || "").trim();
    const role = roleRaw.toLowerCase();
    const branchRaw = branchSelect ? (branchSelect.value || "").trim() : "";
    const branch = branchRaw.toLowerCase();
    const username = (usernameInput.value || "").trim();
    const password = (passwordInput.value || "").trim();

    // Validation: role must be selected
    if (!role) {
      showError("Please select a role!");
      roleSelect.focus();
      return;
    }

    // Validation: branch required for non-director roles
    if (role !== "director" && branchSelect && !branchRaw) {
      showError("Please select a branch!");
      branchSelect.focus();
      return;
    }

    // Validation: username must be entered
    if (!username) {
      showError("Please enter your username.");
      usernameInput.focus();
      return;
    }

    // Validation: password must be entered
    if (!password) {
      showError("Please enter your password.");
      passwordInput.focus();
      return;
    }

    // Find the user in the demo users array that matches username, password and role
    const user = users.find(u => u.u === username && u.p === password && u.role === role);

    // If no matching user found, show an error and clear the password field
    if (!user) {
      console.debug("Login failed:", { username, role, branch: branchRaw });
      showError("Invalid login credentials!");
      passwordInput.value = "";
      passwordInput.focus();
      return;
    }

    // Save demo values to localStorage (wrap in try/catch for safety)
    try {
      localStorage.setItem("username", user.u);
      localStorage.setItem("role", user.role);
      if (branchRaw) localStorage.setItem("branch", branchRaw);
    } catch (err) {
      console.warn("localStorage error:", err);
    }

    // Redirect rules:
    // If manager + Maganjo -> manager2/dashboard2.html
    // If manager + Matugga -> manager/dashboard.html
    // If manager + other -> manager/procurement.html
    // If agent -> agent/cash-sales.html
    // If director -> director/director.html
    if (role === "manager") {
      if (branch === "maganjo") {
        window.location.href = "manager/manager.html";
      } else if (branch === "matugga") {
        window.location.href = "manager/manager.html";
      } else {
        window.location.href = "manager/index.html";
      }
    } else if (role === "agent") {
      window.location.href = "agent/cash-sales.html";
    } else if (role === "director") {
      window.location.href = "director/director.html";
    } else {
      // Fallback redirect
      window.location.href = "/";
    }
  });
});