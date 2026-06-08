(function () {
  const STORAGE_KEY = "color-mode"; // "light" | "dark"
  const body = document.body;

  function setMode(mode) {
    if (mode === "light") {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    } else {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startDark = stored ? stored === "dark" : prefersDark;
  if (stored) setMode(startDark ? "dark" : "light");
  const checkbox = document.getElementById("chkToggleDarkMode");
  if (checkbox) checkbox.checked = !startDark; // checked === light
  document.body.classList.add("loaded");

  window.toggleDarkMode = function (cb) {
    const mode = cb.checked ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, mode);

    const origin = cb.closest("label") || cb;
    const rect = origin.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.classList.add("vt-instant");
    const transition = document.startViewTransition(() => setMode(mode));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() =>
      document.documentElement.classList.remove("vt-instant"),
    );
  };
})();
