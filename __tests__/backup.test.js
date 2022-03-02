const path = require("path");
const { default: Prisma } = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  restoreBackupData,
  getPageDatawLinkAndSocialData,
} = require("../lib/dbfuncprisma");
describe("Test backup function", () => {
  beforeAll(async () => {
    await Prisma.pagedata.deleteMany();
    await Prisma.socialdata.deleteMany();
    await Prisma.linkdata.deleteMany();
    await Prisma.pagedata.create({
      data: {
        id: 1,
        handlerText: "test",
        avatarUrl: "",
        avatarBorderColor: "#ffffff",
        bgColor: "#7ea2ff",
        accentColor: "#bdd7ff",
        handlerFontSize: "20",
        handlerFontColor: "#ffffff",
        avatarwidth: "50",
        footerBgColor: "#7ea2ff",
        footerTextSize: "12",
        footerText: "Test footer",
        footerTextColor: "#ffffff",
        handlerDescription: "Test description",
        handlerDescriptionFontColor: "#ffffff",
        linktreeWidth: "320",
        linkdata: {
          create: {
            bgColor: "#2C6BED",
            textColor: "#ffffff",
            displayText: "Welcome to Linkin",
            iconClass: "fas fa-link",
            linkUrl: "https://github.com/RizkyRajitha/linkin",
          },
        },
        socialdata: {
          create: {
            iconClass: "fab fa-github",
            linkUrl: "https://github.com/RizkyRajitha/linkin",
            bgColor: "#2C6BED",
            borderRadius: "5",
          },
        },
      },
    });
  });

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  test("fails when no data provided", async () => {
    await expect(restoreBackupData).rejects.toThrow("no data to backup");
  });

  test("backups correctly with correct info", async () => {
    const dataToBackup = {
      pageData: {
        id: 1,
        handlerText: "Test Backup",
      },
      socialData: [],
      linkData: [],
    };
    await restoreBackupData(dataToBackup);
    let dbInfo = await getPageDatawLinkAndSocialData();

    for (let n in dataToBackup.pageData) {
      expect(dataToBackup.pageData[n]).toBe(dbInfo.pageData[n]);
    }
  });
});
