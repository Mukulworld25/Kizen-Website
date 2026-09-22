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

  /* ==========================================================================
     SECTION 5 - HEADER
     The captured markup holds the UNSCROLLED state (capture happened at
     scrollY 0) and the CLOSED menu state, so the other half of each class pair
     is applied here. Those classes are safelisted in static-generator/static.css
     and enforced by css-coverage.mjs, so a Tailwind purge cannot drop them.
     ========================================================================== */

  var HEADER_SCROLLED = ['bg-paper/95', 'border-ink/15', 'shadow-xl', 'shadow-black/[0.10]'];
  var HEADER_UNSCROLLED = ['bg-paper/85', 'border-ink/10', 'shadow-lg', 'shadow-black/[0.04]', 'hover:shadow-xl'];

  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    var pill = header.querySelector('div');
    if (!pill) return;

    var apply = function (scrolled) {
      HEADER_SCROLLED.forEach(function (c) { pill.classList.toggle(c, scrolled); });
      HEADER_UNSCROLLED.forEach(function (c) { pill.classList.toggle(c, !scrolled); });
    };
    var onScroll = function () { apply(window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    var header = document.getElementById('header');
    if (!header) return;
    var toggle = header.querySelector('button[aria-label="Open menu"]');
    if (!toggle) return;

    // the drawer is the sibling of the header pill that carries z-40 + fixed
    var drawer = null;
    Array.prototype.slice.call(header.children).forEach(function (el) {
      var cls = (typeof el.className === 'string') ? el.className : '';
      if (cls.indexOf('z-40') !== -1 && cls.indexOf('fixed') !== -1) drawer = el;
    });
    if (!drawer) return;

    var backdrop = drawer.children[0] || null;   // absolute inset-0 bg-ink/50
    var panel = drawer.children[1] || null;      // absolute ... -translate-y-6

    var isOpen = false;
    function setOpen(next) {
      isOpen = next;
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      var icon = toggle.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark text-base' : 'fa-solid fa-bars text-base';

      drawer.classList.toggle('opacity-100', isOpen);
      drawer.classList.toggle('visible', isOpen);
      drawer.classList.toggle('opacity-0', !isOpen);
      drawer.classList.toggle('invisible', !isOpen);

      if (panel) {
        panel.classList.toggle('translate-y-0', isOpen);
        panel.classList.toggle('-translate-y-6', !isOpen);
      }
      // React locked background scroll while the drawer was open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () { setOpen(!isOpen); });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });

    if (panel) {
      // accordions: a type=button immediately followed by a max-h-0 body
      $$('button[type="button"]', panel).forEach(function (btn) {
        var body = btn.nextElementSibling;
        if (!body || !body.classList.contains('max-h-0')) return;
        var chev = btn.querySelector('i.fa-chevron-down');
        btn.addEventListener('click', function () {
          var opened = body.classList.contains('max-h-96');
          body.classList.toggle('max-h-96', !opened);
          body.classList.toggle('max-h-0', opened);
          if (chev) chev.classList.toggle('rotate-180', !opened);
        });
      });
      // any link inside the drawer closes it (React did this on route change)
      $$('a', panel).forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) setOpen(false);
    });
  }

  /* ==========================================================================
     SECTION 7 - HOME HERO CAROUSEL
     Mirrors HeroShowcase in Home.jsx: 10 slides, 1.2s crossfade, prev/next,
     pagination dots, live counter, caption, 5.5s autoplay paused on hover.

     The captured markup already contains all 10 <img> at their FINAL motion
     values (active slide opacity 1 / scale 1 / z 1, the rest opacity 0 /
     scale 1.03 / z 0) because the capture drove the carousel through every
     slide. Only the ACTIVE slide's caption is in the DOM, so the slide
     metadata below mirrors HERO_SLIDES from src/pages/Home.jsx verbatim.
     If those slides ever change, update both.
     ========================================================================== */

  var HERO_SLIDES = [
    { tag: 'Kizen Campus · Sector 34-A', title: 'Vibrant Student Community & Celebrations', desc: 'Energetic, supportive learning atmosphere where aspiring commerce & finance scholars collaborate.' },
    { tag: 'Smart Classrooms', title: 'Concept-First Faculty Lectures & Board Prep', desc: 'Structured pedagogy combining conceptual clarity with board exam rigor and professional insights.' },
    { tag: 'Sector 34-A Center', title: 'Executive Front Desk & Admission Lounge', desc: 'Welcoming consultation spaces designed for transparent student career mapping and academic advisory.' },
    { tag: 'Conference & Seminar Facility', title: 'Modern Commerce & ACCA Seminar Facility', desc: 'Spacious air-conditioned halls equipped for industry masterclasses, guest lectures, and student orientation.' },
    { tag: 'Analytics & Problem Solving', title: 'Advanced Quantitative & Problem-Solving Labs', desc: 'Interactive step-by-step problem dissection for applied accounting, financial math, and taxation.' },
    { tag: 'Collaborative Learning', title: 'Peer Discussions & Group Study Sessions', desc: 'Interactive round-table learning encouraging student debate, case studies, and cooperative exam strategies.' },
    { tag: 'Dedicated Faculty Support', title: '1-on-1 Mentorship & Individual Doubt Resolution', desc: 'Personal faculty access outside lecture hours to resolve doubts and track individual student performance.' },
    { tag: 'Student Milestones', title: 'Celebrating Academic Excellence & Exam Triumphs', desc: 'Recognizing student achievements in board examinations, ACCA paper clearances, and university admits.' },
    { tag: 'Small Batch Focus', title: 'Focused Small Batches & Direct Mentorship', desc: 'Restricted batch sizes ensuring no student sits at the back unheard or unnoticed during lectures.' },
    { tag: 'Student Services', title: 'Dedicated Academic Helpdesk & Student Support', desc: 'Full-time support for study material distribution, batch schedules, and ACCA registration guidance.' },
  ];

  function initHeroCarousel() {
    var nextBtn = document.querySelector('button[aria-label="Next campus photo"]');
    var prevBtn = document.querySelector('button[aria-label="Previous campus photo"]');
    if (!nextBtn || !prevBtn) return; // not the Home page

    var imgs = $$('img[alt]').filter(function (im) {
      return /campus-|slide-/.test(im.getAttribute('src') || '');
    });
    var dots = $$('button[aria-label^="Go to slide "]');
    if (!dots.length) return;

    // find the caption/tag/counter nodes relative to the hero
    var hero = nextBtn.closest('div[class*="rounded-3xl"]') || nextBtn.parentNode;
    var caption = hero ? hero.querySelector('div.font-serif') : null;
    var desc = caption && caption.nextElementSibling ? caption.nextElementSibling : null;
    var tagEl = null;
    var counterEl = null;
    if (hero) {
      $$('span', hero).forEach(function (s) {
        var t = (s.textContent || '').trim();
        if (/^\d{2}\s*\/\s*\d{2}$/.test(t)) counterEl = s;
        else if (s.querySelector('span') && s.textContent.trim().length > 2 && !tagEl && s.className.indexOf('tracking-widest') !== -1) tagEl = s;
      });
    }

    var index = 0;
    var paused = false;
    var timer = null;

    // framer-motion animated these via rAF, so no CSS transition was captured.
    imgs.forEach(function (im) {
      im.style.transition = 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out';
    });

    function render() {
      imgs.forEach(function (im, i) {
        var active = i === index;
        im.style.opacity = active ? '1' : '0';
        im.style.transform = active ? 'none' : 'scale(1.03)';
        im.style.zIndex = active ? '1' : '0';
      });
      dots.forEach(function (d, i) {
        var active = i === index;
        d.classList.toggle('w-5', active);
        d.classList.toggle('bg-gold', active);
        d.classList.toggle('w-1.5', !active);
        d.classList.toggle('bg-white/40', !active);
        d.classList.toggle('hover:bg-white', !active);
      });
      var s = HERO_SLIDES[index];
      if (s) {
        if (caption) caption.textContent = s.title;
        if (desc) desc.textContent = s.desc;
        if (tagEl) tagEl.textContent = s.tag;
      }
      if (counterEl) {
        counterEl.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(HERO_SLIDES.length).padStart(2, '0');
      }
    }

    function go(i) {
      index = (i + HERO_SLIDES.length) % HERO_SLIDES.length;
      render();
    }

    nextBtn.addEventListener('click', function () { go(index + 1); });
    prevBtn.addEventListener('click', function () { go(index - 1); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); });
    });

    if (hero) {
      hero.addEventListener('mouseenter', function () { paused = true; });
      hero.addEventListener('mouseleave', function () { paused = false; });
    }

    timer = window.setInterval(function () {
      if (!paused) go(index + 1);
    }, 5500);

    render();
  }

  /* ==========================================================================
     SECTION 8 - HOME STAT COUNT-UP
     Mirrors useCountUp(): 2s easeOut from 0 to the target, triggered once when
     the stat scrolls into view (-50px root margin, `once: true`).
     The captured markup already holds the FINAL values (180+, 13, 95%+), which
     is what keeps the page correct even with JS disabled - the animation is
     pure progressive enhancement.
     ========================================================================== */

  function initStatCountUp() {
    if (!('IntersectionObserver' in window)) return;

    // mirrors the three <StatItem> calls in Home.jsx
    var LABELS = [
      { text: 'Countries recognise ACCA', end: 180, suffix: '+' },
      { text: 'Papers, structured pathway', end: 13, suffix: '' },
      { text: 'Kizen pass rate', end: 95, suffix: '%+' },
    ];

    var targets = [];
    var labelEls = $$('div').filter(function (d) {
      return typeof d.className === 'string' && d.className.indexOf('text-ink/60') !== -1;
    });

    labelEls.forEach(function (labelEl) {
      var want = LABELS.filter(function (L) { return labelEl.textContent.trim() === L.text; })[0];
      if (!want) return;
      var valueDiv = labelEl.previousElementSibling;
      var span = valueDiv ? valueDiv.querySelector('span') : null;
      if (!span || !labelEl.parentNode) return;
      targets.push({ span: span, root: labelEl.parentNode, end: want.end, suffix: want.suffix, done: false });
    });

    if (!targets.length) return;

    function animate(t) {
      if (t.done) return;
      t.done = true;
      var start = performance.now();
      var DURATION = 2000;
      var step = function (now) {
        var p = Math.min(1, (now - start) / DURATION);
        var eased = 1 - Math.pow(1 - p, 3); // easeOut
        if (p < 1) {
          t.span.textContent = Math.round(eased * t.end) + t.suffix;
          requestAnimationFrame(step);
        } else {
          t.span.textContent = t.end + t.suffix;
        }
      };
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        targets.forEach(function (t) { if (t.root === e.target) animate(t); });
        io.unobserve(e.target);
      });
    }, { rootMargin: '-50px' });

    targets.forEach(function (t) { io.observe(t.root); });
  }

  /* ==========================================================================
     SECTION 9 - COURSES LEVEL FILTER
     Mirrors the Courses.jsx filter state and tab UI. Clicking a filter tab
     updates aria-selected on each tab and shows/hides the sections tagged with
     the corresponding level id (school, undergrad, postgrad). The "All
     Programmes" tab resets to show every level.

     Each tab button on the live page carries an href of the form
       /courses/#<level>
     e.g. /courses/#school, /courses/#undergrad, /courses/#postgrad, and
     /courses/#all for the All Programmes tab. That href is the single source
     of truth for the mapping, so a new level can be added to Courses.jsx and
     the static page without touching this file.
     ========================================================================== */

  function initCoursesFilter() {
    var filterBar = document.getElementById('level-filter');
    if (!filterBar) return;

    var tablist = filterBar.querySelector('[role="tablist"]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    // derive the level id from each tab's href (/courses/#<id>) — mirrors the
    // id props used in Courses.jsx so the two stay in sync by construction
    var LEVEL_IDS = tabs
      .map(function (tab) {
        var href = tab.getAttribute('href') || '';
        var m = href.match(/#([^#\s]+)\s*$/);
        return m ? m[1] : null;
      })
      .filter(function (id) { return id !== null; });

    // sections whose id equals one of the level ids get filtered in/out
    var levelSections = LEVEL_IDS.map(function (id) {
      var el = document.getElementById(id);
      return el && el.tagName === 'SECTION' ? el : null;
    }).filter(Boolean);

    var activeStyle =
      'bg-navy text-paper border-gold/50 shadow-sm';
    var inactiveStyle =
      'bg-paper text-ink/70 border-ink/10 hover:border-navy/40 hover:text-ink';

    function apply(tab, active) {
      tabs.forEach(function (t) {
        var isThis = (t === tab);
        t.setAttribute('aria-selected', isThis ? 'true' : 'false');
        // React ships a stable className; toggle the active/inactive flavour
        // on top of it rather than clobbering the whole attribute.
        if (isThis) {
          t.classList.add(activeStyle);
          t.classList.remove(inactiveStyle);
        } else {
          t.classList.add(inactiveStyle);
          t.classList.remove(activeStyle);
        }
      });
      levelSections.forEach(function (sec) {
        sec.classList.toggle('hidden', !('data-level' in sec.dataset && sec.dataset.level !== tab.getAttribute('href').match(/#([^#\s]+)\s*$/)[1]));
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var m = (tab.getAttribute('href') || '').match(/#([^#\s]+)\s*$/);
        var level = m ? m[1] : 'all';

        tabs.forEach(function (t) {
          var isActive = (t === tab);
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            t.classList.add(activeStyle);
            t.classList.remove(inactiveStyle);
          } else {
            t.classList.add(inactiveStyle);
            t.classList.remove(activeStyle);
          }
        });

        // 'all' shows every level section; a specific id shows only that one
        if (level === 'all' || !level) {
          levelSections.forEach(function (sec) { sec.classList.remove('hidden'); });
        } else {
          levelSections.forEach(function (sec) {
            sec.classList.toggle('hidden', sec.id !== level);
          });
        }
      });
    });
  }

  /* ================================================================ BOOT */

  function init() {
    adoptPartials();
    wireEnquiryLinks();
    wireAllForms(document);
    initHeader();
    initMobileMenu();
    initHeroCarousel();
    initStatCountUp();
    initCoursesFilter();
    flushRetryQueue(); // recover anything a past outage left behind
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
