const path = require("path");
const { default: Prisma } = require("../db/dbconprisma");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});

const {
  getSocialData,
  insertSocialLinks,
  updateSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
} = require("../lib/dbfuncprisma");

describe("Test Social data", () => {
  beforeAll(async () => {
    await Prisma.socialdata.deleteMany();
    await Prisma.socialdata.create({
      data: {
        id: 1,
        pagedataid: 1,
        iconClass: "fas fa-link",
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

  test("get social data", async () => {
    let { socialData } = await getSocialData();

    const expectedSocialLink = {
      pagedataid: 1,
      iconClass: "fas fa-link",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    socialData.forEach((element) => {
      expect(element).toMatchObject(expectedSocialLink);
    });
  });

  test("get social data without inactive", async () => {
    let { socialData } = await getSocialData(false);

    const expectedSocialLink = {
      pagedataid: 1,
      iconClass: "fas fa-link",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    };

    socialData.forEach((element) => {
      expect(element).toMatchObject(expectedSocialLink);
    });
  });

  test("insert social data ", async () => {
    const socialLinkToBeInserted = {
      pagedataid: 1,
      iconClass: "fas fa-link",
      linkUrl: "https://testing.com",
      bgColor: "#2C6aED",
      active: true,
    };

    let beforeUpdateSocialData = await getSocialData();
    await insertSocialLinks(socialLinkToBeInserted);
    let updatedSocialData = await getSocialData();

    expect(updatedSocialData.socialData).toMatchObject([
      ...beforeUpdateSocialData.socialData,
      socialLinkToBeInserted,
    ]);
  });

  test("delete social data ", async () => {
    let beforeUpdateSocialData = (await getSocialData()).socialData;

    let delelement = beforeUpdateSocialData.filter((ele) => ele.id !== 1);

    await deleteSocialLink({ id: delelement[0].id });
    let updatedSocialData = await getSocialData();

    expectedLink = beforeUpdateSocialData.filter((ele) => ele.id === 1);

    expect(updatedSocialData.socialData[0]).toMatchObject(expectedLink[0]);
  });

  test("update social data ", async () => {
    const socialLinkToBeUpdated = {
      id: 1,
      pagedataid: 1,
      iconClass: "fas fa-link",
      linkUrl: "https://testing.com",
      bgColor: "#2C6aED",
      active: true,
    };

    await updateSocialLink(socialLinkToBeUpdated);
    let updatedSocialData = await getSocialData();

    expect(updatedSocialData.socialData[0]).toMatchObject(
      socialLinkToBeUpdated
    );
  });

  test("reorder social links", async () => {
    await insertSocialLinks({
      pagedataid: 1,
      iconClass: "fab fa-tiktok",
      linkUrl: "https://github.com/RizkyRajitha/linkin",
      bgColor: "#2C6BED",
      active: true,
    });

    let orderList = (await getSocialData()).socialData.map((item) => {
      return { id: item.id, orderIndex: item.orderIndex };
    });

    let reOrderList = orderList.map((item, index) => {
      return { id: item.id, orderIndex: index };
    });

    await reorderSocialLinks(reOrderList);

    let updatedOrderList = (await getSocialData()).socialData.map((item) => {
      return { orderIndex: item.orderIndex };
    });

    let expectedOrderList = [{ orderIndex: 0 }, { orderIndex: 1 }];

    expectedOrderList.forEach((element, index) => {
      expect(element).toMatchObject(updatedOrderList[index]);
    });
  });
});
