// superadmin.js — orchestration site restricted to super_admin
(function () {
  "use strict";
  const API = (window.adminAuth && window.adminAuth.API_BASE) || "https://urielthebigboss-seirousgamecatalogue.hf.space";
  const TOKEN_KEY = "admin_token";
  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const authH = () => ({ Authorization: "Bearer " + getToken() });
  const jsonH = () => ({ "Content-Type": "application/json", Authorization: "Bearer " + getToken() });

  // GET avec ré-essai automatique sur 401 (la validation du token Supabase
  // peut throttler quand plusieurs requêtes partent en même temps).
  async function saGet(path, tries) {
    tries = tries || 4;
    for (var i = 0; i < tries; i++) {
      try {
        var r = await fetch(API + path, { headers: authH() });
        if (r.status !== 401) return r;
      } catch (e) { if (i === tries - 1) throw e; }
      await new Promise(function (res) { setTimeout(res, 300 * (i + 1)); });
    }
    return fetch(API + path, { headers: authH() });
  }

  let ALL_USERS = [];

  /* ---------- helpers ---------- */
  function icons() { if (window.lucide) lucide.createIcons(); }
  function toast(msg, ok = true) {
    const t = document.getElementById("sa-toast");
    t.textContent = msg;
    t.style.background = ok ? "#059669" : "#dc2626";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  }
  function avatarUrl(id) { const n = parseInt(id, 10); return (n >= 1 && n <= 12) ? ("assets/avatars/avatar-" + n + ".png") : null; }
  function initials(s) { return (s || "?").trim().slice(0, 2).toUpperCase(); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ---------- gate ---------- */
  const gate = document.getElementById("sa-gate");
  const main = document.getElementById("sa-main");
  const gErr = document.getElementById("sa-gate-error");

  async function checkSuper(token) {
    if (!token) return null;
    try {
      const r = await fetch(API + "/superadmin/me", { headers: { Authorization: "Bearer " + token } });
      if (r.ok) return await r.json();
      return r.status === 403 ? "forbidden" : null;
    } catch (_) { return null; }
  }

  function showGate(msg) {
    gate.style.display = "flex";
    main.style.display = "none";
    if (msg) { gErr.textContent = msg; gErr.classList.add("show"); }
  }
  function showDashboard(me) {
    gate.style.display = "none";
    main.style.display = "block";
    document.getElementById("sa-user-email").textContent = me.mail || "";
    document.getElementById("sa-user-name").textContent = (me.mail || "").split("@")[0];
    icons();
    // Chargement séquentiel : évite la rafale de validations de token.
    loadAdmins().then(function () { return loadUsers(); });
  }

  (async function boot() {
    const me = await checkSuper(getToken());
    if (me && me !== "forbidden") showDashboard(me);
    else if (me === "forbidden") { localStorage.removeItem(TOKEN_KEY); showGate("This account is not a super administrator."); }
    else showGate();
    icons();
  })();

  document.getElementById("sa-gate-eye").addEventListener("click", () => {
    const i = document.getElementById("sa-gate-pw");
    i.type = i.type === "password" ? "text" : "password";
  });

  document.getElementById("sa-gate-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    gErr.classList.remove("show");
    const email = document.getElementById("sa-gate-email").value.trim();
    const password = document.getElementById("sa-gate-pw").value;
    const btn = document.getElementById("sa-gate-submit");
    if (!email || !password) { gErr.textContent = "Enter your email and password."; gErr.classList.add("show"); return; }
    btn.disabled = true; btn.textContent = "Signing in…";
    try {
      const res = await fetch(API + "/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!res.ok) { gErr.textContent = "Incorrect email or password."; gErr.classList.add("show"); return; }
      const data = await res.json();
      const token = data.access_token;
      const me = await checkSuper(token);
      if (me && me !== "forbidden") { localStorage.setItem(TOKEN_KEY, token); showDashboard(me); }
      else if (me === "forbidden") { gErr.textContent = "Super administrator access only."; gErr.classList.add("show"); }
      else { gErr.textContent = "Server unreachable."; gErr.classList.add("show"); }
    } catch (_) { gErr.textContent = "Server unreachable."; gErr.classList.add("show"); }
    finally { btn.disabled = false; btn.textContent = "Sign In"; }
  });

  document.getElementById("sa-logout").addEventListener("click", () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "index.html";
  });

  /* ---------- tabs ---------- */
  const tabs = { admins: "view-admins", users: "view-users" };
  document.querySelectorAll(".admin-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.tab;
      document.querySelectorAll(".admin-tab").forEach(b => b.className = "admin-tab " + (b === btn ? "active" : "inactive"));
      Object.entries(tabs).forEach(([k, id]) => { document.getElementById(id).style.display = (k === t) ? "block" : "none"; });
    });
  });

  /* ---------- ADMINS ---------- */
  async function loadAdmins() {
    const box = document.getElementById("admins-list");
    box.innerHTML = '<p class="sa-sub">Loading…</p>';
    try {
      const r = await saGet("/superadmin/admins");
      if (!r.ok) { box.innerHTML = '<p class="sa-sub">Unable to load administrators.</p>'; return; }
      const data = await r.json();
      renderAdmins(data.admins || []);
    } catch (_) { box.innerHTML = '<p class="sa-sub">Server unreachable.</p>'; }
  }

  function renderAdmins(admins) {
    const box = document.getElementById("admins-list");
    if (!admins.length) { box.innerHTML = '<p class="sa-sub">No administrators.</p>'; return; }
    box.innerHTML = admins.map(a => {
      const isSuper = (a.role === "super_admin");
      const roleTag = isSuper ? '<span class="role-tag role-super">Super admin</span>' : '<span class="role-tag role-admin">Admin</span>';
      const me = a.is_me ? ' <span class="sa-sub" style="display:inline;">(you)</span>' : '';
      let actions = "";
      if (isSuper) actions += a.is_me ? "" : '<button class="sa-pill pill-demote" data-act="demote" data-id="' + a.id + '">Demote</button>';
      else actions += '<button class="sa-pill pill-promote" data-act="promote" data-id="' + a.id + '">Promote to super</button>';
      if (!a.is_me) actions += '<button class="sa-pill pill-del" data-act="del-admin" data-id="' + a.id + '" data-mail="' + esc(a.mail) + '">Delete</button>';
      return '<div class="sa-row">'
        + '<div class="sa-ava">' + initials(a.mail) + '</div>'
        + '<div class="sa-row-main"><p class="sa-row-title">' + esc(a.mail) + me + '</p><p class="sa-row-meta">' + roleTag + '</p></div>'
        + '<div class="sa-actions">' + actions + '</div></div>';
    }).join("");
    box.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", onAdminAction));
  }

  async function onAdminAction(e) {
    const b = e.currentTarget, id = b.dataset.id, act = b.dataset.act;
    if (act === "promote") return setRole(id, "super_admin");
    if (act === "demote") return setRole(id, "admin");
    if (act === "del-admin") {
      if (!confirm("Permanently delete administrator " + (b.dataset.mail || "") + "?")) return;
      try {
        const r = await fetch(API + "/superadmin/admins/" + id, { method: "DELETE", headers: authH() });
        if (r.ok) { toast("Administrator deleted."); loadAdmins(); }
        else { const d = await r.json().catch(() => ({})); toast(d.detail || "Failed.", false); }
      } catch (_) { toast("Server unreachable.", false); }
    }
  }

  async function setRole(id, role) {
    try {
      const r = await fetch(API + "/superadmin/admins/" + id + "/role", { method: "PATCH", headers: jsonH(), body: JSON.stringify({ role }) });
      if (r.ok) { toast(role === "super_admin" ? "Promoted to super admin." : "Demoted to admin."); loadAdmins(); }
      else { const d = await r.json().catch(() => ({})); toast(d.detail || "Failed.", false); }
    } catch (_) { toast("Server unreachable.", false); }
  }

  document.getElementById("create-admin-btn").addEventListener("click", async () => {
    const email = document.getElementById("new-admin-email").value.trim();
    const role = document.getElementById("new-admin-role").value;
    const pw = document.getElementById("new-admin-pw").value.trim();
    const msg = document.getElementById("create-admin-msg");
    const show = (t, ok) => { msg.style.display = "block"; msg.textContent = t; msg.style.color = ok ? "#059669" : "#dc2626"; };
    if (!email) { show("Enter an email.", false); return; }
    const btn = document.getElementById("create-admin-btn");
    btn.disabled = true;
    try {
      const body = { email, role }; if (pw) body.password = pw;
      const r = await fetch(API + "/superadmin/admins", { method: "POST", headers: jsonH(), body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { show(d.detail || "Unable to create account.", false); return; }
      show("Account created ✓", true);
      document.getElementById("new-admin-email").value = "";
      document.getElementById("new-admin-pw").value = "";
      openCredModal(d);
      loadAdmins();
    } catch (_) { show("Server unreachable.", false); }
    finally { btn.disabled = false; }
  });

  /* ---------- USERS ---------- */
  async function loadUsers() {
    const box = document.getElementById("users-list");
    box.innerHTML = '<p class="sa-sub">Loading…</p>';
    try {
      const r = await saGet("/superadmin/users");
      if (!r.ok) { box.innerHTML = '<p class="sa-sub">Unable to load users.</p>'; return; }
      const data = await r.json();
      ALL_USERS = data.users || [];
      renderUsers();
    } catch (_) { box.innerHTML = '<p class="sa-sub">Server unreachable.</p>'; }
  }

  function renderUsers() {
    const box = document.getElementById("users-list");
    const q = (document.getElementById("users-search").value || "").toLowerCase().trim();
    const list = ALL_USERS.filter(u => !q || (u.mail || "").toLowerCase().includes(q) || (u.pseudo || "").toLowerCase().includes(q));
    if (!list.length) { box.innerHTML = '<p class="sa-sub">No users.</p>'; return; }
    box.innerHTML = list.map(u => {
      const av = avatarUrl(u.img_profil);
      const avHtml = av ? '<img class="sa-ava" src="' + av + '" alt="">' : '<div class="sa-ava">' + initials(u.pseudo || u.mail) + '</div>';
      const meta = [u.pays, u.year_born].filter(Boolean).join(" · ");
      const banTag = u.banned ? ' <span class="tag-ban">Banned</span>' : "";
      const banBtn = u.banned
        ? '<button class="sa-pill pill-unban" data-act="unban" data-id="' + u.id + '">Unban</button>'
        : '<button class="sa-pill pill-ban" data-act="ban" data-id="' + u.id + '">Ban</button>';
      return '<div class="sa-row">' + avHtml
        + '<div class="sa-row-main"><p class="sa-row-title">' + esc(u.pseudo || "—") + banTag + '</p>'
        + '<p class="sa-row-meta">' + esc(u.mail) + (meta ? " · " + esc(meta) : "") + '</p></div>'
        + '<div class="sa-actions">' + banBtn
        + '<button class="sa-pill pill-del" data-act="del-user" data-id="' + u.id + '" data-mail="' + esc(u.mail) + '">Delete</button>'
        + '</div></div>';
    }).join("");
    box.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", onUserAction));
  }

  document.getElementById("users-search").addEventListener("input", renderUsers);

  async function onUserAction(e) {
    const b = e.currentTarget, id = b.dataset.id, act = b.dataset.act;
    if (act === "del-user") {
      if (!confirm("Permanently delete user " + (b.dataset.mail || "") + "?")) return;
      return doUser("DELETE", "/superadmin/users/" + id, "User deleted.");
    }
    if (act === "ban") return doUser("POST", "/superadmin/users/" + id + "/ban", "User banned.");
    if (act === "unban") return doUser("POST", "/superadmin/users/" + id + "/unban", "User unbanned.");
  }

  async function doUser(method, path, okMsg) {
    try {
      const r = await fetch(API + path, { method, headers: authH() });
      if (r.ok) { toast(okMsg); loadUsers(); }
      else { const d = await r.json().catch(() => ({})); toast(d.detail || "Failed.", false); }
    } catch (_) { toast("Server unreachable.", false); }
  }

  /* ---------- ACCESS CARD (PNG) ---------- */
  let lastCreds = null;
  function openCredModal(d) {
    lastCreds = d;
    document.getElementById("cred-email").textContent = d.email || "";
    document.getElementById("cred-pw").textContent = d.password || "";
    document.getElementById("cred-role").textContent = d.role === "super_admin" ? "Super admin" : "Admin";
    document.getElementById("cred-date").textContent = d.created_at || "";
    document.getElementById("cred-modal").classList.add("open");
    icons();
  }
  function closeCred() { document.getElementById("cred-modal").classList.remove("open"); }
  document.getElementById("cred-close-bg").addEventListener("click", closeCred);
  document.getElementById("cred-done").addEventListener("click", closeCred);

  document.getElementById("cred-download").addEventListener("click", () => {
    if (!lastCreds) return;
    const c = document.getElementById("cred-canvas");
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#7c3aed"); g.addColorStop(.55, "#4f46e5"); g.addColorStop(1, "#2563eb");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,.10)"; ctx.beginPath(); ctx.arc(W - 60, 60, 130, 0, 7); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "900 30px system-ui, sans-serif"; ctx.fillText("ADMINISTRATOR ACCESS", 40, 64);
    ctx.font = "700 15px system-ui, sans-serif"; ctx.fillStyle = "rgba(255,255,255,.85)";
    ctx.fillText("Serious Game Catalogue — Confidential", 40, 92);
    const card = (label, value, y) => {
      ctx.fillStyle = "rgba(255,255,255,.14)"; roundRect(ctx, 40, y, W - 80, 56, 14); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "800 12px system-ui, sans-serif"; ctx.fillText(label.toUpperCase(), 58, y + 22);
      ctx.fillStyle = "#fff"; ctx.font = "800 19px system-ui, sans-serif"; ctx.fillText(value, 58, y + 45);
    };
    card("Email", lastCreds.email || "", 124);
    card("Password", lastCreds.password || "", 190);
    card("Role", lastCreds.role === "super_admin" ? "Super admin" : "Admin", 256);
    ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.font = "700 14px system-ui, sans-serif";
    ctx.fillText("Created on " + (lastCreds.created_at || ""), 40, 350);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "admin-access-" + (lastCreds.email || "account").replace(/[^a-z0-9]/gi, "_") + ".png";
    a.click();
  });

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
})();
