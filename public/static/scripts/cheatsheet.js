// Initialize with saved tab from sessionStorage
function initializeTabs() {
  const savedTab = sessionStorage.getItem("activeTab") || "overview";
  switchSection(savedTab);
}

// Tab switching function
function switchSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from tabs
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Find and activate corresponding tab
  const buttons = Array.from(document.querySelectorAll(".nav-tab"));
  const activeButton = buttons.find((btn) => {
    const onclick = btn.getAttribute("onclick");
    const match = onclick.match(/'([^']+)'/);
    return match && match[1] === sectionId;
  });

  if (activeButton) {
    activeButton.classList.add("active");
  }

  // Save to sessionStorage
  sessionStorage.setItem("activeTab", sectionId);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeTabs();
});
