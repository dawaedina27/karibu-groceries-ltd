document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
