import { jwtAuth, use } from "../../middleware/middleware";
import { deleteLink, getLinkData } from "../../lib/dbfunc";

async function handler(req, res) {
  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);
    await deleteLink(req.body);
    // let updatedLinkData = await getLinkData();
    // console.log(updatedPageData);
    // throw new Error("wedethee");
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, msg: error.message });
  }
}

export default handler;
