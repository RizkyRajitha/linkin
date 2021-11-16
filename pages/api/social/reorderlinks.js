import { jwtAuth, use } from "../../../middleware/middleware";
import { reorderSocialLinks } from "../../../lib/dbfuncprisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    // console.log(req.body);

    await reorderSocialLinks(req.body.orderData);

    // console.log(updatedPageData);
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
