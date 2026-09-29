/* =====================================================================
   Liquid glass
   1. Pointer glare: moves the specular highlight on .lg surfaces.
   2. Edge refraction: each [data-refract] element gets its own SVG
      displacement map, shaped to its size and corner radius, so the
      backdrop bends at the rim like a thick glass lens.
      Chromium desktop only (the only engine that accepts an SVG filter
      inside backdrop-filter). Everyone else keeps the frosted glass.
      data-refract="46"  → refraction strength (px)
      data-bezel="24"    → width of the curved rim (px, optional)
   ===================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var root = document.documentElement;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reduceTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;

  /* ---------- 1. Pointer glare ---------- */
  if (fine && !reduceMotion) {
    var raf = 0, lastEvent = null;
    document.addEventListener("pointermove", function (e) {
      lastEvent = e;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var t = lastEvent.target;
        var el = t && t.closest ? t.closest(".lg") : null;
        if (!el) return;
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((lastEvent.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (((lastEvent.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      });
    }, { passive: true });
  }

  /* ---------- 2. Edge refraction ---------- */
  var brands = (navigator.userAgentData && navigator.userAgentData.brands) || [];
  var isChromium = brands.some(function (b) { return /Chrom|Edge|Opera|Brave/i.test(b.brand); });
  var cssOK = !!(window.CSS && CSS.supports && CSS.supports("backdrop-filter", "url(#lg)"));
  var enabled = cfg.liquidRefraction !== false && isChromium && cssOK && fine && !reduceTransparency;

  var NS = "http://www.w3.org/2000/svg";
  var defs = null, uid = 0, items = [];
  var ro = null;

  function ensureDefs() {
    if (defs) return defs;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    defs = document.createElementNS(NS, "defs");
    svg.appendChild(defs);
    document.body.appendChild(svg);
    return defs;
  }

  /* Displacement map for a rounded rectangle.
     R/G = x/y offset (128 = none). Pixels near the rim sample the
     backdrop from further inside, which reads as a curved glass edge. */
  function buildMap(w, h, radius, bezel) {
    var s = Math.min(1, Math.sqrt(140000 / Math.max(1, w * h)));
    var cw = Math.max(8, Math.round(w * s));
    var ch = Math.max(8, Math.round(h * s));
    var r = Math.min(radius, w / 2, h / 2) * s;
    var bz = Math.max(2, bezel * s);
    var canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    var ctx = canvas.getContext("2d");
    var img = ctx.createImageData(cw, ch);
    var d = img.data;
    var hw = cw / 2, hh = ch / 2;
    for (var y = 0; y < ch; y++) {
      var py = y + 0.5 - hh;
      for (var x = 0; x < cw; x++) {
        var px = x + 0.5 - hw;
        var qx = Math.abs(px) - (hw - r);
        var qy = Math.abs(py) - (hh - r);
        var dist, nx, ny;
        if (qx > 0 && qy > 0) {
          var L = Math.sqrt(qx * qx + qy * qy) || 1e-6;
          dist = r - L;
          nx = (qx / L) * (px < 0 ? -1 : 1);
          ny = (qy / L) * (py < 0 ? -1 : 1);
        } else if (qx > qy) {
          dist = r - qx; nx = px < 0 ? -1 : 1; ny = 0;
        } else {
          dist = r - qy; nx = 0; ny = py < 0 ? -1 : 1;
        }
        var t = 1 - dist / bz;
        var m = 0;
        if (t > 0) {
          if (t > 1) t = 1;
          m = t * t * (1.6 - 0.6 * t);        /* steepens toward the rim */
        }
        var i = (y * cw + x) * 4;
        d[i] = 128 - nx * m * 127;
        d[i + 1] = 128 - ny * m * 127;
        d[i + 2] = 128;
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL("image/png");
  }

  function update(item) {
    var el = item.el;
    var w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return;
    if (w === item.w && h === item.h) return;
    item.w = w; item.h = h;
    var cs = getComputedStyle(el);
    var radius = parseFloat(cs.borderTopLeftRadius) || 0;
    var bezel = parseFloat(el.getAttribute("data-bezel")) || Math.min(30, Math.min(w, h) * 0.34);
    var href = buildMap(w, h, radius, bezel);
    /* Region is larger than the element so it still covers it while it
       grows during a transition; the flood keeps that margin neutral. */
    item.filter.setAttribute("x", "0");
    item.filter.setAttribute("y", "0");
    item.filter.setAttribute("width", String(Math.ceil(w * 1.3 + 40)));
    item.filter.setAttribute("height", String(Math.ceil(h * 1.3 + 40)));
    item.image.setAttribute("x", "0");
    item.image.setAttribute("y", "0");
    item.image.setAttribute("width", String(w));
    item.image.setAttribute("height", String(h));
    item.image.setAttribute("href", href);
    var blur = parseFloat(cs.getPropertyValue("--glass-blur")) || 18;
    el.style.setProperty("--lg-backdrop", "blur(" + Math.max(2, blur * 0.6).toFixed(1) + "px) url(#" + item.id + ") saturate(185%)");
  }

  function attach(el) {
    if (!enabled || !el || el.__lg) return;
    el.__lg = true;
    ensureDefs();
    var id = "lg-refract-" + (++uid);
    var strength = parseFloat(el.getAttribute("data-refract")) || 40;

    var filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", id);
    filter.setAttribute("filterUnits", "userSpaceOnUse");
    filter.setAttribute("primitiveUnits", "userSpaceOnUse");
    filter.setAttribute("color-interpolation-filters", "sRGB");

    var flood = document.createElementNS(NS, "feFlood");
    flood.setAttribute("flood-color", "#808080");
    flood.setAttribute("result", "neutral");

    var image = document.createElementNS(NS, "feImage");
    image.setAttribute("preserveAspectRatio", "none");
    image.setAttribute("result", "img");

    var merge = document.createElementNS(NS, "feMerge");
    merge.setAttribute("result", "map");
    var m1 = document.createElementNS(NS, "feMergeNode");
    m1.setAttribute("in", "neutral");
    var m2 = document.createElementNS(NS, "feMergeNode");
    m2.setAttribute("in", "img");
    merge.appendChild(m1);
    merge.appendChild(m2);

    var disp = document.createElementNS(NS, "feDisplacementMap");
    disp.setAttribute("in", "SourceGraphic");
    disp.setAttribute("in2", "map");
    disp.setAttribute("scale", String(strength));
    disp.setAttribute("xChannelSelector", "R");
    disp.setAttribute("yChannelSelector", "G");

    filter.appendChild(flood);
    filter.appendChild(image);
    filter.appendChild(merge);
    filter.appendChild(disp);
    defs.appendChild(filter);

    var item = { el: el, id: id, filter: filter, image: image, w: 0, h: 0 };
    items.push(item);
    update(item);
    if (ro) ro.observe(el);
  }

  if (enabled) {
    root.classList.add("has-refraction");
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          for (var i = 0; i < items.length; i++) {
            if (items[i].el === entry.target) {
              var it = items[i];
              clearTimeout(it.timer);
              it.timer = setTimeout(function () { update(it); }, 140);
              break;
            }
          }
        });
      });
    }
    document.querySelectorAll("[data-refract]").forEach(attach);
  }

  window.LiquidGlass = { attach: attach, enabled: enabled };
})();
