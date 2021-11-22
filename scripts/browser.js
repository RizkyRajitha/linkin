const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const cloudinary = require("cloudinary").v2;

console.log(process.env.CLOUDINARY_CLOUD_NAME);

// if (
//   !process.env.CLOUDINARY_CLOUD_NAME &&
//   !process.env.CLOUDINARY_API_KEY &&
//   !process.env.CLOUDINARY_API_SECRET
// ) {
//   console.log("cloudinary not configured");
//   process.exit(0);
// }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

    let page = await browser.newPage();

    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle2",
    });

    await page.screenshot({ path: `${cwd}/images/Image.png` });

    console.log("upload image..");
    let uplaodedImage = await cloudinary.uploader.upload(
      `${cwd}/images/Image.png`,
      {
        tags: "linkinss",
        folder: "linkin/linkin-ci-ss",
        public_id: `ss-${new Date().getTime()}`,
        sign_url: true,
      }
    );
    console.log(uplaodedImage.url);

    await browser.close();

    execSync(`echo "action_state=![image](${uplaodedImage.url})" >> $GITHUB_ENV`);
    // execSync(
    //   `echo '::set-output name=imageUrl::![image](${uplaodedImage.url})'`
    // );
  } catch (error) {
    console.log(error);
  }
};

run();
