const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const cloudinary = require("cloudinary").v2;

const testingUrl = "http://localhost:3000";

if (
  !process.env.CLOUDINARY_CLOUD_NAME &&
  !process.env.CLOUDINARY_API_KEY &&
  !process.env.CLOUDINARY_API_SECRET
) {
  console.log("cloudinary not configured");
  process.exit(1);
}

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

    console.log("captureIndexPage");
    await captureIndexPage(browser);
    console.log("captureDashboard");
    await captureDashboard(browser);
    console.log("uplaodImages");
    let urlList = await uplaodImages();

    await browser.close();

    let commentBody = `Screenshots `;

    urlList.forEach((element) => {
      commentBody = commentBody + ` ![image](${element}) `;
    });
    // commentBody = commentBody + ``;
    console.log(commentBody);

    // execSync(
    //   `echo "action_state=![image](${uplaodedImage.url})" >> $GITHUB_ENV`
    // );
    execSync(`echo "commentBody='Screenshots ${commentBody}'" >> $GITHUB_ENV`);
    execSync(
      `echo '::set-output name=commentBody::Screenshots via set out "${commentBody}"'`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

run();

const uplaodImages = async () => {
  images = fs.readdirSync(`${cwd}/images/`);
  console.log(images);

  let promiseArray = [];
  let urlList = [];

  images.forEach(async (element) => {
    console.log("upload image..");
    let uplaodedImagePromise = cloudinary.uploader.upload(
      `${cwd}/images/${element}`,
      {
        tags: "linkinss",
        folder: "linkin/linkin-ci-ss",
        public_id: `ss-${new Date().getTime()}`,
        sign_url: true,
      }
    );
    promiseArray.push(uplaodedImagePromise);
  });

  urlList = await Promise.all(promiseArray);
  console.log(urlList);
  urlList = urlList.map((ele) => ele.url);
  console.log(urlList);
  return urlList;
};

const captureIndexPage = async (
  browser,
  viewport = { width: 1920, height: 1080 }
) => {
  let page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(testingUrl, {
    waitUntil: "networkidle2",
  });

  await page.screenshot({
    path: `${cwd}/images/index-${new Date().getTime()}.png`,
  });
};

const captureDashboard = async (
  browser,
  viewport = { width: 1920, height: 1080 }
) => {
  let page = await browser.newPage();

  await page.setViewport(viewport);

  await page.goto(`${testingUrl}/admin`, {
    waitUntil: "networkidle2",
  });

  await page.type("#username", "admin");
  await page.type("#password", "linkin123");

  await Promise.all([
    page.click("#submit"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  await page.screenshot({
    path: `${cwd}/images/dashboard-${new Date().getTime()}.png`,
  });
};
