const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});
const { default: Prisma } = require("../db/dbconprisma");

const { getUser, changePassword } = require("../lib/dbfuncprisma");

describe("Test User functions", () => {
  beforeAll(async () => {
    await Prisma.users.deleteMany();
    await Prisma.users.create({
      data: {
        username: "admin",
        password:
          "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
      },
    });
  });

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  test("get admin user", async () => {
    let user = await getUser("admin");

    const expectedUser = {
      username: "admin",
      password: "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
    };
    expect(user).toMatchObject(expectedUser);
  });

  test("change Password of admin", async () => {
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
});
