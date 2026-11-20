/* Zaiqa-E-Mehfil — site behaviour. No dependencies. */
(function () {
  "use strict";
  var d = document, w = window;
  w.dataLayer = w.dataLayer || [];
  function track(ev, extra) {
    var o = { event: ev };
    if (extra) for (var k in extra) o[k] = extra[k];
    w.dataLayer.push(o);
  }
  function store(k, v) {
    try { if (v === undefined) return w.localStorage.getItem(k); w.localStorage.setItem(k, v); } catch (e) { return null; }
  }
  var root = d.getElementById("zem-cfg") || d.documentElement;
  var OPEN = root.getAttribute("data-open") || "11:30";
  var CLOSE = root.getAttribute("data-close") || "23:30";
  var HOURS = {}; try { HOURS = JSON.parse(root.getAttribute("data-hours") || "{}"); } catch (e) { HOURS = {}; }
  var DAYN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  function hoursFor(day) { return HOURS[day] || [OPEN, CLOSE]; }
  function fmt(t) { return t.charAt(0) === "0" ? t.slice(1) : t; }
  var PHONE = root.getAttribute("data-phone") || "";
  var TEL = root.getAttribute("data-tel") || "";

  /* ---------- island nav + sheet ---------- */
  var island = d.querySelector(".island");
  function onScroll() { if (island) island.classList.toggle("solid", w.scrollY > 40); }
  w.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var burger = d.querySelector(".burger"), sheet = d.getElementById("sheet");
  function setSheet(open) {
    if (!burger || !sheet) return;
    burger.classList.toggle("x", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    sheet.classList.toggle("open", open);
    sheet.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) sheet.removeAttribute("inert"); else sheet.setAttribute("inert", "");
    d.body.style.overflow = open ? "hidden" : "";
  }
  if (burger && sheet) {
    burger.addEventListener("click", function () { setSheet(!sheet.classList.contains("open")); });
    sheet.addEventListener("click", function (e) { if (e.target.closest("a")) setSheet(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && sheet.classList.contains("open")) { setSheet(false); burger.focus(); } });
  }

  /* ---------- reveal on scroll (content stays visible without JS) ---------- */
  var rv = [].slice.call(d.querySelectorAll(".rv"));
  var reduce = w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in w && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); e.target.classList.remove("pre"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    rv.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < w.innerHeight * 0.92) return; // already on screen: leave it alone
      el.classList.add("pre"); io.observe(el);
    });
  }

  /* ---------- open / closed now (Europe/London) ---------- */
  function londonNow() {
    try {
      var p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { day: o.weekday, mins: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { day: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][n.getDay()], mins: n.getHours() * 60 + n.getMinutes() }; }
  }
  function toMins(s) { var a = s.split(":"); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); }
  var now = londonNow(), today_h = hoursFor(now.day), o1 = toMins(today_h[0]), c1 = toMins(today_h[1]);
  var isOpen = now.mins >= o1 && now.mins < c1;
  var nextOpen = now.mins < o1 ? fmt(today_h[0]) : (function () {
    var tmr = DAYN[(DAYN.indexOf(now.day) + 1) % 7]; return fmt(hoursFor(tmr)[0]) + " tomorrow"; })();
  [].forEach.call(d.querySelectorAll("[data-live]"), function (el) {
    var t = el.querySelector("span");
    if (isOpen) t.textContent = "Open now \u00b7 until " + today_h[1];
    else { el.classList.add("shut"); t.textContent = "Closed now \u00b7 opens " + nextOpen; }
  });
  [].forEach.call(d.querySelectorAll("tr[data-day]"), function (tr) {
    if (tr.getAttribute("data-day") === now.day) { tr.classList.add("now"); tr.setAttribute("aria-current", "date"); }
  });

  /* ---------- copy phone ---------- */
  [].forEach.call(d.querySelectorAll("[data-copy]"), function (b) {
    b.addEventListener("click", function () {
      var txt = b.getAttribute("data-copy"), label = b.textContent;
      function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = label; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () {});
    });
  });

  /* ---------- conversion events (no personal data) ---------- */
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a"); if (!a) return;
    var href = a.getAttribute("href") || "", where = a.getAttribute("data-where") || "";
    if (href.indexOf("tel:") === 0) track("call_click", { link_location: where });
    else if (a.hasAttribute("data-dir")) track("directions_click", { link_location: where });
    else if (href.indexOf("mailto:") === 0) track("email_click", { link_location: where });
  });
  if (root.getAttribute("data-page") === "menu") track("menu_view");

  /* ---------- reviews wall: show 6, expand to all ---------- */
  [].forEach.call(d.querySelectorAll("[data-revs]"), function (g) {
    var btn = g.parentNode.querySelector("[data-revtoggle]");
    if (!btn || g.children.length <= 6) return;
    g.classList.add("collapsed"); btn.hidden = false;
    btn.addEventListener("click", function () {
      var open = g.classList.toggle("collapsed") === false;
      btn.firstChild.nodeValue = open ? "Show fewer reviews" : "Show all " + g.children.length + " reviews";
      if (!open) g.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (open) [].forEach.call(g.querySelectorAll(".rv.pre"), function (el) { el.classList.remove("pre"); el.classList.add("in"); });
    });
  });

  /* ---------- menu rail: highlight current category ---------- */
  var rail = d.querySelector(".rail-in");
  if (rail && "IntersectionObserver" in w) {
    var links = {}; [].forEach.call(rail.querySelectorAll("a"), function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var cur = null;
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var a = links[e.target.id]; if (!a || a === cur) return;
        if (cur) cur.classList.remove("on"); a.classList.add("on"); cur = a;
        var left = a.offsetLeft - rail.clientWidth / 2 + a.clientWidth / 2;
        rail.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    [].forEach.call(d.querySelectorAll(".mcat"), function (s) { ro.observe(s); });
  }

  /* ---------- cookie consent (Google Consent Mode v2) ---------- */
  var bar = d.getElementById("consent");
  function gtagC() { w.dataLayer.push(arguments); }
  function applyConsent(v) {
    var g = v === "granted" ? "granted" : "denied";
    gtagC("consent", "update", { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g });
    track("consent_" + g);
  }
  if (bar) {
    var saved = store("zem_consent");
    if (saved !== "granted" && saved !== "denied") bar.hidden = false; // a saved "granted" is re-applied in <head> before GTM loads
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-c]"); if (!b) return;
      var v = b.getAttribute("data-c"); store("zem_consent", v); applyConsent(v); bar.hidden = true;
    });
    [].forEach.call(d.querySelectorAll("[data-consent-open]"), function (b) {
      b.addEventListener("click", function () { bar.hidden = false; var f = bar.querySelector("button"); if (f) f.focus(); });
    });
  }

  /* ---------- thank-you page ---------- */
  if (root.getAttribute("data-page") === "thanks") {
    var qs = w.location.search, t = /[?&]t=catering/.test(qs) ? "catering" : (/[?&]t=table/.test(qs) ? "table" : "");
    var rec = null;
    try { rec = JSON.parse(w.sessionStorage.getItem("zem_ty") || "null"); } catch (e) { rec = null; }
    var fresh = rec && rec.t === t && (Date.now() - rec.ts) < 30 * 60 * 1000;
    if (t) [].forEach.call(d.querySelectorAll("[data-ty]"), function (el) { el.hidden = el.getAttribute("data-ty") !== t; });
    if (fresh) {
      try { w.sessionStorage.removeItem("zem_ty"); } catch (e) {}
      // fires once per real submission - a refresh or a direct visit does not fire it again
      track("thankyou_view", { form_type: t });
      var nice = function (iso) { try { return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }); } catch (e) { return iso; } };
      var parts = t === "catering"
        ? [rec.e, rec.g ? rec.g + " guests" : "", rec.d ? nice(rec.d) : ""]
        : [rec.g ? "Table for " + rec.g : "", rec.d ? nice(rec.d) : "", rec.tm || ""];
      var sum = d.getElementById("ty-summary");
      parts = parts.filter(Boolean);
      if (sum && parts.length) { sum.textContent = parts.join(" · "); sum.hidden = false; }
    }
    if (/[?&]preview=1/.test(qs)) { var pn = d.getElementById("ty-preview"); if (pn) pn.hidden = false; }
  }

  /* ---------- booking / catering form ---------- */
  var form = d.getElementById("bform");
  if (!form) return;
  var status = d.getElementById("fstatus");
  var endpoint = form.getAttribute("data-endpoint") || "";
  var dateIn = form.querySelector("#f-date"), timeIn = form.querySelector("#f-time");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var t = new Date(), today = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
  if (dateIn) dateIn.min = today;

  function mode() { var r = form.querySelector("input[name=enquiry]:checked"); return r ? r.value : "table"; }
  function setMode(m) {
    [].forEach.call(form.querySelectorAll("[data-for]"), function (el) {
      var on = el.getAttribute("data-for") === m;
      el.hidden = !on;
      [].forEach.call(el.querySelectorAll("input,select,textarea"), function (f) {
        f.disabled = !on;
        if (f.hasAttribute("data-req")) f.required = on;
      });
    });
    var sub = form.querySelector(".submit-label");
    if (sub) sub.textContent = m === "catering" ? "Send catering enquiry" : "Request this table";
    var h = d.getElementById("book-title-mode");
    if (h) h.textContent = m === "catering" ? "catering & events" : "a table";
  }
  [].forEach.call(form.querySelectorAll("input[name=enquiry]"), function (r) { r.addEventListener("change", function () { setMode(mode()); }); });
  var want = /[?&]type=catering/.test(w.location.search) || w.location.hash === "#catering";
  if (want) { var cr = form.querySelector("input[name=enquiry][value=catering]"); if (cr) cr.checked = true; }
  setMode(mode());

  function fieldErr(f, msg) {
    var box = f.closest(".fld"), e = box && box.querySelector(".err");
    if (msg) { f.setAttribute("aria-invalid", "true"); if (e) e.textContent = msg; }
    else { f.removeAttribute("aria-invalid"); if (e) e.textContent = ""; }
  }
  function validate() {
    var first = null;
    [].forEach.call(form.querySelectorAll("input,select,textarea"), function (f) {
      if (f.disabled || f.type === "radio" || f.type === "hidden" || f.classList.contains("hpf")) return;
      var v = (f.value || "").trim(), msg = "";
      if (f.required && !v) msg = "Please fill this in.";
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = "Please check the email address.";
      else if (v && f.type === "tel" && v.replace(/[^\d]/g, "").length < 10) msg = "Please enter a full phone number.";
      else if (v && f.id === "f-date" && v < today) msg = "Please choose today or a later date.";
      else if (v && f.id === "f-time") {
        var dv = dateIn && dateIn.value ? DAYN[new Date(dateIn.value + "T12:00:00").getDay()] : null;
        var hh = hoursFor(dv || now.day), bo = toMins(hh[0]), bc = toMins(hh[1]) - 30;
        if (toMins(v) < bo || toMins(v) > bc) msg = "On " + (dv || "that day") + " we take bookings from " + fmt(hh[0]) + " to " + pad(Math.floor(bc / 60)) + ":" + pad(bc % 60) + ".";
      }
      else if (v && f.type === "number" && (+v < +(f.min || 1))) msg = "Please enter a number of guests.";
      fieldErr(f, msg);
      if (msg && !first) first = f;
    });
    if (first) first.focus();
    return !first;
  }
  form.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid")) fieldErr(e.target, ""); });

  function show(kind, title, html) {
    status.className = "fstatus show " + kind;
    status.innerHTML = "<b>" + title + "</b><p>" + html + "</p>";
    status.setAttribute("tabindex", "-1"); status.focus({ preventScroll: true });
    status.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }
  var callLink = '<a href="tel:' + TEL + '" data-where="form_fallback">' + PHONE + "</a>";

  var THANKS = root.getAttribute("data-thanks") || "thank-you.html";
  function goThanks(m, data, preview) {
    try {
      w.sessionStorage.setItem("zem_ty", JSON.stringify({
        t: m, ts: Date.now(),
        g: m === "catering" ? data.guest_count : data.guests,
        d: m === "catering" ? data.event_date : data.date,
        tm: m === "catering" ? "" : data.time,
        e: m === "catering" ? data.event_type : ""
      }));
    } catch (e) {}
    var url = THANKS + "?t=" + m + (preview ? "&preview=1" : ""), gone = false;
    function go() { if (gone) return; gone = true; w.location.href = url; }
    if (preview) { go(); return; }
    // let GTM send the conversion before the page changes; fall back if GTM is blocked
    w.dataLayer.push({ event: m === "catering" ? "catering_submit" : "booking_submit", form_type: m,
      party_size: m === "catering" ? data.guest_count : data.guests, eventCallback: go, eventTimeout: 1200 });
    setTimeout(go, 1500);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.querySelector(".hpf") && form.querySelector(".hpf").value) return; // bot
    if (!validate()) return;
    var m = mode(), data = {}, fd = new FormData(form);
    fd.forEach(function (v, k) { if (k !== "enquiry") data[k] = String(v).trim(); });
    var who = data.name || "Guest";
    data._subject = m === "catering"
      ? "Catering enquiry: " + who + (data.event_date ? " — " + data.event_date : "")
      : "Table request: " + who + " — " + (data.guests || "?") + " guests, " + (data.date || "") + " " + (data.time || "");
    data.enquiry_type = m === "catering" ? "Catering / event" : "Table booking";
    data._template = "table";
    data._captcha = "false";
    if (data.email) {
      data._replyto = data.email;
      data._autoresponse = "Thank you for contacting Zaiqa-E-Mehfil. We have received your " + (m === "catering" ? "catering enquiry" : "table request") + " and will call you to confirm. For anything urgent please call " + PHONE + ".";
    }
    var btn = form.querySelector("button[type=submit]"); btn.disabled = true;
    var okTitle = m === "catering" ? "Enquiry sent — thank you." : "Request sent — thank you.";
    var okMsg = m === "catering"
      ? "We'll call you on the number you gave to talk through dates, numbers and the menu. Need us sooner? Call " + callLink + "."
      : "Your table is not confirmed until we call you back. If it's for today, the quickest way is to call " + callLink + ".";

    if (!endpoint) { goThanks(m, data, true); return; } // preview build: nothing is sent
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        btn.disabled = false;
        if (res.ok && (res.j.success === true || res.j.success === "true")) {
          btn.disabled = true;
          show("ok", okTitle, okMsg); // visible for the moment before the thank-you page loads
          goThanks(m, data, false);
        } else {
          show("bad", "That didn't go through.", "Sorry — please call us on " + callLink + " and we'll sort it straight away.");
        }
      })
      .catch(function () {
        btn.disabled = false;
        show("bad", "That didn't go through.", "It looks like a connection problem. Please call " + callLink + " or try again in a moment.");
      });
  });
})();
