const { getUser } = require("../lib/dbfunc");

test("get admin user", async () => {
  let user = await getUser("admin");
  const expectedUser = {
    username: "admin",
    password: "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
  };
  expect(user).toMatchObject(expectedUser);
});
