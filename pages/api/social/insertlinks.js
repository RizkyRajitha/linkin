import { jwtAuth, use } from "../../../middleware/middleware";
import { getSocialData, insertSocialLinks } from "../../../lib/dbfuncprisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);

    await insertSocialLinks(req.body);

    let updatedSocialData = await getSocialData();

    // mock loading times for testing
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000)
    // );

    // console.log(updatedPageData);
    res.json({
      success: true,
      updatedSocialData: updatedSocialData.socialData,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
