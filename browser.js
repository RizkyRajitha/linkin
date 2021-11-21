// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality

const puppeteer = require("puppeteer");
// const fetch = require("node-fetch");
// const core = require("@actions/core");
// const fs = require("fs");
// const FormData = require("form-data");

// add stealth plugin and use defaults (all evasion techniques)
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// puppeteer.use(StealthPlugin());

let browser;


const run = async () => {
  browser = await puppeteer.launch({
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle2",
  });
  await page.screenshot({ path: "Image.png" });

  await browser.close();
};

run();

