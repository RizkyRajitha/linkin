import { jwtAuth, use } from "../../../middleware/middleware";
import {
  getPageDatawLinkAndSocialData,
  restoreBackupData,
} from "../../../lib/dbfuncprisma";

// endoint for download and restore backups
async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    case "POST":
      return await post(req, res);
    default:
      res.status(400).send("method not allowed");
      return;
  }
}

async function get(req, res) {
  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    let data = await getPageDatawLinkAndSocialData();

    res.json({
      ...data,
      linkin_version: process.env.NEXT_PUBLIC_VERSION || "",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

async function post(req, res) {
  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    let { linkin_version, ...data } = req.body;

    await restoreBackupData(data);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export default handler;
