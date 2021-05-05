const { Pool } = require("pg");
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DBURL
    : "postgresql://linkin:123@localhost:5432/linkin?schema=public"; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
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
        resolve(res);

        // callback(err, res);
      });
    });
  },
};

module.exports = con;
