const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});
const Prisma = require("../db/dbconprisma");

const { getUser, changePassword } = require("../lib/dbfuncprisma");

describe("Test User functions", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(async () => {
    await Prisma.default.$disconnect();
  });

  test("get admin user", async () => {
    //console.warn("test 1 --------------------");

    let user = await getUser("admin");

    const expectedUser = {
      username: "admin",
      password: "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
    };
    expect(user).toMatchObject(expectedUser);
  });

  test("change Password of admin", async () => {
    //console.warn("test 2 --------------------");

    try {
      let newUserPasswordData = {
        username: "admin",
        newhashedpassword: "1234",
      };

      const expectedUser = {
        username: "admin",
        password: "1234",
      };

      await changePassword(newUserPasswordData);
      let user = await getUser("admin");
      //.info(user);
      expect(user).toMatchObject(expectedUser);
    } catch (error) {
      console.error(error);
    }
  });

  test("revert Password of admin", async () => {
    //console.warn("test 2 --------------------");

    try {
      let newUserPasswordData = {
        username: "admin",
        newhashedpassword:
          "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
      };

      const expectedUser = {
        username: "admin",
        password:
          "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
      };

      await changePassword(newUserPasswordData);
      let user = await getUser("admin");
      //console.info(user);
      expect(user).toMatchObject(expectedUser);
    } catch (error) {
      console.error(error);
    }
  });
});
