// Hi dawaedina27 — this script logs the user out and sends them back to the login page.
// Load this file on each dashboard page (adjust path as needed).

// Wait for the page DOM to be ready before doing anything
document.addEventListener('DOMContentLoaded', function () {
  // Find the logout button in the page header by its id
  // (Add <button id="logoutBtn">Logout</button> to your dashboard HTML)
  const logoutBtn = document.getElementById('logoutBtn');

  // If there is no logout button on this page, do nothing (no errors)
  if (!logoutBtn) return;

  // Function that clears our saved login info and redirects to the login page
  function performLogout() {
    // Try to remove only the keys we use for session state (safe and limited)
    try {
      localStorage.removeItem('username'); // remove saved username
      localStorage.removeItem('role');     // remove saved role
      localStorage.removeItem('branch');   // remove saved branch (if any)
    } catch (err) {
      // If localStorage is unavailable for some reason, log a warning
      console.warn('Logout: could not clear localStorage', err);
    }

   
    const loginUrl = window.location.origin +  "../../index.html";

    // Redirect the user to the login page (final step of logout)
    window.location.href = loginUrl;
  }

  // When the user clicks the logout button, confirm then log out
  logoutBtn.addEventListener('click', function (e) {
    // Prevent any default button behaviour (just in case)
    e.preventDefault();

    // Friendly confirmation prompt 
    const ok = confirm('Are you sure you want to log out?');

    // If the user confirmed, perform the logout flow
    if (ok) {
      performLogout();
    }
  });
});
