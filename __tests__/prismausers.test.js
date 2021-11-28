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

    // expect to fail if no name provided
    await expect(getUser()).rejects.toThrow("pass valid username");
  });

  test("change Password of admin", async () => {
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
    expect(user).toMatchObject(expectedUser);

    // check throwing errors
    // if no username provided
    await expect(changePassword({ username: null })).rejects.toThrow(
      "pass valid username"
    );
    // if no hashed password
    await expect(changePassword({ username: "user" })).rejects.toThrow(
      "pass valid newhashedpassword"
    );
  });
});
