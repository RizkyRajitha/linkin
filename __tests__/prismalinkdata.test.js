const path = require("path");
const Prisma = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  getLinkData,
  insertPageLinks,
  updateLink,
  deleteLink,
} = require("../lib/dbfuncprisma");

describe("Test Link data", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterAll(async () => {
    await Prisma.default.$disconnect();
  });

  test("get link data", async () => {
    let { linkData } = await getLinkData();
    //console.info(linkData);
    const expectedLink = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Welcome to LinkIn",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    linkData.forEach((element) => {
      expect(element).toMatchObject(expectedLink);
    });
  });

  test("get link data without active", async () => {
    let { linkData } = await getLinkData(false);
    //console.log(linkData);
    const expectedLink = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Welcome to LinkIn",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    linkData.forEach((element) => {
      expect(element).toMatchObject(expectedLink);
    });
  });

  test("get link data without active", async () => {
    let { linkData } = await getLinkData(false);
    const expectedLink = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Welcome to LinkIn",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    linkData.forEach((element) => {
      expect(element).toMatchObject(expectedLink);
    });
  });

  test("insert link data ", async () => {
    const linkTobeinserted = {
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Test Link",
      linkUrl: "https://testing.com",
      bgColor: "#2C6aED",
      active: true,
    };

    let beforeUpdateLinkData = await getLinkData();
    await insertPageLinks(linkTobeinserted);
    let updatedLinkData = await getLinkData();

    //console.info(updatedLinkData);

    expect(updatedLinkData.linkData).toMatchObject([
      ...beforeUpdateLinkData.linkData,
      linkTobeinserted,
    ]);
  });

  test("delete link data ", async () => {
    let beforeUpdateLinkData = await getLinkData();
    //console.info(beforeUpdateLinkData.linkData[1].id);

    let delelement = beforeUpdateLinkData.linkData.filter((ele) => {
      return ele.id !== 1;
    });

    await deleteLink({ id: delelement[0].id });
    let updatedLinkData = await getLinkData();

    //console.info(updatedLinkData);

    expect(updatedLinkData.linkData).toMatchObject([
      beforeUpdateLinkData.linkData[0],
    ]);
  });

  test("update link data ", async () => {
    const linkTobeUpdated = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Test Link",
      linkUrl: "https://testing.com",
      bgColor: "#2C6aED",
      active: true,
    };

    // let beforeUpdateLinkData = await getLinkData();
    await updateLink(linkTobeUpdated);
    let updatedLinkdata = await getLinkData();

    //console.info(updatedLinkdata);

    expect(updatedLinkdata.linkData[0]).toMatchObject(linkTobeUpdated);
    // linkData.forEach((element) => {
    //   expect(element).toMatchObject(expectedLink);
    // });
  });

  test("revert updated link data ", async () => {
    const linkTobeUpdated = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "Welcome to LinkIn",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    await updateLink(linkTobeUpdated);
    let updatedLinkData = await getLinkData();

    //console.info(updatedLinkData);

    expect(updatedLinkData.linkData[0]).toMatchObject(linkTobeUpdated);
    // linkData.forEach((element) => {
    //   expect(element).toMatchObject(expectedLink);
    // });
  });
});
