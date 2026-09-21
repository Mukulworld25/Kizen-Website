/* ===========================================================================
   KIZEN EDUCATION - STATIC SITE SCRIPT
   Replaces the React app's interactive behaviour with plain JavaScript.
   No framework, no build step, no dependencies.

   SECTION 1  config + utilities
   SECTION 2  lead capture (Supabase REST) - THE CRITICAL PATH
   SECTION 3  enquiry form wiring (all 5 form variants)
   SECTION 4  action modal + floating quick actions
   SECTION 5  header: mobile drawer, dropdowns, scroll shadow
   SECTION 6  sticky mobile CTA
   SECTION 7  home hero carousel
   SECTION 8  home stat count-up
   SECTION 9  courses level filter
   SECTION 10 misc (hash scrolling)
   =========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- CONFIG */

  // Same project + publishable key the React app used. This key is public by
  // design (it shipped inside the browser bundle) and is protected by RLS.
  var SUPABASE_URL = 'https://qlcuqmtpvncxbrvijnzt.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_jmJzgy2ONFm-73ULQvupRg_lVe2N27L';
  var LEADS_ENDPOINT = SUPABASE_URL + '/rest/v1/leads';

  var WHATSAPP_NUMBER = '917696963377';
  var TEL_HREF = 'tel:+917696963377';

  // Same 4s ceiling the React form used (Promise.race with a 4s rejection).
  var SUBMIT_TIMEOUT_MS = 4000;

  // Thank You state auto-restores the form after 5s, exactly as before.
  var THANKYOU_RESET_MS = 5000;

  // OPTIONAL second lead sink (Phase 2.5 dual-write).
  // The original Google Apps Script webhook was REMOVED from the React source
  // (no webhook code remains, and VITE_GOOGLE_SHEETS_WEBHOOK_URL is absent
  // from .env). So there is no endpoint to dual-write to yet. Drop a URL here
  // (Apps Script /exec, Formspree, etc.) and every lead is mirrored to it.
  // Leave empty and the code simply skips it - nothing else changes.
  var SECONDARY_SINK_URL = '';

  var LS_LOG = 'kizen_enquiries';        // existing local audit log (unchanged)
  var LS_RETRY = 'kizen_lead_retry';     // Phase 2.5 retry queue

  /* ------------------------------------------------------------- UTILITIES */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function readLS(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function writeLS(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function waUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function openWhatsApp(message) {
    window.open(waUrl(message), '_blank', 'noopener,noreferrer');
  }

  /* ==========================================================================
     SECTION 2 - LEAD CAPTURE  (the critical path)
     --------------------------------------------------------------------------
     Mirrors the React app's behaviour exactly:
       - POST the SAME shape to the SAME table via the Supabase REST API
       - same 4 second ceiling
       - FAIL SILENT: the Thank You screen always shows, whatever happens
       - same localStorage audit log (kizen_enquiries)
     Plus Phase 2.5 hardening, which cannot change that contract:
       - a retry queue so a Supabase outage does not destroy the lead
       - an optional second sink (see SECONDARY_SINK_URL)
     ========================================================================== */

  function postLead(record) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (controller) controller.abort();
    }, SUBMIT_TIMEOUT_MS);

    return fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        // identical to supabase-js .insert() default
        Prefer: 'return=minimal'
      },
      body: JSON.stringify([record]),
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('Supabase HTTP ' + res.status);
      return true;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  // Optional mirror sink. text/plain avoids a CORS preflight, which is what
  // Google Apps Script webhooks require.
  function postSecondary(record) {
    if (!SECONDARY_SINK_URL) return Promise.resolve(false);
    try {
      return fetch(SECONDARY_SINK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(record)
      }).then(function () { return true; }, function () { return false; });
    } catch (e) { return Promise.resolve(false); }
  }

  /* ---- retry queue: a Supabase outage must not destroy the lead ---------- */

  var LS_RETRY_AT = 'kizen_lead_retry_at';
  var RETRY_THROTTLE_MS = 5 * 60 * 1000; // at most one flush attempt / 5 min

  function queueForRetry(record) {
    var q = readLS(LS_RETRY, []);
    q.push({ record: record, at: new Date().toISOString() });
    if (q.length > 50) q = q.slice(-50);
    writeLS(LS_RETRY, q);
  }

  function flushRetryQueue() {
    var q = readLS(LS_RETRY, []);
    if (!q.length) return;

    var last = 0;
    try { last = parseInt(window.localStorage.getItem(LS_RETRY_AT) || '0', 10) || 0; } catch (e) {}
    if (Date.now() - last < RETRY_THROTTLE_MS) return;
    try { window.localStorage.setItem(LS_RETRY_AT, String(Date.now())); } catch (e) {}

    var pending = [];
    var chain = Promise.resolve();
    q.forEach(function (item) {
      chain = chain.then(function () {
        return postLead(item.record).catch(function () { pending.push(item); });
      });
    });
    chain.then(function () {
      writeLS(LS_RETRY, pending);
      if (pending.length < q.length) {
        console.log('[Kizen] retry queue: recovered ' + (q.length - pending.length) + ' lead(s), ' + pending.length + ' still pending');
      }
    });
  }

  /* ---- the single submission entry point --------------------------------- */

  function saveLead(record, variantLabel) {
    // 1. local audit log - same key the React form wrote to
    var log = readLS(LS_LOG, []);
    log.push({ record: record, variant: variantLabel, timestamp: new Date().toISOString() });
    if (log.length > 50) log = log.slice(-50);
    writeLS(LS_LOG, log);

    // 2. Supabase (silent fail) + optional mirror
    postSecondary(record);
    return postLead(record).then(function () {
      console.log('[Kizen:' + variantLabel + '] lead saved to Supabase');
      return true;
    }, function (err) {
      // never surfaces to the visitor - the Thank You screen still shows
      console.warn('[Kizen:' + variantLabel + '] Supabase failed, queued for retry:', err && err.message);
      queueForRetry(record);
      return false;
    });
  }

  /* ==========================================================================
     SECTION 3 - ENQUIRY FORMS
     Five variants exist in the captured markup. Detection is structural, so it
     keeps working no matter which page a form appears on:
       callback  inside #kizen-panel-callback (name + phone only)
       contact   has textarea[name=message]        (light card)
       acca      has select[name=qualification]    (navy card)
       courses   select[name=programme] lists "11th Commerce"
       home      select[name=programme] lists "Interested in ACCA"
     ========================================================================== */

  function detectVariant(form) {
    // The callback panel carries data-kizen-panel="callback" on its root once
    // adoptPartials() has moved it to <body>. Its original #kizen-panel-*
    // wrapper is removed from the DOM, so it cannot be used for detection.
    if (form.closest('[data-kizen-panel="callback"]')) return 'callback';
    if (form.querySelector('textarea[name="message"]')) return 'contact';
    if (form.querySelector('select[name="qualification"]')) return 'acca';
    var prog = form.querySelector('select[name="programme"]');
    if (prog) {
      var txt = prog.textContent || '';
      if (txt.indexOf('11th Commerce') !== -1) return 'courses';
      if (txt.indexOf('Interested in ACCA') !== -1) return 'home';
    }
    return 'home';
  }

  function formData(form) {
    var out = {};
    $$('input[name], select[name], textarea[name]', form).forEach(function (el) {
      out[el.name] = el.value;
    });
    return out;
  }

  // Transcribed verbatim from EnquiryForm.jsx / FloatingActions.jsx
  function buildWaMessage(variant, data) {
    if (variant === 'callback') {
      return "Hi Kizen Education! I'm " + (data.name || 'a prospective student') +
        '. Please call me back at ' + data.phone + '.';
    }
    var interest;
    if (variant === 'acca') interest = 'the ACCA programme';
    else if (variant === 'courses') interest = data.programme;
    else if (variant === 'contact') interest = data.programme;
    else interest = (data.programme || '').replace(/^Interested in /, '');
    return "Hi Kizen Education! I'm " + (data.name || 'a prospective student') +
      ". I'm interested in " + interest + '.' +
      (data.phone ? ' You can reach me at ' + data.phone + '.' : '');
  }

  function buildRecord(variant, data) {
    // acca folds qualification into programme exactly as the React form did,
    // AND now also populates the dedicated qualification column.
    var programmeInterest = variant === 'acca'
      ? 'ACCA' + (data.qualification ? ' (' + data.qualification + ')' : '')
      : (data.programme || '');

    return {
      name: (data.name || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || '').trim() || null,
      programme: programmeInterest,
      source: variant === 'callback' ? 'website_callback' : 'website',
      qualification: (data.qualification || '').trim() || null,
      message: (data.message || '').trim() || null
    };
  }

  var TY_ICON = '<i class="fa-solid fa-circle-check text-gold text-xl"></i>';

  function thankYouHtml(variant) {
    if (variant === 'callback') {
      return '<div class="bg-paper/10 border border-gold/50 rounded-xl p-5">' +
        '<div class="flex items-center gap-3 mb-4">' + TY_ICON +
        '<div><div class="font-serif text-base text-paper mb-0.5">Thank You</div>' +
        '<div class="text-xs text-paper/70 font-normal">Thank you for submitting the form. Our team will be in touch with you soon.</div>' +
        '</div></div>' +
        '<div class="flex flex-col sm:flex-row gap-3">' +
        '<button type="button" data-kizen-wa class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gold text-navy hover:bg-gold/90 transition"><i class="fa-brands fa-whatsapp"></i> Continue on WhatsApp</button>' +
        '<a href="' + TEL_HREF + '" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-paper/20 text-paper hover:border-gold hover:bg-paper/10 transition"><i class="fa-solid fa-phone"></i> Call Us</a>' +
        '</div></div>';
    }
    var light = variant === 'contact';
    return '<div class="w-full rounded-xl border p-5 text-sm font-semibold transition-all ' +
      (light ? 'border-gold bg-ivory text-ink shadow-sm' : 'border-gold/60 bg-paper/10 text-paper') + '">' +
      '<div class="flex items-center gap-3 mb-4">' + TY_ICON +
      '<div><div class="font-serif text-base text-ink mb-0.5">Thank You</div>' +
      '<div class="text-xs ' + (light ? 'text-ink/70' : 'text-paper/80') + ' font-normal">Thank you for submitting your enquiry. Our team will be in touch with you shortly.</div>' +
      '</div></div>' +
      '<div class="flex flex-col sm:flex-row gap-3">' +
      '<button type="button" data-kizen-wa class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition bg-gold text-navy hover:bg-gold/90"><i class="fa-brands fa-whatsapp"></i> Continue on WhatsApp</button>' +
      '<a href="' + TEL_HREF + '" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ' +
      (light ? 'border border-ink/20 text-ink hover:border-ink hover:bg-ivory' : 'border border-paper/20 text-paper hover:border-gold hover:bg-paper/10') +
      '"><i class="fa-solid fa-phone"></i> Call Us</a>' +
      '</div></div>';
  }

  /* ---- Thank You state: shown, then auto-restored after 5s ------------- */

  function showThankYou(form, variant, data) {
    var parent = form.parentNode;
    var holder = document.createElement('div');
    holder.innerHTML = thankYouHtml(variant);
    var node = holder.firstElementChild;
    // marker goes on the element that actually enters the DOM
    node.setAttribute('data-kizen-thankyou', variant);

    form.style.display = 'none';
    parent.insertBefore(node, form.nextSibling);

    var waBtn = node.querySelector('[data-kizen-wa]');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        openWhatsApp(buildWaMessage(variant, data));
      });
    }

    window.setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
      form.style.display = '';
      $$('input, select, textarea', form).forEach(function (el) {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
      });
    }, THANKYOU_RESET_MS);
  }

  /* ---- wiring ---------------------------------------------------------- */

  function wireForm(form) {
    if (form.getAttribute('data-kizen-wired')) return;
    form.setAttribute('data-kizen-wired', '1');
    var variant = detectVariant(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Guard against a double-click creating duplicate rows. Invisible to the
      // visitor (no disabled state), just an internal flag.
      if (form.getAttribute('data-kizen-busy')) return;
      form.setAttribute('data-kizen-busy', '1');

      var data = formData(form);
      console.log('[Kizen:' + variant + '] submit', data);

      // saveLead NEVER rejects, so the Thank You screen always appears - after
      // the request settles, or after the 4s ceiling, exactly like the React
      // form. A network failure is silent to the visitor and the lead is
      // queued for retry.
      saveLead(buildRecord(variant, data), variant).then(function () {
        form.removeAttribute('data-kizen-busy');
        showThankYou(form, variant, data);
      });
    });
  }

  function wireAllForms(root) {
    $$('form', root || document).forEach(function (form) {
      if (form.querySelector('input[name="name"]')) wireForm(form);
    });
  }

  /* ==========================================================================
     SECTION 4 - FLOATING QUICK ACTIONS + ACTION MODAL
     The chips and both panels were captured from the live React DOM (they are
     conditionally rendered there, so they are absent from a plain page load)
     and injected hidden as #kizen-partials. Here we adopt them:
       - chips move into the FAB wrapper, hidden until the FAB is opened
       - panels move to <body> (they cannot live inside a hidden ancestor)
     Markup is never re-authored, so it stays pixel-identical.
     ========================================================================== */

  var panels = {};
  var fabEl = null;
  var fabClosedHtml = null;
  var FAB_OPEN_HTML = '<i class="fa-solid fa-xmark text-2xl text-gold transition-transform"></i>';

  function adoptPartials() {
    var wrap = document.getElementById('kizen-partials');
    if (!wrap) return;

    // ---- quick-action chips -> into the FAB wrapper, before the FAB button
    fabEl = document.querySelector('button[aria-label="Open quick actions"]');
    var chipSource = document.getElementById('kizen-fab-actions');
    if (fabEl && chipSource && fabEl.parentNode) {
      var moved = [];
      Array.prototype.slice.call(chipSource.children).forEach(function (el) {
        el.setAttribute('data-kizen-chip', '');
        el.style.display = 'none';
        moved.push(el);
      });
      moved.forEach(function (el) { fabEl.parentNode.insertBefore(el, fabEl); });
      fabClosedHtml = fabEl.innerHTML;
    }

    // ---- panels -> body, hidden
    var host = document.createElement('div');
    host.id = 'kizen-modal-host';
    document.body.appendChild(host);

    ['book', 'callback'].forEach(function (key) {
      var src = document.getElementById('kizen-panel-' + key);
      var root = src && src.firstElementChild;
      if (!root) return;
      host.appendChild(root);
      root.setAttribute('data-kizen-panel', key);
      root.style.display = 'none';
      panels[key] = root;

      var backdrop = root.firstElementChild;
      if (backdrop && !backdrop.querySelector('button')) {
        backdrop.addEventListener('click', function () { closePanel(key); });
      }
      var closeBtn = root.querySelector('button[aria-label="Close panel"]');
      if (closeBtn) closeBtn.addEventListener('click', function () { closePanel(key); });

      wireAllForms(root);
    });

    wrap.parentNode.removeChild(wrap);

    // ---- chips: Book a Seat / Request Callback open a panel; the Call and
    //      WhatsApp chips are real links and need no handler
    $$('[data-kizen-chip] button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setFabOpen(false);
        var label = btn.getAttribute('aria-label');
        if (label === 'Book a Seat') openPanel('book');
        else if (label === 'Request Callback') openPanel('callback');
      });
    });

    if (fabEl) {
      fabEl.addEventListener('click', function () {
        setFabOpen(fabEl.getAttribute('data-kizen-fab-open') !== '1');
      });
    }
  }

  function setFabOpen(open) {
    if (!fabEl) return;
    fabEl.setAttribute('data-kizen-fab-open', open ? '1' : '0');
    fabEl.setAttribute('aria-label', open ? 'Close quick actions' : 'Open quick actions');
    fabEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    fabEl.innerHTML = open ? FAB_OPEN_HTML : fabClosedHtml;
    $$('[data-kizen-chip]').forEach(function (el) {
      el.style.display = open ? '' : 'none';
    });
  }

  function openPanel(key) {
    var root = panels[key];
    if (!root) return;
    root.style.display = '';
    document.body.style.overflow = 'hidden';
  }

  function closePanel(key) {
    var root = panels[key];
    if (!root) return;
    root.style.display = 'none';
    document.body.style.overflow = '';
  }

  function wireEnquiryLinks() {
    // Every legacy "#enquiry" anchor site-wide (header CTA, sticky mobile bar,
    // hero CTA, course cards) opens the booking panel instead of scrolling -
    // identical to the React FloatingActions document-level handler.
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href="#enquiry"]') : null;
      if (!a) return;
      e.preventDefault();
      setFabOpen(false);
      openPanel('book');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      Object.keys(panels).forEach(function (k) {
        if (panels[k].style.display !== 'none') closePanel(k);
      });
      setFabOpen(false);
    });
  }

  /* ================================================================ BOOT */

  function init() {
    adoptPartials();
    wireEnquiryLinks();
    wireAllForms(document);
    flushRetryQueue(); // recover anything a past outage left behind
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
