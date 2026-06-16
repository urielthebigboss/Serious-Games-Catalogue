// admin-auth.js
// Admin login wired to the FastAPI backend.
// - Footer "ADMIN ACCESS" opens a login popup (English, with password visibility toggle)
// - Calls POST /auth/login, stores the token, then opens admin.html
// - Protects admin.html: without a valid token -> back to home

(function () {
  "use strict";

  const API_BASE = "https://urielthebigboss-seirousgamecatalogue.hf.space";
  const TOKEN_KEY = "admin_token";

  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
  const clearToken = () => localStorage.removeItem(TOKEN_KEY);

  window.adminAuth = {
    API_BASE,
    getToken,
    clearToken,
    authHeaders: () => ({ Authorization: "Bearer " + getToken() }),
  };

  function injectModal() {
    if (document.getElementById("admin-login-modal")) return;

    const style = document.createElement("style");
    style.textContent = `
      #admin-login-modal{position:fixed;inset:0;z-index:9999;display:none;
        align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;}
      #admin-login-modal.open{display:flex;}
      #admin-login-modal .al-backdrop{position:absolute;inset:0;
        background:rgba(15,23,42,.55);backdrop-filter:blur(4px);}
      #admin-login-modal .al-panel{position:relative;width:92%;max-width:420px;
        background:#fff;border-radius:24px;padding:2.5rem 2rem;
        box-shadow:0 25px 60px rgba(0,0,0,.25);animation:alPop .25s ease;}
      @keyframes alPop{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
      #admin-login-modal .al-close{position:absolute;top:1rem;right:1rem;border:none;
        background:#f3f4f6;border-radius:50%;width:36px;height:36px;cursor:pointer;
        font-size:18px;color:#6b7280;display:flex;align-items:center;justify-content:center;}
      #admin-login-modal .al-icon{width:64px;height:64px;border-radius:18px;margin:0 auto 1rem;
        display:flex;align-items:center;justify-content:center;background:#eef2ff;color:#4f46e5;}
      #admin-login-modal h2{text-align:center;margin:0;font-size:1.4rem;font-weight:800;color:#111827;}
      #admin-login-modal .al-sub{text-align:center;color:#9ca3af;font-size:.85rem;
        margin:.35rem 0 1.75rem;font-weight:600;}
      #admin-login-modal label{display:block;font-size:11px;font-weight:800;text-transform:uppercase;
        letter-spacing:.08em;color:#6b7280;margin-bottom:.4rem;}
      #admin-login-modal input{width:100%;box-sizing:border-box;padding:.8rem 1rem;
        border:1.5px solid #e5e7eb;border-radius:12px;font-size:.95rem;margin-bottom:1.1rem;
        transition:border-color .15s;}
      #admin-login-modal input:focus{outline:none;border-color:#4f46e5;}
      #admin-login-modal .al-pw-wrap{position:relative;}
      #admin-login-modal .al-pw-wrap input{padding-right:2.8rem;}
      #admin-login-modal .al-eye{position:absolute;top:.7rem;right:.6rem;width:32px;height:32px;
        border:none;background:transparent;cursor:pointer;color:#9ca3af;display:flex;
        align-items:center;justify-content:center;border-radius:8px;}
      #admin-login-modal .al-eye:hover{color:#4f46e5;background:#f3f4f6;}
      #admin-login-modal .al-submit{width:100%;padding:.9rem;border:none;border-radius:12px;
        background:#4f46e5;color:#fff;font-weight:800;font-size:.9rem;letter-spacing:.05em;
        text-transform:uppercase;cursor:pointer;transition:background .15s;}
      #admin-login-modal .al-submit:hover{background:#4338ca;}
      #admin-login-modal .al-submit:disabled{opacity:.6;cursor:not-allowed;}
      #admin-login-modal .al-error{display:none;background:#fef2f2;color:#dc2626;
        border:1px solid #fecaca;border-radius:10px;padding:.6rem .8rem;font-size:.8rem;
        font-weight:600;margin-bottom:1rem;text-align:center;}
      #admin-login-modal .al-error.show{display:block;}
    `;
    document.head.appendChild(style);

    const eyeOpen = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const eyeOff = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    const modal = document.createElement("div");
    modal.id = "admin-login-modal";
    modal.innerHTML = `
      <div class="al-backdrop" data-al-close></div>
      <div class="al-panel">
        <button class="al-close" data-al-close aria-label="Close">&times;</button>
        <div class="al-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h2>Admin Access</h2>
        <p class="al-sub">Sign in to manage the catalog</p>
        <div class="al-error" id="al-error"></div>
        <form id="al-form">
          <label for="al-email">Email</label>
          <input type="email" id="al-email" placeholder="admin@example.com" required autocomplete="username" />
          <label for="al-password">Password</label>
          <div class="al-pw-wrap">
            <input type="password" id="al-password" placeholder="••••••••" required autocomplete="current-password" />
            <button type="button" class="al-eye" id="al-eye" aria-label="Show password">${eyeOpen}</button>
          </div>
          <button type="submit" class="al-submit" id="al-submit">Sign In</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll("[data-al-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );
    modal.querySelector("#al-form").addEventListener("submit", onSubmit);

    // Password visibility toggle (eye)
    const eyeBtn = modal.querySelector("#al-eye");
    const pwInput = modal.querySelector("#al-password");
    eyeBtn.addEventListener("click", () => {
      const showing = pwInput.type === "text";
      pwInput.type = showing ? "password" : "text";
      eyeBtn.innerHTML = showing ? eyeOpen : eyeOff;
      eyeBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
  }

  function openModal() {
    injectModal();
    document.getElementById("admin-login-modal").classList.add("open");
    document.getElementById("al-email").focus();
  }

  function closeModal() {
    const m = document.getElementById("admin-login-modal");
    if (m) m.classList.remove("open");
    // Sur la page admin sans session valide : on renvoie à l'accueil au lieu de laisser une page vide.
    const dash = document.querySelector("main");
    if (location.pathname.endsWith("admin.html") && dash && dash.style.display === "none") {
      window.location.href = "index.html";
    }
  }

  function showError(msg) {
    const e = document.getElementById("al-error");
    e.textContent = msg;
    e.classList.add("show");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("al-email").value.trim();
    const password = document.getElementById("al-password").value;
    const btn = document.getElementById("al-submit");
    const err = document.getElementById("al-error");
    err.classList.remove("show");
    btn.disabled = true;
    btn.textContent = "Signing in…";

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        showError("Incorrect email or password.");
        return;
      }
      const data = await res.json();
      const token = data.access_token;
      // VÉRIFIE que ce compte est bien un administrateur AVANT de le laisser entrer.
      // (/auth/login délivre un token à tout compte valide ; seul /admin/me confirme le rôle admin)
      let meRes;
      try {
        meRes = await fetch(`${API_BASE}/admin/me`, { headers: { Authorization: "Bearer " + token } });
      } catch (_) {
        showError("Server unreachable. Is the backend running?");
        return;
      }
      if (!meRes.ok) {
        showError("This account is not an administrator.");
        return;   // on NE stocke PAS le token : aucun accès admin
      }
      setToken(token);
      window.location.href = "admin.html";
    } catch (_) {
      showError("Server unreachable. Is the backend running?");
    } finally {
      btn.disabled = false;
      btn.textContent = "Sign In";
    }
  }

  function wireFooterLink() {
    document.querySelectorAll('a[href$="admin.html"]').forEach((a) => {
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) { openModal(); return; }            // pas de session admin -> popup
        // Une session existe : on la revalide. Si elle n'est plus admin -> popup (jamais d'accès silencieux)
        try {
          const res = await fetch(`${API_BASE}/admin/me`, { headers: { Authorization: "Bearer " + token } });
          if (res.ok) { window.location.href = "admin.html"; }
          else { clearToken(); openModal(); }
        } catch (_) { openModal(); }
      });
    });
  }

  function hideAdminDashboard() {
    const m = document.querySelector("main");
    if (m) m.style.display = "none";
  }
  function showAdminDashboard() {
    const m = document.querySelector("main");
    if (m) m.style.display = "";
  }

  async function guardAdminPage() {
    if (!location.pathname.endsWith("admin.html")) return;
    hideAdminDashboard();                  // on masque le tableau de bord tant que l'admin n'est pas validé
    const token = getToken();
    if (!token) { openModal(); return; }   // pas de session -> formulaire de connexion SUR la page (jamais vide)
    try {
      const res = await fetch(`${API_BASE}/admin/me`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) { clearToken(); openModal(); return; }   // token non-admin/expiré -> on redemande la connexion
      const me = await res.json();
      fillAdminHeader(me);
      showAdminDashboard();                 // accès validé -> on révèle le tableau de bord
    } catch (_) {
      openModal();                          // backend injoignable -> on propose quand même la connexion
    }
  }

  function fillAdminHeader(me) {
    const emailEl = document.querySelector(".admin-user-email");
    if (emailEl && me.mail) emailEl.textContent = me.mail;
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireFooterLink();
    guardAdminPage();
  });
})();
