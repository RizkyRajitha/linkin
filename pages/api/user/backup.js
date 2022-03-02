import { jwtAuth, use } from "../../../middleware/middleware";
import {
  getPageDatawLinkAndSocialData,
  restoreBackupData,
} from "../../../lib/dbfuncprisma";

// endpoint for download and restore backups
async function handler(req, res) {
  // Run the middleware
  await use(req, res, jwtAuth).catch((error) => {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  });

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
    let { linkin_version, ...data } = req.body;

    await restoreBackupData(data);

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

export default handler;
