document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
    event.preventDefault();

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (!role) {
        error.textContent = "Please select a role first!";
        return;
    }

    const users = [
        { u: "mgrA", p: "1234", role: "manager", branch: "Branch A" },
        { u: "mgrB", p: "1234", role: "manager", branch: "Branch B" },
        { u: "agentA1", p: "1234", role: "agent", branch: "Branch A" },
        { u: "agentA2", p: "1234", role: "agent", branch: "Branch A" },
        { u: "agentB1", p: "1234", role: "agent", branch: "Branch B" },
        { u: "agentB2", p: "1234", role: "agent", branch: "Branch B" },
        { u: "orban", p: "1234", role: "director", branch: "All" }
    ];

    const user = users.find(
        user => user.u === username && user.p === password && user.role === role
    );

    if (!user) {
        error.textContent = "Invalid credentials for the selected role!";
        return;
    }

    // Save session info
    localStorage.setItem("username", user.u);
    localStorage.setItem("role", user.role);
    localStorage.setItem("branch", user.branch);

    // Redirect
    if (role === "manager") {
        window.location.href = "manager/procurement.html";
    } else if (role === "agent") {
        window.location.href = "agent/cash-sales.html";
    } else if (role === "director") {
        window.location.href = "director/reports.html";
    }
}
