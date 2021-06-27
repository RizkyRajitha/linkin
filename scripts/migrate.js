const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.join(__dirname, "../", ".env.local"),
  });

  // console.log(dotenv.error);
}

// const DBURLLOCAL = require("../configs/config").DBURLLOCAL;

const connectionString = process.env.DBURL;

// const connectionString =
//   process.env.NODE_ENV === "production" ? process.env.DBURL : DBURLLOCAL; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

console.log(connectionString);

if (!connectionString) {
  console.warn(
    "connectionString is not defined\nPlease define connectionString in Environment variables \nAborting migration"
  );
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
});

async function migrate() {
  try {
    console.log("migration initialized");

    await client.connect();
    console.log("connected to database");

    let script = fs.readFileSync(__dirname + "/db-migrate.sql").toString();

    // console.log(script);

    let query = {
      text: script,
      values: [],
    };

    let res = await client.query(query);
    // console.log(res.command);
    // console.log(res.rowCount);
    await client.end();
    console.log("disconnected from database");
    console.log("migration ran successfully");
  } catch (e) {
    console.log(e);
    console.error("error occured \ncould not run migration successfully");
    console.log(e.message);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit())
  .catch((err) => console.error(err));
