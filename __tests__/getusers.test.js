const { Client } = require("pg");

const connectionString =
  process.env.NODE_ENV === "production" ? process.env.DBURL : DBURLLOCAL; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const client = new Client({
  connectionString: connectionString,
});

const { getUser } = require("../lib/dbfunc");

console.log(process.env);
console.log(connectionString);

beforeAll(async () => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.

  await client.connect();
  console.log("connected to database");

  console.log(await getUser());

  //   let script = ``

  //   console.log(script);

  //   let query = {
  //     text: script,
  //     values: [],
  //   };
});

describe("Get users from database ", () => {
  it(" '' is true", () => {
    expect(isEmptry("")).toBe(true);
  });
});
