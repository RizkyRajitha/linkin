const { getPageData } = require("../lib/dbfunc");

test("get admin user", async () => {
  let {pageData} = await getPageData();
  const expectedUser = {
    id: 1,
    avatarUrl:
      "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
    avatarwidth: "50",
    bgColor: "#7ea2ff",
    accentColor: "#bdd7ff",
    handlerText: "LinkIn",
    footerText: null,
    bgImgUrl: null,
    handlerFontSize: "20",
    handlerFontColor: "#ffffff",
    active: true,
  };
  expect(pageData).toMatchObject(expectedUser);
});
