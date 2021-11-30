const path = require("path");
const { default: Prisma } = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  getPageDatawLinkAndSocialData,
  getPageData,
  updatePageData,
} = require("../lib/dbfuncprisma");

describe("page data functions", () => {
  beforeAll(async () => {
    await Prisma.linkdata.deleteMany();
    await Prisma.socialdata.deleteMany();
    await Prisma.pagedata.deleteMany();
    await Prisma.pagedata.create({
      data: {
        id: 1,
        avatarUrl:
          "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
        avatarwidth: "50",
        bgColor: "#7ea2ff",
        accentColor: "#bdd7ff",
        handlerText: "LinkIn",
        footerText: "Powered by Linkin",
        handlerFontSize: "20",
        handlerFontColor: "#ffffff",
      },
    });

    await Prisma.linkdata.createMany({
      data: [
        {
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Welcome to LinkIn",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: true,
        },
        {
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Inactive",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: false,
        },
      ],
    });

    await Prisma.socialdata.createMany({
      data: [
        {
          pagedataid: 1,
          iconClass: "fab fa-github",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          borderRadius: "5",
          active: true,
        },
      ],
    });
  });

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterAll(async () => {
    await Prisma.$disconnect();
  });

  test("get pagedata ", async () => {
    let { pageData } = await getPageData();
    const expectedUser = {
      id: 1,
      avatarUrl:
        "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
      avatarwidth: "50",
      bgColor: "#7ea2ff",
      accentColor: "#bdd7ff",
      handlerText: "LinkIn",
      footerText: "Powered by Linkin",
      bgImgUrl: null,
      handlerFontSize: "20",
      handlerFontColor: "#ffffff",
      active: true,
    };
    expect(pageData).toMatchObject(expectedUser);
  });

  test("get page data with all links and social data", async () => {
    let pageDatawLinks = await getPageDatawLinkAndSocialData();
    const expectedPageDataWLinks = {
      pageData: {
        id: 1,
        avatarUrl:
          "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
        avatarheight: null,
        avatarwidth: "50",
        bgColor: "#7ea2ff",
        accentColor: "#bdd7ff",
        handlerText: "LinkIn",
        handlerLink: null,
        footerText: "Powered by Linkin",
        bgImgUrl: null,
        handlerFontSize: "20",
        handlerFontColor: "#ffffff",
        active: true,
        fontFamily: null,
        fontUrl: null,
      },
      linkData: [
        {
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Welcome to LinkIn",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: true,
          accentColor: null,
          borderRadius: null,
          textColor: null,
        },
        {
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Inactive",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: false,
          accentColor: null,
          borderRadius: null,
          textColor: null,
        },
      ],
      socialData: [
        {
          pagedataid: 1,
          iconClass: "fab fa-github",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          borderRadius: "5",
          active: true,
        },
      ],
    };
    expect(pageDatawLinks).toMatchObject(expectedPageDataWLinks);
  });

  test("get page data with only active links", async () => {
    let pageDatawLinks = await getPageDatawLinkAndSocialData(false);
    const expectedPageDataWLinks = {
      pageData: {
        id: 1,
        avatarUrl:
          "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
        avatarheight: null,
        avatarwidth: "50",
        bgColor: "#7ea2ff",
        accentColor: "#bdd7ff",
        handlerText: "LinkIn",
        handlerLink: null,
        footerText: "Powered by Linkin",
        bgImgUrl: null,
        handlerFontSize: "20",
        handlerFontColor: "#ffffff",
        active: true,
        fontFamily: null,
        fontUrl: null,
      },
      linkData: [
        {
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Welcome to LinkIn",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: true,
          accentColor: null,
          borderRadius: null,
          textColor: null,
        },
      ],

      socialData: [
        {
          pagedataid: 1,
          iconClass: "fab fa-github",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          borderRadius: "5",
          active: true,
        },
      ],
    };
    expect(pageDatawLinks).toMatchObject(expectedPageDataWLinks);
  });

  test("Update page data", async () => {
    let beforUpdatePageData = {
      id: 1,
      avatarUrl: "https://testlink.io/linkin_logo_1_jcuvr3.png",
      avatarheight: null,
      avatarwidth: "40",
      bgColor: "#7ea2af",
      accentColor: "#bad7ff",
      handlerText: "LinkIn test",
      handlerLink: "https://testlink.io",
      footerText: "jest testing",
      bgImgUrl: "https://testlink.io/bg.png",
      handlerFontSize: "30",
      handlerFontColor: "#ffffef",
      active: false,
      fontUrl: "https://testlink.io/font.tff",
      fontFamily: "Roboto",
    };

    await updatePageData(beforUpdatePageData);
    let updatedPageData = await getPageData();

    expect(updatedPageData.pageData).toMatchObject(beforUpdatePageData);
  });
});
