/* =====================================================================
   Page behaviour: theme, navigation, career Gantt + experience cards,
   reveal/counters, copy buttons, portrait tilt, Formspree contact form.
   ===================================================================== */
(function () {
  "use strict";

  var R = window.RESUME;
  var U = window.RESUME_UTILS;
  var C = window.SITE_CONFIG || {};
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.querySelector("span").textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2400);
  }
  window.NM = window.NM || {};
  window.NM.toast = toast;

  /* ------------------------------------------------------------------
     Theme toggle (follows the system until the visitor chooses)
     ------------------------------------------------------------------ */
  var themeBtn = $("#theme-toggle");
  var mqLight = window.matchMedia("(prefers-color-scheme: light)");
  function currentTheme() {
    return root.getAttribute("data-theme") || (mqLight.matches ? "light" : "dark");
  }
  function syncTheme() {
    var t = currentTheme();
    if (!themeBtn) return;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    var sun = $(".icon--sun", themeBtn), moon = $(".icon--moon", themeBtn);
    /* SVG elements have no .hidden property, so toggle the attribute */
    if (sun) sun.toggleAttribute("hidden", t !== "dark");
    if (moon) moon.toggleAttribute("hidden", t === "dark");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("nm-theme", next); } catch (e) { /* storage unavailable */ }
      syncTheme();
    });
  }
  if (mqLight.addEventListener) mqLight.addEventListener("change", syncTheme);
  syncTheme();

  /* ------------------------------------------------------------------
     Numbers that keep themselves current
     ------------------------------------------------------------------ */
  if (R && U) {
    $$("[data-exp-years]").forEach(function (el) { el.textContent = U.totalYearsLabel(); });
  }
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ------------------------------------------------------------------
     Career Gantt (Primavera-style)
     ------------------------------------------------------------------ */
  function renderGantt() {
    var grid = $("#gantt-grid");
    if (!grid || !R || !U) return;

    var now = new Date();
    var y0 = 2016;
    var y1 = now.getFullYear() + (now.getMonth() >= 6 ? 2 : 1);
    var total = (y1 - y0) * 12;
    function xStart(ym) { var p = U.parse(ym); return ((p.y - y0) * 12 + (p.m - 1)) / total * 100; }
    function xEnd(ym) { var p = U.parse(ym); return ((p.y - y0) * 12 + p.m) / total * 100; }
    var xNow = ((now.getFullYear() - y0) * 12 + now.getMonth() + now.getDate() / 31) / total * 100;

    var rows = R.experience.map(function (j) {
      return {
        type: "bar", id: j.id, start: j.start, end: j.end,
        name: j.title, sub: j.company + (j.location ? " · " + j.location : ""),
        href: "#job-" + j.id,
        dur: U.duration(U.months(j.start, j.end))
      };
    });
    rows.push({ type: "ms", id: "M1000", start: "2016-06", name: "Diploma (DME)", sub: "St. Xavier's Polytechnic College", href: "#education", label: "2016" });
    rows.push({ type: "ms", id: "M1010", start: "2025-07", name: "B.E. completed", sub: "PSN Engineering College", href: "#education", label: "2025" });
    rows.sort(function (a, b) { return a.start < b.start ? -1 : a.start > b.start ? 1 : 0; });

    grid.style.setProperty("--year-w", (100 / (y1 - y0)) + "%");

    var dd = '<i class="gantt__dd" style="left:' + xNow.toFixed(2) + '%"></i>';
    var years = "";
    for (var y = y0; y < y1; y++) {
      years += '<span class="gantt__year" style="left:' + xStart(y + "-01").toFixed(2) + '%">' + y + "</span>";
    }

    var html = '<div class="gantt__row gantt__row--head" aria-hidden="true">' +
      '<span class="gantt__id">ID</span><span>Activity</span><span class="gantt__date">Start</span><span class="gantt__date">Finish</span>' +
      '<div class="gantt__track"><div class="gantt__axis">' + years + "</div>" +
      '<i class="gantt__dd gantt__dd--head" style="left:' + xNow.toFixed(2) + '%"><span>Data date ' + esc(U.p6Date(now)) + "</span></i></div></div>";

    rows.forEach(function (r, i) {
      var startTxt = r.type === "ms" ? r.label : U.fmt(r.start);
      var endTxt = r.type === "ms" ? "" : (r.end ? U.fmt(r.end) : "Present");
      var track;
      if (r.type === "ms") {
        track = '<i class="ms" style="left:' + xStart(r.start).toFixed(2) + '%"></i>';
      } else {
        var left = xStart(r.start);
        var right = r.end ? xEnd(r.end) : xNow;
        var width = Math.max(0.8, right - left);
        var flip = right > 80 ? " bar--flip" : "";
        track = '<i class="bar' + (r.end ? "" : " bar--now") + flip + '" style="left:' + left.toFixed(2) + "%;width:" + width.toFixed(2) + "%;--d:" + (i * 90) + 'ms"><span class="bar__label">' + esc(r.dur) + "</span></i>";
      }
      var label = r.name + ", " + r.sub + ". " + startTxt + (endTxt ? " to " + endTxt : "") + (r.dur ? ", " + r.dur : "");
      html += '<a class="gantt__row" href="' + r.href + '" aria-label="' + esc(label) + '">' +
        '<span class="gantt__id">' + esc(r.id) + "</span>" +
        '<span class="gantt__name"><b>' + esc(r.name) + "</b><span>" + esc(r.sub) + "</span></span>" +
        '<span class="gantt__date">' + esc(startTxt) + "</span>" +
        '<span class="gantt__date">' + esc(endTxt) + "</span>" +
        '<span class="gantt__track">' + track + dd + "</span></a>";
    });

    grid.innerHTML = html;

    /* On narrow screens start at the right end, so the current role and
       the data date are in view (the activity column stays frozen). */
    var scroller = grid.parentElement;
    requestAnimationFrame(function () {
      if (scroller.scrollWidth > scroller.clientWidth + 4) scroller.scrollLeft = scroller.scrollWidth;
    });
  }

  /* ------------------------------------------------------------------
     Experience cards
     ------------------------------------------------------------------ */
  function renderJobs() {
    var list = $("#jobs");
    if (!list || !R || !U) return;
    list.innerHTML = R.experience.map(function (j) {
      var where = [j.client, j.site, j.location].filter(Boolean).join(" · ");
      return '<li class="job lg" id="job-' + esc(j.id) + '" data-reveal>' +
        '<div class="job__when">' +
          '<span class="job__id">' + esc(j.id) + "</span>" +
          '<span class="job__dates">' + esc(U.fmt(j.start)) + " – " + esc(U.fmt(j.end)) + "</span>" +
          '<span class="job__dur">' + esc(U.duration(U.months(j.start, j.end))) + "</span>" +
          (j.end ? "" : '<span class="job__status">In progress</span>') +
        "</div>" +
        '<div class="job__body">' +
          '<h3 class="job__title">' + esc(j.title) + "</h3>" +
          '<p class="job__company">' + esc(j.company) + "</p>" +
          (where ? '<p class="job__where">' + esc(where) + "</p>" : "") +
          '<p class="job__summary">' + esc(j.summary) + "</p>" +
          '<p class="job__label">' + esc(j.highlightsLabel) + "</p>" +
          '<ul class="ticks">' + j.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" +
          '<details class="job__more"><summary>All responsibilities (' + j.duties.length + ') <svg class="icon" aria-hidden="true"><use href="#i-chevron"/></svg></summary>' +
            '<ul class="duties">' + j.duties.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
          "</details>" +
          '<ul class="chips job__tags" aria-label="Keywords">' + j.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        "</div>" +
      "</li>";
    }).join("");
  }

  renderGantt();
  renderJobs();

  /* ------------------------------------------------------------------
     Navigation: shrink on scroll, liquid lens on the active section,
     mobile menu
     ------------------------------------------------------------------ */
  var nav = $("#nav");
  var links = $("#nav-links");
  var lens = $(".nav__lens");
  var menuBtn = $("#nav-menu");
  var sections = ["about", "work", "experience", "skills", "education", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var active = null;

  function moveLens(a) {
    if (!lens || !links || getComputedStyle(lens).display === "none") return;
    var pr = links.getBoundingClientRect(), r = a.getBoundingClientRect();
    lens.style.setProperty("--x", (r.left - pr.left).toFixed(1) + "px");
    lens.style.setProperty("--w", r.width.toFixed(1) + "px");
    lens.classList.add("is-visible", "is-moving");
    clearTimeout(moveLens.t);
    moveLens.t = setTimeout(function () { lens.classList.remove("is-moving"); }, 240);
  }
  function setActive(id, force) {
    if (!links || (id === active && !force)) return;
    active = id;
    $$("a", links).forEach(function (a) { a.removeAttribute("aria-current"); });
    var a = id ? links.querySelector('a[href="#' + id + '"]') : null;
    if (a) { a.setAttribute("aria-current", "true"); moveLens(a); }
    else if (lens) lens.classList.remove("is-visible");
  }
  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
    var line = window.innerHeight * 0.42, id = null;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) id = s.id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && sections.length) {
      id = sections[sections.length - 1].id;
    }
    setActive(id);
  }
  var scrollRaf = 0;
  window.addEventListener("scroll", function () {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () { scrollRaf = 0; onScroll(); });
  }, { passive: true });
  window.addEventListener("resize", function () { setActive(active, true); });
  onScroll();

  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var use = $("use", menuBtn);
    if (use) use.setAttribute("href", open ? "#i-x" : "#i-menu");
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains("is-open"));
    });
  }
  if (links) {
    links.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      setMenu(false);
      var id = a.getAttribute("href").slice(1);
      if (id) setActive(id);
    });
  }
  document.addEventListener("click", function (e) {
    if (nav && nav.classList.contains("is-open") && !nav.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });

  /* ------------------------------------------------------------------
     Reveal on scroll + count-up numbers
     ------------------------------------------------------------------ */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (!isFinite(target) || reduceMotion) return;
    var t0 = performance.now(), dur = 1500;
    function frame(t) {
      var p = Math.min(1, (t - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    root.classList.add("reveal-armed");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    $$("[data-reveal], .gantt").forEach(function (el) { io.observe(el); });
    window.addEventListener("beforeprint", function () {
      $$("[data-reveal], .gantt").forEach(function (el) { el.classList.add("is-in"); });
    });

    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { cio.observe(el); });
  }

  /* ------------------------------------------------------------------
     Copy buttons
     ------------------------------------------------------------------ */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    copyText(b.getAttribute("data-copy")).then(function (ok) {
      toast(ok ? (b.getAttribute("data-copy-label") || "Text") + " copied" : "Couldn't copy. Please select the text instead.");
    });
  });

  /* ------------------------------------------------------------------
     Portrait tilt (desktop pointer only)
     ------------------------------------------------------------------ */
  var portrait = $("#portrait");
  if (portrait && finePointer && !reduceMotion) {
    var hero = portrait.closest(".hero");
    var tiltRaf = 0, tiltEvt = null;
    hero.addEventListener("pointermove", function (e) {
      tiltEvt = e;
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(function () {
        tiltRaf = 0;
        var r = portrait.getBoundingClientRect();
        var px = Math.max(-1, Math.min(1, (tiltEvt.clientX - (r.left + r.width / 2)) / r.width));
        var py = Math.max(-1, Math.min(1, (tiltEvt.clientY - (r.top + r.height / 2)) / r.height));
        portrait.style.setProperty("--px", px.toFixed(3));
        portrait.style.setProperty("--py", py.toFixed(3));
      });
    });
    hero.addEventListener("pointerleave", function () {
      portrait.style.setProperty("--px", "0");
      portrait.style.setProperty("--py", "0");
    });
  }

  /* ------------------------------------------------------------------
     Contact form → Formspree
     ------------------------------------------------------------------ */
  var form = $("#contact-form");
  if (form) {
    var statusEl = $("#f-status");
    var submitBtn = $("#f-submit");
    var btnText = submitBtn ? $(".btn__text", submitBtn) : null;
    var arrow = submitBtn ? $(".icon", submitBtn) : null;

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
      phone: function (v) { v = v.trim(); return !v || /^[+(]?[\d\s()-]{7,20}$/.test(v) ? "" : "Please enter a valid phone number, or leave it empty."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Please write a short message (at least 10 characters)."; }
    };

    function setFieldError(input, msg) {
      var fld = input.closest(".fld");
      var id = input.id + "-error";
      var existing = document.getElementById(id);
      if (msg) {
        fld.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", id);
        if (!existing) {
          existing = document.createElement("p");
          existing.className = "fld__error";
          existing.id = id;
          fld.appendChild(existing);
        }
        existing.textContent = msg;
      } else {
        fld.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        if (existing) existing.remove();
      }
    }
    function validate() {
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (!input) return;
        var msg = rules[name](input.value || "");
        setFieldError(input, msg);
        if (msg && !firstBad) firstBad = input;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    }
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener("blur", function () { if (input.value) setFieldError(input, rules[name](input.value)); });
      input.addEventListener("input", function () {
        if (input.closest(".fld").classList.contains("has-error")) setFieldError(input, rules[name](input.value));
      });
    });

    function showStatus(kind, html) {
      statusEl.hidden = false;
      statusEl.className = "form__status form__status--" + kind;
      statusEl.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#' + (kind === "ok" ? "i-check" : "i-alert") + '"/></svg><div>' + html + "</div>";
    }
    function setLoading(on) {
      if (!submitBtn) return;
      submitBtn.classList.toggle("is-loading", on);
      submitBtn.disabled = on;
      if (btnText) btnText.textContent = on ? "Sending…" : "Send message";
      if (arrow) {
        if (on) {
          var sp = document.createElement("span");
          sp.className = "spinner";
          sp.setAttribute("aria-hidden", "true");
          arrow.replaceWith(sp);
          arrow = sp;
        } else if (arrow.classList.contains("spinner")) {
          var ic = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          ic.setAttribute("class", "icon");
          ic.setAttribute("aria-hidden", "true");
          ic.innerHTML = '<use href="#i-arrow"/>';
          arrow.replaceWith(ic);
          arrow = ic;
        }
      }
    }

    var fallback = 'You can also email <a href="mailto:' + esc((C && C.recipientEmail) || (R ? R.email : "")) + '">' + esc((C && C.recipientEmail) || (R ? R.email : "")) + '</a> or <a href="https://wa.me/' + esc(R ? R.whatsapp : "") + '" target="_blank" rel="noopener">message on WhatsApp</a>.';

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.hidden = true;
      if (!validate()) return;

      var endpoint = String(C.formEndpoint || C.formspreeId || "").trim();
      if (!endpoint || /YOUR_FORM_ID/i.test(endpoint)) {
        var local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
        showStatus("err", local
          ? "<b>Form not connected yet.</b> Add your Formplume endpoint to <code>config.js</code> (formEndpoint), then reload."
          : "<b>The form isn't available right now.</b> " + fallback);
        console.warn("[contact form] Set SITE_CONFIG.formEndpoint in config.js to enable the form.");
        return;
      }

      var requestUrl = /^https?:\/\//i.test(endpoint) ? endpoint : "https://api.formplume.com/f/" + encodeURIComponent(endpoint);
      if (!/formplume\.com|formspree\.io/i.test(requestUrl)) {
        requestUrl = "https://api.formplume.com/f/" + encodeURIComponent(endpoint);
      }

      var data = new FormData(form);
      var who = String(data.get("name") || "").trim();
      data.set("_subject", "Portfolio enquiry from " + who + " (" + (data.get("topic") || "General") + ")");
      setLoading(true);

      fetch(requestUrl, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          var first = who.split(/\s+/)[0] || "there";
          var email = String(data.get("email") || "");
          showStatus("ok", "<b>Thanks, " + esc(first) + "! Your message has been sent.</b> I'll reply to " + esc(email) + " soon.");
          form.reset();
          toast("Message sent");
          return;
        }
        return res.json().catch(function () { return {}; }).then(function (body) {
          var detail = body && body.errors ? body.errors.map(function (x) { return x.message; }).join(", ") : "";
          showStatus("err", "<b>Your message couldn't be sent" + (detail ? ": " + esc(detail) : ".") + "</b> Please check the form and try again. " + fallback);
        });
      }).catch(function () {
        showStatus("err", "<b>Network error.</b> Check your connection and try again. " + fallback);
      }).then(function () { setLoading(false); });
    });
  }
})();
