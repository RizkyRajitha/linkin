const path = require("path");
const Prisma = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  getPageDatawLinkData,
  getPageData,
  updatePageData,
} = require("../lib/dbfuncprisma");

describe("page data functions", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterAll(async () => {
    await Prisma.default.$disconnect();
  });

  test("get page data ", async () => {
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

  test("get page data with links data with active links", async () => {
    let pageDatawLinks = await getPageDatawLinkData();
    console.log(pageDatawLinks);
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
          id: 1,
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Welcome to LinkIn",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
          active: true,
        },
      ],
    };
    expect(pageDatawLinks).toMatchObject(expectedPageDataWLinks);
  });

  test("get page data with links data without active links", async () => {
    let pageDatawLinks = await getPageDatawLinkData(false);
    //console.info(pageDatawLinks);
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
          id: 1,
          pagedataid: 1,
          iconClass: "fas fa-link",
          displayText: "Welcome to LinkIn",
          linkUrl: "https://github.com/RizkyRajitha/linkin",
          bgColor: "#2C6BED",
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

    //let updatedPageData = await updatePageData(beforUpdatePageData);
    await updatePageData(beforUpdatePageData);
    let updatedPageData = await getPageData();
    //console.info(updatedPageData);

    expect(updatedPageData.pageData).toMatchObject(beforUpdatePageData);
  });

  test("revert Updated page data", async () => {
    let beforUpdatePageData = {
      id: 1,
      avatarUrl:
        "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
      avatarheight: null,
      avatarwidth: "50",
      bgColor: "#7ea2ff",
      accentColor: "#bdd7ff",
      handlerText: "LinkIn",
      handlerLink: null,
      footerText: 'Powered by Linkin',
      bgImgUrl: null,
      handlerFontSize: "20",
      handlerFontColor: "#ffffff",
      active: true,
      fontFamily: null,
      fontUrl: null,
    };

    //let updatedPageData = await updatePageData(beforUpdatePageData);
    await updatePageData(beforUpdatePageData);
    let updatedPageData = await getPageData();
    //console.info(updatedPageData);

    expect(updatedPageData.pageData).toMatchObject(beforUpdatePageData);
  });
});
