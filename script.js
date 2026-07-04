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
