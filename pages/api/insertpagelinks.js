import { jwtAuth, use } from "../../middleware/middleware";
import { getLinkData, insertPageLinks } from "../../lib/dbfunc";

async function handler(req, res) {

  try {
  // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);

    await insertPageLinks(req.body);
    
    let updatedLinkData = await getLinkData();
    // console.log(updatedPageData);
    res.json({ success: true, updatedLinkData: updatedLinkData.linkData });
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
