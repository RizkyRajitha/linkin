import { jwtAuth, use } from "../../middleware/middleware";
import { getLinkData, updateLink } from "../../lib/dbfunc";

const changePasswordEnabled =
  process.env.changePasswordEnabled === "false" ? false : true;

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }
  if (!changePasswordEnabled) {
    res
      .status(401)
      .json({ success: false, message: "Cannot change data in Demo mode" });
    return;
  }
  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    await updateLink(req.body);

    let updatedLinkData = await getLinkData();

    // mock loading times for testing
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000)
    // );
    res.json({ success: true, updatedLinkData: updatedLinkData.linkData });
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
