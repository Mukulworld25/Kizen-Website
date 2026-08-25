import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\6df29b63-0a72-4419-843b-a1d93bc779e0\\screenshots';
const BASE_URL = 'https://kizen-website-bay.vercel.app';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
  console.log('Starting Complete Live Site Audit on:', BASE_URL);
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const auditLog = {
    persona1: { desktop: [], mobile: [] },
    persona2: { desktop: [], mobile: [] },
    persona3: { desktop: [], mobile: [] },
    consoleErrors: [],
    brokenLinks: []
  };

  // Helper to setup page listeners
  function setupPageListeners(page, personaName, device) {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        auditLog.consoleErrors.push(`[${personaName} - ${device}] Console Error: ${msg.text()}`);
      }
    });
    page.on('pageerror', error => {
      auditLog.consoleErrors.push(`[${personaName} - ${device}] Page Error: ${error.message}`);
    });
  }

  // ==========================================
  // PERSONA 1: School Student (11th/12th Commerce)
  // ==========================================
  console.log('\n--- Running PERSONA 1: School Student (Desktop 1440px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 1', 'Desktop');
    await page.setViewport({ width: 1440, height: 900 });

    // Step 1: Land on Home
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_01_home.png') });
    console.log('Saved p1_desk_01_home.png');

    // Check Home page for 11th/12th Commerce mentions & Hero CTA
    const heroText = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    const commerceMentions = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a, button, h2, h3, p, div'))
        .filter(el => /11th|12th|\+1|\+2|School|Commerce/i.test(el.innerText))
        .map(el => ({ tag: el.tagName, text: el.innerText.slice(0, 100).trim(), href: el.getAttribute('href') }))
        .slice(0, 15);
    });

    // Check Course cards on Home
    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_02_home_courses_section.png') });

    // Click on Courses in header or explore button
    const coursesLink = await page.$('header a[href="/courses"]');
    if (coursesLink) {
      await coursesLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    } else {
      await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle2' });
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_03_courses_page.png') });

    // In Courses page, look for School level / 11th & 12th Commerce tabs/cards
    const coursesTabs = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.map(b => b.innerText.trim()).filter(t => t.length > 0 && t.length < 50);
    });

    // Let's find and click the School / +1 +2 / 11th-12th filter or card
    const schoolTab = await page.evaluateHandle(() => {
      const allBtns = Array.from(document.querySelectorAll('button, div[role="tab"], a'));
      return allBtns.find(el => /11th|12th|\+1|School|Tuition/i.test(el.innerText));
    });
    if (schoolTab && schoolTab.asElement()) {
      await schoolTab.asElement().click();
      await new Promise(r => setTimeout(r, 500));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_04_courses_school_tab.png') });

    // Navigate to About page
    const aboutLink = await page.$('header a[href="/about"]');
    if (aboutLink) {
      await aboutLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    } else {
      await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle2' });
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_05_about_page.png') });

    // Scroll About page to see faculty, credibility, pass rate
    await page.evaluate(() => window.scrollTo(0, 800));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_06_about_faculty.png') });

    // Check Enquiry Form submission / Modal trigger
    // Let's click "Enquire Now" or "Book Free Trial" or "Talk to Counselor"
    const ctaBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      return btns.find(b => /enquire|counseling|trial|admission|contact|register/i.test(b.innerText));
    });
    if (ctaBtn && ctaBtn.asElement()) {
      await ctaBtn.asElement().click();
      await new Promise(r => setTimeout(r, 800));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_desk_07_enquiry_form.png') });

    await page.close();
  }

  // Persona 1 Mobile (375px)
  console.log('\n--- Running PERSONA 1: School Student (Mobile 375px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 1', 'Mobile');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_mob_01_home.png') });

    // Open mobile menu
    const hamburger = await page.evaluateHandle(() => {
      return document.querySelector('header button[aria-label*="menu" i], header button[aria-expanded], header button');
    });
    if (hamburger && hamburger.asElement()) {
      await hamburger.asElement().click();
      await new Promise(r => setTimeout(r, 600));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_mob_02_nav_menu.png') });

    // Navigate to /courses on mobile
    await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_mob_03_courses.png') });

    // Check Sticky Mobile CTA bar
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_mob_04_sticky_cta.png') });

    await page.close();
  }

  // ==========================================
  // PERSONA 2: College Student / Graduate (ACCA)
  // ==========================================
  console.log('\n--- Running PERSONA 2: College Student / ACCA (Desktop 1440px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 2', 'Desktop');
    await page.setViewport({ width: 1440, height: 900 });

    // Step 1: Start at Home and find ACCA link
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_01_home.png') });

    // Click ACCA in nav or hero
    const accaNav = await page.$('header a[href="/acca"]');
    if (accaNav) {
      await accaNav.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    } else {
      await page.goto(`${BASE_URL}/acca`, { waitUntil: 'networkidle2' });
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_02_acca_hero.png') });

    // Scroll to Papers / Structure
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('h2, h3, section')).find(e => /paper|structure|curriculum|applied knowledge|applied skills|strategic/i.test(e.innerText));
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 900);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_03_acca_papers.png') });

    // Test Accordion or Paper tabs if any
    const paperAccordion = await page.evaluateHandle(() => {
      const items = Array.from(document.querySelectorAll('button, div[role="button"], summary, [data-accordion]'));
      return items.find(i => /applied|skills|knowledge|professional|strategic|exemptions/i.test(i.innerText));
    });
    if (paperAccordion && paperAccordion.asElement()) {
      await paperAccordion.asElement().click();
      await new Promise(r => setTimeout(r, 500));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_04_acca_accordion_open.png') });

    // Scroll to Eligibility & Fee / Brochure download
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('h2, h3, button, a')).find(e => /eligibility|brochure|fee|syllabus|download/i.test(e.innerText));
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 1800);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_05_acca_brochure_section.png') });

    // Click "Download Brochure" / "Get Fee Structure" button to trigger BrochureGate modal
    const brochureBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      return btns.find(b => /brochure|syllabus|fee structure|download/i.test(b.innerText));
    });
    if (brochureBtn && brochureBtn.asElement()) {
      await brochureBtn.asElement().click();
      await new Promise(r => setTimeout(r, 800));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_06_brochure_gate_modal.png') });

    // Scroll down to Testimonials / Outcomes / Enquiry Form
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('h2, h3, section')).find(e => /testimonial|stories|reviews|placement|career/i.test(e.innerText));
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 2600);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_07_acca_testimonials.png') });

    // Scroll to Enquiry Form at bottom of ACCA page
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) form.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 3500);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_desk_08_acca_enquiry_form.png') });

    await page.close();
  }

  // Persona 2 Mobile (375px)
  console.log('\n--- Running PERSONA 2: College Student / ACCA (Mobile 375px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 2', 'Mobile');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

    await page.goto(`${BASE_URL}/acca`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_mob_01_acca_hero.png') });

    // Scroll down to papers and brochure
    await page.evaluate(() => window.scrollTo(0, 800));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_mob_02_papers.png') });

    // Open Brochure gate on mobile
    const brochureBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      return btns.find(b => /brochure|fee|syllabus|download/i.test(b.innerText));
    });
    if (brochureBtn && brochureBtn.asElement()) {
      await brochureBtn.asElement().click();
      await new Promise(r => setTimeout(r, 800));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_mob_03_brochure_modal.png') });

    await page.close();
  }

  // ==========================================
  // PERSONA 3: Parent Researching for Child
  // ==========================================
  console.log('\n--- Running PERSONA 3: Parent Researching (Desktop 1440px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 3', 'Desktop');
    await page.setViewport({ width: 1440, height: 900 });

    // Step 1: Home page trust signals (ratings, pass rates, stats)
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_01_home_hero_trust.png') });

    // Scroll to stats/results banner
    await page.evaluate(() => window.scrollTo(0, 600));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_02_home_stats.png') });

    // Go to About page to check founders, history, address, accreditations
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_03_about_credibility.png') });

    // Scroll to leadership / faculty details
    await page.evaluate(() => window.scrollTo(0, 900));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_04_about_faculty_profiles.png') });

    // Navigate to Contact page for address, phone, map, working hours
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_05_contact_info.png') });

    // Scroll to Map and Contact Form
    await page.evaluate(() => window.scrollTo(0, 700));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_06_contact_map_form.png') });

    // Check FAQ section if present on Home, Courses or Contact
    await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const faq = Array.from(document.querySelectorAll('h2, h3, section')).find(e => /faq|frequently|questions/i.test(e.innerText));
      if (faq) faq.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, 2000);
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_desk_07_faq_section.png') });

    await page.close();
  }

  // Persona 3 Mobile (375px)
  console.log('\n--- Running PERSONA 3: Parent Researching (Mobile 375px) ---');
  {
    const page = await browser.newPage();
    setupPageListeners(page, 'Persona 3', 'Mobile');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

    // Check Home trust on mobile
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_mob_01_home.png') });

    // Check Floating actions (WhatsApp / Call button accessibility on mobile)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_mob_02_floating_cta.png') });

    // Go to Contact page on mobile to check click-to-call, tap-to-WhatsApp, address
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_mob_03_contact.png') });

    await page.close();
  }

  // ==========================================
  // Detailed Interactive Component Check
  // ==========================================
  console.log('\n--- Performing Deep Interactive & Element Testing ---');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });

    // Extract all links & buttons across pages
    const routes = ['/', '/courses', '/acca', '/resources', '/about', '/contact'];
    const pageAnalysis = {};

    for (const route of routes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
      const data = await page.evaluate((r) => {
        const title = document.title;
        const h1 = document.querySelector('h1')?.innerText || '';
        const links = Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.innerText.trim().slice(0, 60),
          href: a.getAttribute('href'),
          target: a.getAttribute('target')
        }));
        const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
          text: b.innerText.trim().slice(0, 60),
          ariaLabel: b.getAttribute('aria-label')
        }));
        const forms = Array.from(document.querySelectorAll('form')).map(f => ({
          id: f.id,
          inputs: Array.from(f.querySelectorAll('input, select, textarea')).map(i => ({
            name: i.getAttribute('name'),
            type: i.getAttribute('type'),
            placeholder: i.getAttribute('placeholder'),
            required: i.required
          }))
        }));

        return { route: r, title, h1, linkCount: links.length, links, buttonCount: buttons.length, buttons, forms };
      }, route);

      pageAnalysis[route] = data;
    }

    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, 'audit_data.json'),
      JSON.stringify({ pageAnalysis, consoleErrors: auditLog.consoleErrors }, null, 2)
    );
    console.log('Saved audit_data.json successfully');

    await page.close();
  }

  await browser.close();
  console.log('\nAudit complete! All screenshots and JSON data stored in artifact directory.');
}

runAudit().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
