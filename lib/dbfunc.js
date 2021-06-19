import { query } from "../db/dbcon";

/**
 * get User by username
 * @param {*} username
 * @returns User
 */
export async function getUser(username = null) {
  if (username === null) {
    throw new Error("pass valid username");
  }
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

export async function getPageData() {
  try {
    let pageDataQueryObject = {
      text: `SELECT * FROM pagedata`,
      params: [],
    };

    let pageDataResponse = await query(pageDataQueryObject);

    let { created_at, ...pageData } = pageDataResponse.rows[0];

    console.log(pageDataResponse.rows);

    return { pageData };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getLinkData(includeInactive = true) {
  try {
    let pageDataQueryObject = {
      text: `SELECT * FROM pagedata`,
      params: [],
    };

    let pageDataResponse = await query(pageDataQueryObject);

    let pageData = pageDataResponse.rows[0];

    let linkDataQueryObject = {
      text: `SELECT * FROM linkdata WHERE pagedataid = ${pageData.id} ${
        includeInactive ? "" : " AND active = TRUE"
      } ORDER BY id ASC;`,
      params: [],
    };

    let linkDataResponse = await query(linkDataQueryObject);

    let linkData = [];

    linkDataResponse.rows.forEach((element, index) => {
      let { created_at, ...linkDataRows } = element;
      linkData.push(linkDataRows);
    });

    // let { created_at, ...pageData } = pageDataResponse.rows[0];

    // console.log(pageDataResponse.rows);

    // console.log(linkDataResponse.rows);
    console.log(linkData);
    return { linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPageDatawLinkData(includeInactive = true) {
  try {
    let pageDataQueryObject = {
      text: `SELECT * FROM pagedata`,
      params: [],
    };

    let pageDataResponse = await query(pageDataQueryObject);

    let { created_at, ...pageData } = pageDataResponse.rows[0];

    let linkDataQueryObject = {
      text: `SELECT * FROM linkdata WHERE pagedataid = ${pageData.id} ${
        includeInactive ? "" : " AND active = TRUE"
      } ORDER BY id ASC;`,
      params: [],
    };

    let linkDataResponse = await query(linkDataQueryObject);

    let linkData = [];

    linkDataResponse.rows.forEach((element, index) => {
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

export async function updatePageData(data) {
  try {
    console.log("update");
    console.log(data);

    let keys = Object.keys(data);

    let queryText = `UPDATE pagedata  SET `;
    let params = [];
    keys.forEach((item, index) => {
      params.push(data[item]);
      queryText += ` "${item}" = $${index + 1} ${
        index === keys.length - 1 ? "" : ","
      }`;
    });

    queryText += ` WHERE id=1`;
    console.log(queryText);
    console.log(params);

    let queryObject = { text: queryText, params };

    let response = await query(queryObject);

    //await new Promise((r) => setTimeout(r, 2000));
    //  throw new Error(error.message);
    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    // console.log(error)
    throw new Error(error.message);
  }
}

export async function insertPageLinks(data) {
  try {
    // if (!typeof yourVariable === "object" && yourVariable !== null) {
    //   throw new Error("invalid data");
    // }

    console.log("insert");
    console.log(data);

    let keys = Object.keys(data);

    let queryText = `INSERT INTO linkdata (`;
    let params = [];

    keys.forEach((item, index) => {
      params.push(data[item]);
      queryText += ` "${item}" ${index === keys.length - 1 ? "" : ","}`;
    });

    queryText += `) values (`;

    keys.forEach((item, index) => {
      queryText += ` $${index + 1} ${index === keys.length - 1 ? "" : ","}`;
    });
    queryText += `)`;

    // console.log(queryText);
    // console.log(params);

    let queryObject = { text: queryText, params };

    let response = await query(queryObject);

    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    // console.log(error)
    throw new Error(error.message);
  }
}

export async function updateLink(data) {
  try {
    console.log("update");
    console.log(data);

    const { id, ...dataWOid } = data;

    let keys = Object.keys(dataWOid);

    let queryText = `UPDATE linkdata  SET `;
    let params = [];
    keys.forEach((item, index) => {
      params.push(dataWOid[item]);
      queryText += ` "${item}" = $${index + 1} ${
        index === keys.length - 1 ? "" : ","
      }`;
    });

    queryText += ` WHERE id = ${id}`;
    console.log(queryText);
    console.log(params);

    let queryObject = { text: queryText, params };
    let response = await query(queryObject);
    // console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteLink({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let existingLinks = await getLinkData(true);
    let linkToBeDeleted = existingLinks.linkData.find((ele) => {
      return ele.id === id;
    });

    // console.log("------filter=----------");
    // console.log(id);
    // console.log(linkToBeDeleted);

    if (linkToBeDeleted === undefined) {
      throw new Error("pass valid id");
    }

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
    throw new Error(error.message);
  }
}

export async function changePassword({ username, newhashedpassword }) {
  if (username === null || username === undefined) {
    throw new Error("pass valid username");
  }
  if (newhashedpassword === null || newhashedpassword === undefined) {
    throw new Error("pass valid newhashedpassword");
  }
  try {
    // let user = await getUser(username);

    // if (!user) {
    //   throw new Error("invalid username");
    // }

    let queryText = `UPDATE users SET password = $1 where username = $2`;
    let params = [newhashedpassword, username];

    let queryObject = {
      text: queryText,
      params: params,
    };

    let response = await query(queryObject);
    console.log(response.rows);
    return response.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
