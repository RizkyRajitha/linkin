// import { jwtAuth, use } from "../../middleware/middleware";
import { getPageData } from "../../lib/dbfunc";

async function handler(req, res) {
  try {
    const pageData = await getPageData();
    console.log(pageData);
    res.json(pageData);
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
