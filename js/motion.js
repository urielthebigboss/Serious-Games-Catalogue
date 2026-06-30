/* motion.js — mouvement transverse, posé par-dessus le design (additif).
   Désactivé si l'OS demande de réduire les animations. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function setup() {
    /* ---- Révélation au défilement : presque tous les blocs de contenu ---- */
    var sel = [
      "main h1", "main h2", "main h3", "main h4", "main p",
      ".game-card-link", ".game-card", ".profile-game-card", ".review-card", ".dev-card",
      ".sa-row", ".sa-card", ".admin-panel-card", ".admin-header", ".admin-tabs",
      ".filter-sections-space > div", ".sort-select-group", ".form-field-group",
      ".platform-grid", ".global-search-container", ".profile-avatar-card",
      ".profile-content", ".main-container", "table tr", ".footer-brand",
      ".footer-heading", ".footer-nav > a", ".gama-trigger", ".section-inner > *",
      ".eyebrow", ".section-title", "[data-motion]"
    ].join(",");
    var skipSel = ".animate-on-scroll, .auth-modal-content, #admin-gate, #sa-gate, .hero-section, nav.navbar, #cred-modal";

    var nodes = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) {
      if (el.closest(skipSel)) return false;
      if (el.classList.contains("motion-reveal")) return false;
      // ignorer les éléments cachés (modales / onglets fermés / écran de login)
      if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") return false;
      return true;
    });

    if ("IntersectionObserver" in window && nodes.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var d = (parseInt(e.target.dataset.mi, 10) || 0) * 55;
            setTimeout(function () { e.target.classList.add("motion-in"); }, d);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

      var counts = new Map();
      nodes.forEach(function (n) {
        var p = n.parentNode;
        var i = counts.get(p) || 0; counts.set(p, i + 1);
        n.dataset.mi = Math.min(i, 8);          // cascade par groupe de voisins
        n.classList.add("motion-reveal");
        io.observe(n);
      });

      // Filet de sécurité : tout révéler après 1,4 s même sans déclenchement.
      setTimeout(function () {
        document.querySelectorAll(".motion-reveal:not(.motion-in)").forEach(function (el) {
          el.classList.add("motion-in");
        });
      }, 1400);
    }

    /* ---- Apparition « pop » échelonnée des listes rendues en JS ---- */
    if ("MutationObserver" in window) {
      var grids = ["#games-grid", "#admins-list", "#users-list", "#view-reviews",
                   "#award-list", "#games-tbody", ".gama-reveal", "#pagination",
                   "#profile-content .games-grid", "#avatar-picker", "#signup-avatar-grid"];
      grids.forEach(function (s) {
        var box = document.querySelector(s);
        if (!box) return;
        bindPop(box);
      });
      // Conteneurs rendus plus tard (ex: grille de jeux du profil)
      var late = new MutationObserver(function () {
        ["#profile-content .games-grid"].forEach(function (s) {
          var b = document.querySelector(s);
          if (b && !b.__popBound) bindPop(b);
        });
      });
      var pc = document.getElementById("profile-content");
      if (pc) late.observe(pc, { childList: true, subtree: true });
    }

    function bindPop(box) {
      if (box.__popBound) return;
      box.__popBound = true;
      var mo = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          var i = 0;
          m.addedNodes.forEach(function (n) {
            if (n.nodeType === 1) {
              n.classList.add("motion-pop");
              n.style.animationDelay = (i * 50) + "ms";
              i++;
            }
          });
        });
      });
      mo.observe(box, { childList: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
})();
