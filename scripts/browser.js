const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const cloudinary = require("cloudinary").v2;

if (process.env.cloud_name && process.env.api_key && process.env.api_secret) {
  console.log("cloudinary not configured ");
  process.exit(0);
}

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

let browser;

let cwd = path.resolve(__dirname);
console.log(cwd);
fs.mkdirSync(`${cwd}/images`);

const run = async () => {
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle2",
    });
    await page.screenshot({ path: `${cwd}/images/Image.png` });

    await browser.close();

    let uplaodedImage = await cloudinary.uploader.upload(
      `${cwd}/images/Image.png`,
      {
        tags: "linkinss",
        folder: "recaux/avatar",
        public_id: `ss${new Date().getTime}`,
        sign_url: true,
      }
    );
    console.log(uplaodedImage.url);
  } catch (error) {
    console.log(error);
  }
};

run();
