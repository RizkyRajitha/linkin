const { Pool } = require("pg");
const DBURLLOCAL = require("../configs/config").DBURLLOCAL;
const connectionString =
  process.env.NODE_ENV === "production" ? process.env.DBURL : DBURLLOCAL; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
  idleTimeoutMillis: 500,
  max: 3,
});

let con = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;

        console.log("executed query", {
          text,
          duration,
          top2rows: res ? res.rows.slice(0, 2) || [] : [],
        });

        if (err) {
          reject(err);
          return;
        }
        console.log(res);
        resolve(res);

        // callback(err, res);
      });
    });
  },
};

module.exports = con;
