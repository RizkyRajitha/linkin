const { getUser } = require("../lib/dbfunc");

describe("Get users from database ", async () => {
  it(" initnial admin is succesfull inserted", () => {
    let { user } = await getUser();
    const expectedUser = {
      username: "admin",
      password: "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
    };
    expect(user).toMatchObject(expectedUser);
    // expect(isEmptry("")).toBe(true);
  });
});
