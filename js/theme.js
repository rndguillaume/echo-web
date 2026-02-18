(function () {
  // Apply saved theme immediately to prevent flash
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // Apply saved language immediately (detect browser lang on first visit)
  var savedLang = localStorage.getItem("lang");
  if (!savedLang) {
    savedLang = navigator.language.startsWith("fr") ? "fr" : "en";
  }
  document.documentElement.setAttribute("data-lang", savedLang);

  document.addEventListener("DOMContentLoaded", function () {
    var themeBtn = document.querySelector(".theme-toggle");
    var langBtn = document.querySelector(".lang-toggle");

    function getEffectiveTheme() {
      var attr = document.documentElement.getAttribute("data-theme");
      if (attr) return attr;
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }

    function getEffectiveLang() {
      return document.documentElement.getAttribute("data-lang") || "en";
    }

    function updateImages() {
      var theme = getEffectiveTheme();
      var lang = getEffectiveLang();
      var images = document.querySelectorAll("img[data-img]");
      for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.img + "-" + theme + "-" + lang + ".png";
      }
    }

    function updateThemeIcon() {
      if (!themeBtn) return;
      var theme = getEffectiveTheme();
      if (theme === "dark") {
        themeBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      } else {
        themeBtn.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
    }

    function updateLangButton() {
      if (!langBtn) return;
      var lang = getEffectiveLang();
      langBtn.textContent = lang === "fr" ? "\uD83C\uDDEB\uD83C\uDDF7" : "\uD83C\uDDEC\uD83C\uDDE7";
    }

    function update() {
      updateThemeIcon();
      updateLangButton();
      updateImages();
    }

    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = getEffectiveTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        update();
      });
    }

    if (langBtn) {
      langBtn.addEventListener("click", function () {
        var next = getEffectiveLang() === "fr" ? "en" : "fr";
        document.documentElement.setAttribute("data-lang", next);
        localStorage.setItem("lang", next);
        update();
      });
    }

    update();
  });
})();
