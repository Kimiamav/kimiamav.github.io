// Gestion de l'onglet actif dans le menu (optionnel si tu veux le faire en dur)
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page;
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });

  // -------- LOGIQUE PAGE STAGES / TÉLÉPHONE --------
  const phoneTabs = document.querySelectorAll(".phone-tab");
  const phoneSections = document.querySelectorAll(".phone-section");
  const phoneDots = document.querySelectorAll(".phone-dot");

  if (phoneTabs.length) {
    phoneTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;

        phoneTabs.forEach((t) => t.classList.remove("active"));
        phoneSections.forEach((section) =>
          section.classList.remove("active")
        );
        phoneDots.forEach((dot) => dot.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
        phoneDots[index].classList.add("active");
      });
    });
  }
});
