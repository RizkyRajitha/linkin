// import con from "../db/con";
const { query } = require("../db/con");

// con
query(
  `CREATE TABLE IF NOT EXISTS  "users" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar,
    "email" varchar,
    "password" varchar,
    "active" boolean,
    "source" varchar,
    "avatarUrl" varchar,
    "userType" varchar
  );
  `
)
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((reject) => {
    console.log(reject);
  });

async function createUser() {
  try {
    let response = await query(
      `INSERT INTO users (name, email) VALUES ($1,$2)`,
      ["haha", "huihi " + String(Math.random() * 1000)]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser };

// const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// const pool = new Pool({
//   connectionString,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   connectionString,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
