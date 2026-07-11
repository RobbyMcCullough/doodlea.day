const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const stepButtons = document.querySelectorAll(".step-check");
const signupForm = document.querySelector(".signup-form");
const formMessage = document.querySelector(".form-message");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

stepButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    const isComplete = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isComplete));
  });
});

signupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "The daily email list is coming soon.";
});

// Shrink manual headline lines that would otherwise overlap the hero art.
// Lines never wrap internally by design, so scale the font down to fit the
// heading's column instead.
const fitHeadlineLines = () => {
  document.querySelectorAll(".hero h1").forEach((heading) => {
    const available = heading.getBoundingClientRect().width;
    if (!available) return;
    heading.querySelectorAll("em .headline-line").forEach((line) => {
      line.style.fontSize = "";
      // Lines are block-level with nowrap text, so the overflowing content
      // width is scrollWidth, not the bounding-box width.
      const width = line.scrollWidth;
      if (width > available) {
        const current = parseFloat(getComputedStyle(line).fontSize);
        line.style.fontSize = `${Math.floor(current * (available / width) * 100) / 100}px`;
      }
    });
  });
};
fitHeadlineLines();
window.addEventListener("resize", fitHeadlineLines);
document.fonts?.ready.then(fitHeadlineLines);

// Reveal library cards in small center-out batches as each row scrolls in.
// The classes are added only when motion and IntersectionObserver are both
// available, so the complete library stays visible in every fallback path.
const archiveGrid = document.querySelector(".library-page .archive-grid");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (archiveGrid && !prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const archiveCards = [...archiveGrid.querySelectorAll(".sketch-card")];
  let columnCount = 1;
  archiveGrid.classList.add("card-reveal-ready");
  archiveCards.forEach((card) => card.classList.add("is-reveal-pending"));

  const updateRevealDelays = () => {
    columnCount = Math.max(
      1,
      getComputedStyle(archiveGrid).gridTemplateColumns.split(" ").filter(Boolean).length
    );
    const center = (columnCount - 1) / 2;
    const centerOutOrder = Array.from({ length: columnCount }, (_, index) => index)
      .sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b);

    archiveCards.forEach((card, index) => {
      const columnIndex = index % columnCount;
      const staggerIndex = centerOutOrder.indexOf(columnIndex);
      card.style.setProperty("--reveal-delay", `${staggerIndex * 35}ms`);
    });
  };

  updateRevealDelays();
  window.addEventListener("resize", updateRevealDelays);

  const revealRow = (entryCard) => {
    const cardIndex = archiveCards.indexOf(entryCard);
    const rowStart = Math.floor(cardIndex / columnCount) * columnCount;
    const rowCards = archiveCards.slice(rowStart, rowStart + columnCount);

    rowCards.forEach((card) => {
      if (!card.classList.contains("is-reveal-pending")) return;
      card.classList.remove("is-reveal-pending");
      card.classList.add("is-revealed");
      cardObserver.unobserve(card);
    });
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      revealRow(entry.target);
    });
  }, {
    rootMargin: "0px 0px 4% 0px",
    threshold: 0.01
  });

  archiveCards.forEach((card) => cardObserver.observe(card));
}
