import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("https://www.marketmoneyhq.com/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(4500);
const info = await page.evaluate(() => {
  const title = document.title;
  const h1 = document.querySelector("h1");
  const text = h1?.innerText || "";
  const freedom = [...document.querySelectorAll("h1 *")].find((el) =>
    (el.textContent || "").includes("Freedom")
  );
  if (!freedom) return { title, text, found: false };
  const cs = getComputedStyle(freedom);
  const parent = freedom.parentElement;
  const pcs = parent ? getComputedStyle(parent) : null;
  const fr = freedom.getBoundingClientRect();
  const pr = parent?.getBoundingClientRect();
  return {
    title,
    text,
    freedomText: freedom.textContent,
    freedomOverflow: cs.overflow,
    parentOverflow: pcs?.overflow,
    parentClass: parent?.className,
    freedomWidth: fr.width,
    parentWidth: pr?.width,
    clippedRight: pr ? fr.right > pr.right + 1 : null,
    clippedBottom: pr ? fr.bottom > pr.bottom + 1 : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: "scripts/freedom-check.png", fullPage: false });
await browser.close();
