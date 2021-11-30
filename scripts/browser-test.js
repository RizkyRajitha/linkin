const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const cloudinary = require("cloudinary").v2;
const { Buffer } = require("buffer");

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

// not checking if the dir exists because this only run in ci environment
fs.mkdirSync(`${cwd}/images`);

const run = async () => {
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("captureIndexPage resolution 1920X1080");

    await captureIndexPage(browser);

    console.log("captureIndexPage iphone 12|13 pro resolution 390X844");

    await captureIndexPage(
      browser,
      { height: 844, width: 390 },
      "iphone 12|13"
    );

    console.log("captureDashboard resolution 1920X1080");
    await captureDashboard(browser);

    console.log("uplaodImages");
    let urlList = await uplaodImages();

    await browser.close();

    let commentBody = `## Screenshots \n`;

    urlList.forEach((element) => {
      commentBody =
        commentBody +
        `### ${element.ssname} \n <br /> ![screenshot-${element.ssname}](${element.url}) \n`;
    });

    console.log(commentBody);

    let base64commentBodytr = new Buffer.from(commentBody).toString("base64");

    execSync(`echo "commentBody=${base64commentBodytr}" >> $GITHUB_ENV`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

run();

const uplaodImages = async () => {
  let promiseArray = [];
  let urlList = [];

  //read images in screenshot distination directory
  let images = fs.readdirSync(`${cwd}/images/`);

  images.forEach((element) => {
    console.log("uploading image to cloudinary..");

    let uplaodedImagePromise = cloudinary.uploader.upload(
      `${cwd}/images/${element}`,
      {
        tags: "linkinss",
        folder: "linkin/linkin-ci-ss",
        public_id: `${element}-${new Date().getTime()}`,
        sign_url: true,
      }
    );
    promiseArray.push(uplaodedImagePromise);
  });

  urlList = await Promise.all(promiseArray);

  urlList = urlList.map((ele) => {
    let ssname = String(ele.original_filename).split("-")[1];
    return {
      url: ele.url,
      ssname: ssname,
    };
  });

  return urlList;
};

const captureIndexPage = async (
  browser,
  viewport = { width: 1920, height: 1080 },
  deviceName = ""
) => {
  let page = await browser.newPage();

  const ssname = `Index ${deviceName} ${viewport.width}X${viewport.height}`;

  await page.setViewport(viewport);
  await page.goto(testingUrl, {
    waitUntil: "networkidle2",
  });

  await page.screenshot({
    path: `${cwd}/images/index-${ssname}-${new Date().getTime()}.png`,
  });
};

const captureDashboard = async (
  browser,
  viewport = { width: 1920, height: 1080 },
  deviceName = ""
) => {
  const ssname = `Dashboard ${deviceName} ${viewport.width}X${viewport.height}`;

  let page = await browser.newPage();

  await page.setViewport(viewport);

  await page.goto(`${testingUrl}/admin`, {
    waitUntil: "networkidle2",
  });

  // login to dashboard using default credentials
  await page.type("#username", "admin");
  await page.type("#password", "linkin123");

  // wait till login to dashbaord
  await Promise.all([
    page.click("#submit"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  await page.screenshot({
    path: `${cwd}/images/dashboard-${ssname}-${new Date().getTime()}.png`,
  });
};
