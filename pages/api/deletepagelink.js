import { jwtAuth, use } from "../../middleware/middleware";
import { deleteLink, getLinkData } from "../../lib/dbfunc";

async function handler(req, res) {
  // Run the middleware

  try {
    await use(req, res, jwtAuth);
    console.log(req.body);
    await deleteLink(req.body);
    // let updatedLinkData = await getLinkData();
    // console.log(updatedPageData);
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, msg: error.message });
  }
}

export default handler;
