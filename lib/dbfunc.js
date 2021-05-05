// import con from "../db/con";
const { query } = require("../db/con");

// con
// query(
// `CREATE TABLE IF NOT EXISTS  "users" (
//     "id" serial primary key,
//     "username" varchar(255) unique not null,
//     "password" varchar(60) not null,
//     "created_at" timestamp with time zone default current_timestamp
//   );
//   `;
// )
//   .then((resolve) => {
//     console.log(resolve);
//   })
//   .catch((reject) => {
//     console.log(reject);
//   });

async function getUser(username) {
  try {
    // let queryObject =

    let response = await query(`SELECT * FROM users where username= $1 `, [
      username,
    ]);
    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { getUser };

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
