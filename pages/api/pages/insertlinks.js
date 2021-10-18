import { jwtAuth, use } from "../../../middleware/middleware";
import { getLinkData, insertPageLinks } from "../../../lib/dbfuncprisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);

    await insertPageLinks(req.body);

    let updatedLinkData = await getLinkData();

    // mock loading times for testing
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000)
    // );

    // console.log(updatedPageData);
    res.json({ success: true, updatedLinkData: updatedLinkData.linkData });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
