import { jwtAuth, use } from "../../../middleware/middleware";
import { getSocialData, updateSocialLink } from "../../../lib/dbfuncprisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    await updateSocialLink(req.body);

    let updatedSocialData = await getSocialData();

    // mock loading times for testing
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000)
    // );
    res.json({
      success: true,
      updatedSocialData: updatedSocialData.socialData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });

    // res.status(500).send(error.message);
  }
}

export default handler;
