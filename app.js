/**
 * app.js — JomShuttle SPA Logic
 *
 * Handles:
 *  - Rendering all UI from data.js
 *  - Language switching (EN / MS)
 *  - Dark / Light mode (persisted in localStorage)
 *  - Form validation with honeypot anti-spam
 *  - WhatsApp booking link generation
 *  - EmailJS submission
 *  - State modal
 *  - Scroll-spy, AOS, navbar behaviour
 */

(function () {
  "use strict";

  /* ── State ───────────────────────────────────────────────── */
  let lang  = localStorage.getItem("js_lang")  || "en";
  let theme = localStorage.getItem("js_theme") || "light";

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const t  = (key) => DATA.i18n[lang][key] || key;
  const RM = (n)   => `RM ${n}`;

  function showToast(msg, dur = 3000) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), dur);
  }

  /* ── Theme ───────────────────────────────────────────────── */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    $("#theme-btn").textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("js_theme", theme);
  }
  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme();
  }

  /* ── Language ────────────────────────────────────────────── */
  function applyLang() {
    document.documentElement.lang = lang;
    $("#lang-btn").textContent     = lang === "en" ? "BM" : "EN";
    localStorage.setItem("js_lang", lang);
    renderAll();
  }
  function toggleLang() {
    lang = lang === "en" ? "ms" : "en";
    applyLang();
  }

  /* ── i18n: update static data-i18n elements ──────────────── */
  function applyI18n() {
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (DATA.i18n[lang][key]) el.textContent = DATA.i18n[lang][key];
    });
  }

  /* ── NAVBAR ──────────────────────────────────────────────── */
  function renderNav() {
    const links = [
      { key: "nav_home",     href: "#hero"     },
      { key: "nav_services", href: "#services" },
      { key: "nav_states",   href: "#states"   },
      { key: "nav_tours",    href: "#tours"    },
    ];

    const linksHTML = links.map(l =>
      `<a href="${l.href}" class="nav-link">${t(l.key)}</a>`
    ).join("");

    $("#nav-links").innerHTML = linksHTML;
    $("#mobile-menu").innerHTML = linksHTML +
      `<a href="#booking" class="nav-cta">${t("nav_book")}</a>`;
    $("#nav-book-btn").textContent = t("nav_book");
  }

  // Hamburger toggle
  function initHamburger() {
    const btn  = $("#hamburger");
    const menu = $("#mobile-menu");
    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
    // Close on link click
    menu.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll effects
  function initScrollEffects() {
    const navbar = $("#navbar");
    const scrollBtn = $("#scroll-top");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
      scrollBtn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
  }

  // Active link scroll spy
  function initScrollSpy() {
    const sections = ["hero","services","states","tours","booking"];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          $$(".nav-link").forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* ── AOS (Animate on Scroll) ─────────────────────────────── */
  function initAOS() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    $$("[data-aos]").forEach(el => observer.observe(el));
  }

  /* ── HERO ────────────────────────────────────────────────── */
  function renderHero() {
    $("#hero-badge").textContent  = "✈️ " + t("hero_tag");
    $("#hero-h1").innerHTML       = t("hero_h1").replace("\n", "<br>");
    $("#hero-sub").textContent    = t("hero_sub");
    $("#hero-cta").textContent    = t("hero_cta");
    $("#hero-cta2").textContent   = t("hero_cta2");
    // WhatsApp link
    const waMsg = encodeURIComponent("Hello JomShuttle! I'd like to book a transfer.");
    $("#hero-wa-btn").href = `https://wa.me/${DATA.whatsapp}?text=${waMsg}`;
  }

  /* ── SEARCH BAR ──────────────────────────────────────────── */
  function renderSearchBar() {
    const opts = DATA.states.map(s =>
      `<option value="${s.id}">${s.name[lang]}</option>`
    ).join("");
    const pickup = $("#s-pickup");
    const dest   = $("#s-dest");
    if (!pickup || !dest) return;
    pickup.innerHTML = `<option value="">-- From --</option>` + opts;
    dest.innerHTML   = `<option value="">-- To --</option>` + opts;

    // Set minimum date to today
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minDT = now.toISOString().slice(0,16);
    const dateEl = $("#s-date");
    if (dateEl) dateEl.min = minDT;
  }

  /* ── SERVICES ────────────────────────────────────────────── */
  function renderServices() {
    const grid = $("#services-grid");
    if (!grid) return;
    grid.innerHTML = DATA.services.map(s => `
      <div class="service-card fade-in" data-aos>
        <div class="svc-icon" aria-hidden="true">${s.icon}</div>
        <h3>${s.title[lang]}</h3>
        <p>${s.desc[lang]}</p>
        <div class="svc-price">
          ${t("from")} <strong>${RM(s.priceFrom)}</strong>${t("per_trip")}
        </div>
      </div>
    `).join("");
  }

  /* ── STATES GRID ─────────────────────────────────────────── */
  function renderStates() {
    const grid = $("#states-grid");
    if (!grid) return;
    grid.innerHTML = DATA.states.map(s => `
      <div class="state-card" role="button" tabindex="0"
           aria-label="Book transfer to ${s.name[lang]}"
           onclick="App.openStateModal('${s.id}')"
           onkeydown="if(event.key==='Enter')App.openStateModal('${s.id}')">
        <div class="state-thumb">
          <img src="${s.image}" alt="${s.alt}" loading="lazy" width="400" height="220" />
        </div>
        <div class="state-info">
          <h3>${s.name[lang]}</h3>
          <div class="state-price">
            ${t("from")} <strong>${RM(s.priceFrom)}</strong>${t("per_trip")}
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ── TOURS ───────────────────────────────────────────────── */
  function renderTours() {
    const grid = $("#tours-grid");
    if (!grid) return;
    grid.innerHTML = DATA.tours.map(tour => `
      <div class="tour-card">
        <div class="tour-thumb">
          <img src="${tour.image}" alt="${tour.alt}" loading="lazy" width="600" height="312" />
          <div class="tour-badge">${tour.duration[lang]}</div>
        </div>
        <div class="tour-body">
          <h3>${tour.name[lang]}</h3>
          <ul class="tour-highlights" aria-label="${t("highlights")}">
            ${tour.highlights[lang].map(h => `<li>${h}</li>`).join("")}
          </ul>
          <div class="tour-footer">
            <div class="tour-price">
              <div><strong>${RM(tour.priceFrom)}</strong></div>
              <span>${t("from")} ${t("per_trip")}</span>
            </div>
            <button class="btn-book-tour"
              onclick="App.bookTour('${tour.id}')"
              aria-label="Book ${tour.name[lang]}">
              ${t("book_this")}
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ── WHY US ──────────────────────────────────────────────── */
  function renderWhyUs() {
    const grid = $("#why-grid");
    if (!grid) return;
    grid.innerHTML = DATA.whyUs.map(w => `
      <div class="why-item" data-aos>
        <div class="why-icon" aria-hidden="true">${w.icon}</div>
        <p>${w[lang]}</p>
      </div>
    `).join("");
  }

  /* ── BOOKING FORM ────────────────────────────────────────── */
  function renderForm() {
    // Populate service select
    const sel = $("#f-service");
    if (!sel) return;
    sel.innerHTML = `<option value="">-- ${lang === "en" ? "Select" : "Pilih"} --</option>` +
      DATA.services.map(s =>
        `<option value="${s.id}">${s.title[lang]}</option>`
      ).join("");

    // Set min date
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const dateEl = $("#f-date");
    if (dateEl) dateEl.min = now.toISOString().slice(0,16);
  }

  /* ── FOOTER ──────────────────────────────────────────────── */
  function renderFooter() {
    $("#footer-tagline").textContent = t("footer_tagline");
    $("#year").textContent = new Date().getFullYear();

    // States (first 6)
    const fsEl = $("#footer-states");
    if (fsEl) {
      fsEl.innerHTML = DATA.states.slice(0,6).map(s =>
        `<a href="#states" onclick="App.openStateModal('${s.id}')">${s.name[lang]}</a>`
      ).join("");
    }

    // Services
    const fsvEl = $("#footer-services");
    if (fsvEl) {
      fsvEl.innerHTML = DATA.services.map(s =>
        `<a href="#booking">${s.title[lang]}</a>`
      ).join("") + `<a href="#tours">${t("nav_tours")}</a>`;
    }

    // Social
    const social = $("#footer-social");
    if (social) {
      const icons = {
        facebook:  "f",
        instagram: "📷",
        tiktok:    "♪",
      };
      social.innerHTML = Object.entries(DATA.social).map(([name, url]) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer"
            class="social-btn" aria-label="${name}">
          ${icons[name] || name[0].toUpperCase()}
        </a>`
      ).join("");
    }
  }

  /* ── MODAL ───────────────────────────────────────────────── */
  function openStateModal(stateId) {
    const state = DATA.states.find(s => s.id === stateId);
    if (!state) return;

    const modal   = $("#modal");
    const title   = $("#modal-title");
    const price   = $("#modal-price");
    const destsEl = $("#modal-destinations");

    title.textContent = state.name[lang];
    price.innerHTML   = `${t("from")} <strong>${RM(state.priceFrom)}</strong>${t("per_trip")}`;

    destsEl.innerHTML = state.destinations.map(d => `
      <div class="dest-chip" role="button" tabindex="0"
           onclick="App.bookToDestination('${state.name[lang]}', '${d}')"
           onkeydown="if(event.key==='Enter')App.bookToDestination('${state.name[lang]}','${d}')">
        📍 ${d}
      </div>
    `).join("");

    modal.classList.add("open");
    modal.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    $("#modal").classList.remove("open");
    document.body.style.overflow = "";
  }

  // Close on overlay click
  function initModal() {
    $("#modal").addEventListener("click", e => {
      if (e.target === $("#modal")) closeModal();
    });
    $("#modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ── WHATSAPP BOOKING ────────────────────────────────────── */

  /**
   * Builds a WhatsApp link from booking details.
   * To update the WhatsApp number, change DATA.whatsapp in data.js.
   */
  function buildWALink(details) {
    const msg = [
      `🚐 *JomShuttle Booking Request*`,
      ``,
      `👤 Name: ${details.name}`,
      `📞 Phone: ${details.phone}`,
      `📍 Pickup: ${details.pickup}`,
      `🏁 Destination: ${details.destination}`,
      `📅 Date & Time: ${details.date}`,
      `🚌 Service: ${details.service}`,
      `👥 Passengers: ${details.pax}`,
      details.notes ? `📝 Notes: ${details.notes}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function bookToDestination(stateName, dest) {
    closeModal();
    // Pre-fill form
    $("#f-dest").value   = `${dest}, ${stateName}`;
    $("#f-pickup").value = "KLIA / KLIA2";
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }

  function bookTour(tourId) {
    const tour = DATA.tours.find(t => t.id === tourId);
    if (!tour) return;
    const msg = encodeURIComponent(
      `🗺️ *JomShuttle Tour Inquiry*\n\nI'm interested in the *${tour.name[lang]}* tour package.\nPlease share more details!`
    );
    window.open(`https://wa.me/${DATA.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
  }

  /* ── FORM VALIDATION ─────────────────────────────────────── */
  function validateForm() {
    let valid = true;

    const fields = [
      { id: "f-name",    errId: "err-name",    test: v => v.trim().length >= 2 },
      { id: "f-phone",   errId: "err-phone",   test: v => /^[+\d\s\-]{8,20}$/.test(v.trim()) },
      { id: "f-pickup",  errId: "err-pickup",  test: v => v.trim().length >= 2 },
      { id: "f-dest",    errId: "err-dest",    test: v => v.trim().length >= 2 },
      { id: "f-date",    errId: "err-date",    test: v => !!v },
      { id: "f-service", errId: "err-service", test: v => !!v },
    ];

    fields.forEach(({ id, errId, test }) => {
      const el  = document.getElementById(id);
      const err = document.getElementById(errId);
      const ok  = el && test(el.value);
      el && el.classList.toggle("error", !ok);
      if (err) err.classList.toggle("show", !ok);
      if (!ok) valid = false;
    });

    return valid;
  }

  function clearErrors() {
    $$(".error").forEach(el => el.classList.remove("error"));
    $$(".form-error.show").forEach(el => el.classList.remove("show"));
  }

  function getFormData() {
    const svcSelect = $("#f-service");
    const svcLabel  = svcSelect.options[svcSelect.selectedIndex]?.text || "";
    const rawDate   = $("#f-date").value;
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleString("en-MY", { dateStyle: "full", timeStyle: "short" })
      : "";

    return {
      name:        $("#f-name").value.trim(),
      phone:       $("#f-phone").value.trim(),
      pickup:      $("#f-pickup").value.trim(),
      destination: $("#f-dest").value.trim(),
      date:        formattedDate,
      service:     svcLabel,
      pax:         $("#f-pax").value,
      notes:       $("#f-notes").value.trim(),
      email:       $("#f-email").value.trim(),
    };
  }

  /** Honeypot check — if filled, silently block submission */
  function isBot() {
    return ($("#hp_website")?.value || "") !== "";
  }

  function handleWASubmit() {
    clearErrors();
    if (isBot()) return; // silent drop
    if (!validateForm()) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }
    const data = getFormData();
    const url  = buildWALink(data);
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("✅ Opening WhatsApp...");
    resetForm();
  }

  function handleEmailSubmit() {
    clearErrors();
    if (isBot()) return;
    if (!validateForm()) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }
    const data = getFormData();
    if (!data.email) {
      showToast("📧 Please add your email to use this option.");
      $("#f-email").focus();
      return;
    }

    const msgEl = $("#form-msg");
    msgEl.className = "form-msg";
    msgEl.textContent = "Sending...";
    msgEl.style.display = "block";

    // EmailJS — replace placeholders in data.js (emailjs object)
    if (typeof emailjs !== "undefined" && DATA.emailjs.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
      emailjs.init(DATA.emailjs.publicKey);
      emailjs.send(DATA.emailjs.serviceId, DATA.emailjs.templateId, {
        from_name:   data.name,
        from_phone:  data.phone,
        from_email:  data.email,
        pickup:      data.pickup,
        destination: data.destination,
        travel_date: data.date,
        service:     data.service,
        passengers:  data.pax,
        notes:       data.notes,
      }).then(() => {
        msgEl.className = "form-msg success";
        msgEl.textContent = "✅ Booking sent! We'll contact you shortly.";
        resetForm();
      }).catch(err => {
        console.error("EmailJS error:", err);
        msgEl.className = "form-msg error";
        msgEl.textContent = "❌ Failed to send. Please try WhatsApp instead.";
      });
    } else {
      // Fallback: open mailto
      const mailto = `mailto:info@jomshuttle.com?subject=JomShuttle Booking - ${data.name}&body=` +
        encodeURIComponent(
          `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n` +
          `Pickup: ${data.pickup}\nDestination: ${data.destination}\n` +
          `Date: ${data.date}\nService: ${data.service}\nPassengers: ${data.pax}\nNotes: ${data.notes}`
        );
      window.location.href = mailto;
      msgEl.className = "form-msg success";
      msgEl.textContent = "✅ Opening your email client...";
      resetForm();
    }
  }

  function resetForm() {
    setTimeout(() => {
      $("#booking-form").reset();
      clearErrors();
    }, 1500);
  }

  /* ── QUICK SEARCH ────────────────────────────────────────── */
  function quickSearch() {
    const from = $("#s-pickup")?.value;
    const to   = $("#s-dest")?.value;
    const date = $("#s-date")?.value;

    if (!from || !to) {
      showToast("Please select origin and destination.");
      return;
    }
    if (from === to) {
      showToast("Origin and destination can't be the same.");
      return;
    }

    const fromState = DATA.states.find(s => s.id === from);
    const toState   = DATA.states.find(s => s.id === to);

    // Pre-fill booking form
    $("#f-pickup").value  = fromState?.name[lang] || from;
    $("#f-dest").value    = toState?.name[lang]   || to;
    if (date) {
      const localDate = date; // datetime-local format compatible
      $("#f-date").value = localDate;
    }

    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    showToast(`🔍 Showing transfers: ${fromState?.name[lang]} → ${toState?.name[lang]}`);
  }

  /* ── RENDER ALL ──────────────────────────────────────────── */
  function renderAll() {
    renderNav();
    renderHero();
    renderSearchBar();
    renderServices();
    renderStates();
    renderTours();
    renderWhyUs();
    renderFooter();
    renderForm();
    applyI18n();
    initAOS();
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    applyTheme();
    renderAll();
    initHamburger();
    initScrollEffects();
    initScrollSpy();
    initModal();

    // Controls
    $("#theme-btn").addEventListener("click", toggleTheme);
    $("#lang-btn").addEventListener("click", toggleLang);

    // Form buttons
    $("#btn-wa-submit").addEventListener("click", handleWASubmit);
    $("#btn-email-submit").addEventListener("click", handleEmailSubmit);

    // Clear errors on input
    $$("#booking-form input, #booking-form select, #booking-form textarea").forEach(el => {
      el.addEventListener("input", () => {
        el.classList.remove("error");
        const errEl = document.getElementById("err-" + el.id.replace("f-", ""));
        if (errEl) errEl.classList.remove("show");
      });
    });

    // Logo / nav home
    $("#nav-logo-link").addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Expose public API for inline onclick handlers
  window.App = {
    openStateModal,
    bookToDestination,
    bookTour,
    quickSearch,
  };

  // Bootstrap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
