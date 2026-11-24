import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle' });
for (const [name, selector] of [['process','#how-it-works'],['reviews','#reviews'],['services','#services'],['promise','#promise-heading'],['faq','#faq'],['final','#contact']]) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.qa/sec-${name}.png` });
}
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await mob.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle' });
for (const [name, selector] of [['promise','#promise-heading'],['process','#how-it-works'],['reviews','#reviews'],['faq','#faq'],['final','#contact']]) {
  await mob.locator(selector).first().scrollIntoViewIfNeeded();
  await mob.waitForTimeout(400);
  await mob.screenshot({ path: `.qa/mob-${name}.png` });
}
const brief = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await brief.goto('http://127.0.0.1:4176/#brief', { waitUntil: 'networkidle' });
await brief.waitForTimeout(900);
await brief.evaluate(() => document.querySelector('.brief-scroll')?.scrollTo(0, 1400));
await brief.waitForTimeout(400);
await brief.screenshot({ path: '.qa/brief-mid.png' });
await brief.evaluate(() => document.querySelector('.brief-scroll')?.scrollTo(0, 3600));
await brief.waitForTimeout(400);
await brief.screenshot({ path: '.qa/brief-mid2.png' });
await browser.close();
