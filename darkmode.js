function updateDarkModePreference(prefersDarkMode) {
  localStorage.setItem("darkMode", prefersDarkMode);
}
function getDarkModePreferenceFromLocalStorage() {
  const value = localStorage.getItem("darkMode");
  return value === "true" ? true : value === "false" ? false : null;
}
function getDarkModePreferenceFromMediaQuery() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getDarkModePreference() {
  return [
    getDarkModePreferenceFromLocalStorage(),
    getDarkModePreferenceFromMediaQuery(),
  ];
}
function updateBodyForDarkMode(prefersDarkMode) {
  document.body.classList.toggle("dark-mode", prefersDarkMode);
  document.body.classList.toggle("light-mode", !prefersDarkMode);
}

document.addEventListener("DOMContentLoaded", function () {
  var [prefersDarkMode, hasDarkMode] = getDarkModePreference();

  if (prefersDarkMode === null) {
    prefersDarkMode = hasDarkMode;
  } else {
    updateBodyForDarkMode(prefersDarkMode);
  }
  document.getElementById("chkToggleDarkMode").checked = !prefersDarkMode;

  setTimeout(() => {
    document.body.classList.add("allow-transitions");
  }, 200);
});
function toggleDarkMode(checkbox) {
  updateBodyForDarkMode(!checkbox.checked);
  updateDarkModePreference(!checkbox.checked);
}
