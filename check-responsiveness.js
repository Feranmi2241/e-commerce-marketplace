// check-responsiveness.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
  { name: 'home',                       path: '/' },
  { name: 'shop',                       path: '/shop' },
  { name: 'product',                    path: '/product' },
  { name: 'cart',                       path: '/cart' },
  { name: 'checkout',                   path: '/checkout' },
  { name: 'order-confirmation',         path: '/order-confirmation' },
  { name: 'orders',                     path: '/orders' },
  { name: 'wishlist',                   path: '/wishlist' },
  { name: 'compare',                    path: '/compare' },
  { name: 'search',                     path: '/search' },
  { name: 'category',                   path: '/category' },
  { name: 'easy-buy',                   path: '/easy-buy' },
  { name: 'chat',                       path: '/chat' },
  { name: 'dashboard',                  path: '/dashboard' },
  { name: 'notifications',              path: '/notifications' },
  { name: 'settings',                   path: '/settings' },
  { name: 'reviews',                    path: '/reviews' },
  { name: 'returns',                    path: '/returns' },
  { name: 'about',                      path: '/about' },
  { name: 'contact',                    path: '/contact' },
  { name: 'faq',                        path: '/faq' },
  { name: 'help-center',                path: '/help-center' },
  { name: 'legal',                      path: '/legal' },
  { name: 'terms',                      path: '/terms' },
  { name: 'auth-sign-in',               path: '/auth/sign-in' },
  { name: 'auth-sign-up',               path: '/auth/sign-up' },
  { name: 'auth-forgot-password',       path: '/auth/forgot-password' },
  { name: 'auth-reset-password',        path: '/auth/reset-password' },
  { name: 'auth-verify-otp',            path: '/auth/verify-otp' },
  { name: 'account-settings',           path: '/account/settings' },
  { name: 'account-payment-methods',    path: '/account/payment-methods' },
  { name: 'admin-dashboard',            path: '/admin/dashboard' },
  { name: 'admin-products',             path: '/admin/products' },
  { name: 'admin-categories',           path: '/admin/categories' },
  { name: 'admin-orders',               path: '/admin/orders' },
  { name: 'admin-customers',            path: '/admin/customers' },
  { name: 'admin-analytics',            path: '/admin/analytics' },
  { name: 'admin-reviews',              path: '/admin/reviews' },
  { name: 'admin-discounts',            path: '/admin/discounts' },
  { name: 'admin-easy-buy',             path: '/admin/easy-buy' },
  { name: 'admin-chats',                path: '/admin/chats' },
  { name: 'admin-notifications',        path: '/admin/notifications' },
  { name: 'admin-settings',             path: '/admin/settings' },
  { name: 'admin-account',              path: '/admin/account' },
];

const VIEWPORTS = [
  { label: 'Mobile',  width: 375,  height: 812  },
  { label: 'Tablet',  width: 768,  height: 1024 },
  { label: 'Desktop', width: 1440, height: 900  },
];

// Create screenshot folders
for (const vp of VIEWPORTS) {
  const dir = path.join('screenshots', vp.label.toLowerCase());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function checkPage(page, route, viewport) {
  const issues = [];

  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  try {
    await page.goto(`${BASE_URL}${route.path}`, {
      waitUntil: 'networkidle',
      timeout: 25000,
    });
  } catch {
    issues.push({ type: 'load-error', detail: 'Page failed to load within 25s' });
    return issues;
  }

  await page.waitForTimeout(800);

  // ── Check 1: Horizontal overflow on body / html ───────────────────────────
  const overflow = await page.evaluate((vpw) => {
    const results = [];
    const bsw = document.body.scrollWidth;
    const hsw = document.documentElement.scrollWidth;
    if (bsw > vpw + 5)
      results.push({ type: 'horizontal-overflow', detail: `body.scrollWidth ${bsw}px exceeds viewport ${vpw}px` });
    if (hsw > vpw + 5 && hsw !== bsw)
      results.push({ type: 'horizontal-overflow', detail: `html.scrollWidth ${hsw}px exceeds viewport ${vpw}px` });
    return results;
  }, viewport.width);
  issues.push(...overflow);

  // ── Check 2: Structural elements clipped past right edge ─────────────────
  const clipped = await page.evaluate((vpw) => {
    const results = [];
    const seen = new Set();
    const tags = ['img','table','nav','aside','header','footer','section',
                  'main','form','button','input','select','textarea','video','iframe'];
    for (const tag of tags) {
      for (const el of document.querySelectorAll(tag)) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.right > vpw + 10) {
          const label = `<${tag}${el.id ? '#'+el.id : el.className ? '.'+String(el.className).trim().split(' ')[0] : ''}>`;
          if (seen.has(label)) continue;
          seen.add(label);
          results.push({
            type: 'element-overflow',
            detail: `${label} right edge at ${Math.round(r.right)}px, viewport is ${vpw}px`,
          });
        }
      }
    }
    return results;
  }, viewport.width);
  issues.push(...clipped);

  // ── Check 3: Text elements clipped past right edge ────────────────────────
  const textOverflow = await page.evaluate((vpw) => {
    for (const el of document.querySelectorAll('h1,h2,h3,p,span,a,li,td,th,label')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vpw + 10) {
        const preview = (el.textContent || '').trim().slice(0, 50);
        return [{
          type: 'text-overflow',
          detail: `<${el.tagName.toLowerCase()}> right edge at ${Math.round(r.right)}px — "${preview}"`,
        }];
      }
    }
    return [];
  }, viewport.width);
  issues.push(...textOverflow);

  // ── Check 4: Fixed/sticky elements wider than viewport ───────────────────
  const fixed = await page.evaluate((vpw) => {
    const results = [];
    for (const el of document.querySelectorAll('*')) {
      const pos = window.getComputedStyle(el).position;
      if (pos !== 'fixed' && pos !== 'sticky') continue;
      const r = el.getBoundingClientRect();
      if (r.width > vpw + 10 && r.width > 0) {
        const label = el.tagName.toLowerCase() +
          (el.id ? '#'+el.id : el.className ? '.'+String(el.className).trim().split(' ')[0] : '');
        results.push({
          type: 'fixed-element-overflow',
          detail: `<${label}> fixed/sticky width ${Math.round(r.width)}px exceeds viewport ${vpw}px`,
        });
      }
    }
    return results;
  }, viewport.width);
  issues.push(...fixed);

  // ── Screenshot ────────────────────────────────────────────────────────────
  const screenshotPath = path.join('screenshots', viewport.label.toLowerCase(), `${route.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return issues;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page    = await context.newPage();

  let totalIssues = 0;
  const summary   = [];

  for (const route of ROUTES) {
    console.log(`\nChecking: ${route.path}`);

    for (const vp of VIEWPORTS) {
      const issues = await checkPage(page, route, vp);

      if (issues.length === 0) {
        console.log(`  ${vp.label} (${vp.width}px): ✓ No issues`);
      } else {
        for (const issue of issues) {
          console.log(`  ${vp.label} (${vp.width}px): ✗ [${issue.type}] ${issue.detail}`);
          totalIssues++;
          summary.push({ page: route.path, viewport: `${vp.label} (${vp.width}px)`, ...issue });
        }
      }
    }
  }

  await browser.close();

  console.log('\n══════════════════════════════════════════════════════');
  console.log(`  DONE — ${totalIssues} issue(s) found across ${ROUTES.length} pages`);
  console.log('══════════════════════════════════════════════════════');

  if (summary.length > 0) {
    console.log('\nFull issue list:');
    for (const s of summary) {
      console.log(`  [${s.viewport}] ${s.page} — ${s.type}: ${s.detail}`);
    }
  }

  console.log('\nScreenshots saved in:');
  console.log('  screenshots/mobile/');
  console.log('  screenshots/tablet/');
  console.log('  screenshots/desktop/');
})();
