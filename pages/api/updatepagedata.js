import { jwtAuth, use } from "../../middleware/middleware";
import { updatePageData, getPageData } from "../../lib/dbfuncprisma";


async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);

    await updatePageData(req.body);
    let updatedPageData = await getPageData();

    // console.log(updatedPageData);
    res.json({ success: true, updatedPageData: updatedPageData.pageData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });

    // res.status(500).send(error.message);
  }
}

export default handler;
