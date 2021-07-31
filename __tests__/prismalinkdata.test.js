const path = require("path");
const { default: Prisma } = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  getLinkData,
  insertPageLinks,
  updateLink,
  deleteLink,
  reorderLinks,
} = require("../lib/dbfuncprisma");

describe("Test Link data", () => {
  beforeAll(async () => {
    await Prisma.linkdata.deleteMany();
    await Prisma.linkdata.create({
      data: {
        id: 1,
        pagedataid: 1,
        iconClass: "fas fa-link",
        displayText: "Welcome to LinkIn",
        linkUrl: "https://github.com/RizkyRajitha/linkin",
        bgColor: "#2C6BED",
        active: true,
      },
    });
  });

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  test("get link data", async () => {
    let { linkData } = await getLinkData();

    const expectedLink = {
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

    expect(updatedLinkData.linkData).toMatchObject([
      ...beforeUpdateLinkData.linkData,
      linkTobeinserted,
    ]);
  });

  test("delete link data ", async () => {
    let beforeUpdateLinkData = await (await getLinkData()).linkData;
    //console.info(beforeUpdateLinkData.linkData[1].id);

    let delelement = beforeUpdateLinkData.filter((ele) => {
      return ele.id !== 1;
    });

    await deleteLink({ id: delelement[0].id });
    let updatedLinkData = await getLinkData();

    //console.info(updatedLinkData);

    expectedLink = beforeUpdateLinkData.filter((ele) => {
      return ele.id === 1;
    });

    expect(updatedLinkData.linkData[0]).toMatchObject(expectedLink[0]);
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

  test("reorder links", async () => {
    await insertPageLinks({
      pagedataid: 1,
      iconClass: "fas fa-link",
      displayText: "link2",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    });

    let orderList = await (
      await getLinkData()
    ).linkData.map((item) => {
      return { id: item.id, orderIndex: item.orderIndex };
    });

    // console.info(orderList);

    let reOrderList = orderList.map((item, index) => {
      return { id: item.id, orderIndex: index };
    });

    await reorderLinks(reOrderList);

    let updatedOrderList = await (
      await getLinkData()
    ).linkData.map((item) => {
      return { orderIndex: item.orderIndex };
    });

    // expect(updatedLinkData.linkData[0]).toMatchObject(linkTobeUpdated);

    let expectedOrderList = [{ orderIndex: 0 }, { orderIndex: 1 }];

    expectedOrderList.forEach((element, index) => {
      expect(element).toMatchObject(updatedOrderList[index]);
    });
  });
});
