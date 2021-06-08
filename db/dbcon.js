// const { Pool } = require("pg");
import { Pool } from "pg";
import { DBURLLOCAL } from "../configs/config";

// const DBURLLOCAL = require("../configs/config").DBURLLOCAL;
const connectionString =
  process.env.NODE_ENV === "production" ? process.env.DBURL : DBURLLOCAL; //require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
  idleTimeoutMillis: 200,
  max: 1,
});

export const query = ({ text, params = [] }) => {
  return new Promise((resolve, reject) => {
    if (!text) {
      reject({ message: "invalid query" });
      return;
    }
    const start = Date.now();
    pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;

      if (process.env.NODE_ENV !== "production") {
        console.log("executed query", {
          text,
          duration,
          top2rows: res ? res.rows.slice(0, 2) || [] : [],
        });
      }

      if (err) {
        // console.log(err);
        reject(err);
        return;
      }
      // console.log(res.command);
      resolve(res);

      // callback(err, res);
    });
  });
};

// export let con = {
// query: ({ text, params = [] }) => {
//   return new Promise((resolve, reject) => {
//     if (!text) {
//       reject({ message: "invalid query" });
//       return;
//     }
//     const start = Date.now();
//     pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;

//       if (process.env.NODE_ENV !== "production") {
//         console.log("executed query", {
//           text,
//           duration,
//           top2rows: res ? res.rows.slice(0, 2) || [] : [],
//         });
//       }

//       if (err) {
//         // console.log(err);
//         reject(err);
//         return;
//       }
//       // console.log(res.command);
//       resolve(res);

//       // callback(err, res);
//     });
//   });
// },
// };
