// import con from "../db/con";
const { query } = require("../db/con");

async function getUser(username) {
  try {
    let queryObject = {
      text: `SELECT * FROM users where username= $1 `,
      params: [username],
    };

    let response = await query(queryObject);
    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.log(error.message);
  }
}

async function getPageData() {
  try {
    let pageDataQueryObject = {
      text: `SELECT * FROM pagedata`,
      params: [],
    };

    //     SELECT product_name, price, category_name
    // FROM product, category
    // WHERE product.category_id = category.id ;

    //     SELECT product_name, price, category_name
    // FROM product, category
    // WHERE product.category_id = category.id ;

    let pageDataResponse = await query(pageDataQueryObject);

    let { created_at, ...pageData } = pageDataResponse.rows[0];

    let linkDataQueryObject = {
      text: `SELECT * FROM linkdata WHERE pagedataid = ${pageData.id} `,
      params: [],
    };

    let linkDataResponse = await query(linkDataQueryObject);

    let linkData = [];
    linkDataResponse.rows.map((element, index) => {
      let { created_at, ...linkDataRows } = element;
      linkData.push(linkDataRows);
    });

    // let { created_at, ...pageData } = pageDataResponse.rows[0];

    console.log(pageDataResponse.rows);

    console.log(linkDataResponse.rows);
    // console.log(pageData);
    return { pageData, linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updatePageData(data) {
  try {
    // SET column1 = value1,
    //     column2 = value2,
    //     ...
    // WHERE condition;
    console.log("update");
    console.log(data);

    let keys = Object.keys(data);

    let queryText = `UPDATE pagedata  SET `;
    let params = [];
    keys.map((item, index) => {
      params.push(data[item]);
      queryText += ` "${item}" = $${index + 1} ${
        index === keys.length - 1 ? "" : ","
      }`;
    });

    queryText += ` WHERE id=1`;
    console.log(queryText);
    console.log(params);

    let queryObject = { text: queryText, params };

    // let queryObject = {
    //   text: `UPDATE pagedata  SET "avatarUrl" = $1 , "avatarheight" = $2  , "avatarwidth" = $3 , "bgColor" = $4, "accentColor"=$5, "handlerText"=$6, "footerText"=$7, "bgImgUrl"=$8
    //   WHERE id=1 `,
    //   params: [
    //     avatarUrl,
    //     avatarheight,
    //     avatarwidth,
    //     bgColor,
    //     accentColor,
    //     handlerText,
    //     footerText,
    //     bgImgUrl,
    //   ],
    // };

    let response = await query(queryObject);

    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    // console.log(error)
    throw new Error(error.message);
  }
}

async function insertPageLinks(data) {
  try {
    // SET column1 = value1,
    //     column2 = value2,
    //     ...
    // WHERE condition;

    // "iconClass" varchar,
    // "displayText" varchar,
    // "linkUrl" varchar,
    // "bgColor" varchar,
    // "created_at"

    if (!Array.isArray(data)) {
      throw new Error("invalid data");
    }

    console.log("update");
    console.log(data);

    let keys = Object.keys(data[0]);

    // Insert into pagedata ("id", "handlerText" , "avatarUrl" ) values

    let queryText = `INSERT INTO linkdata (`;
    let params = [];
    keys.map((item, index) => {
      queryText += ` "${item}" ${index === keys.length - 1 ? "" : ","}`;
    });

    queryText += `) values `;

    data.map((item, dataIndex) => {
      queryText += `( `;

      keys.map((key, keyIndex) => {
        params.push(item[key]);
        queryText += ` $${params.length} ${
          keyIndex === keys.length - 1 ? "" : ","
        }`;
      });
      queryText += `) ${dataIndex === data.length - 1 ? "" : ","}`;
    });

    console.log(queryText);
    console.log(params);

    let queryObject = { text: queryText, params };

    let response = await query(queryObject);

    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    // console.log(error)
    throw new Error(error.message);
  }
}

async function deleteLink({ id }) {
  try {
    let queryText = `DELETE FROM linkdata where id = $1 `;
    let params = [id];

    let queryObject = {
      text: queryText,
      params: params,
    };

    let response = await query(queryObject);
    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getUser,
  getPageData,
  updatePageData,
  insertPageLinks,
  deleteLink,
};

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
