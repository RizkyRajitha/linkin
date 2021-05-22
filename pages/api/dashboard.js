import { jwtAuth, use } from "../../middleware/middleware";
import { getPageData } from "../../lib/dbfunc";

async function handler(req, res) {
  // Run the middleware

  try {
    await use(req, res, jwtAuth);

    const username = req.username;
    console.log(username);
    const pageData = await getPageData();

   // console.log(pageData);
    res.json({ message: "Hello ! " + username, pageData });
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
