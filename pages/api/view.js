// import { jwtAuth, use } from "../../middleware/middleware";
import {
  // getPageData,
  // getLinkData,
  // getPageDatawLinkData,
  // updatePageData,
  // insertPageLinks,
  // updateLink,
  // deleteLink,
  // changePassword,
} from "../../lib/dbfuncprisma";
// import { updatePageData } from "../../lib/dbfuncprisma";

async function handler(req, res) {
  try {
    // const pageData = await changePassword({
    //   // id: 269,
    //   username: "admin",
    //   newhashedpassword: "11",
    //   // pagedataid: 1,
    // });
    // console.log(pageData);
    // res.json(pageData);
    res.send("ok");
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
