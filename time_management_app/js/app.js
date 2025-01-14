// Select all navbar items and sections
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".card");

// Add event listeners to each navbar item
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all nav items
    navItems.forEach((nav) => nav.classList.remove("active"));

    item.classList.add("active");

    // Hide all sections
    sections.forEach((section) => section.classList.add("hide"));

    const targetSectionId = item.getAttribute("data-target");
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.remove("hide");
    }
  });
});
