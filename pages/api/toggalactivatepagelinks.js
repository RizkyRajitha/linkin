import { jwtAuth, use } from "../../middleware/middleware";
import { toggalActivePageLinks } from "../../lib/dbfunc";

async function handler(req, res) {
  // Run the middleware

  try {
    await use(req, res, jwtAuth);
    console.log(req.body);
    await toggalActivePageLinks(req.body);
    // let updatedPageData = await getPageData();
    // console.log(updatedPageData);
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
