import { jwtAuth, use } from "../../middleware/middleware";

async function handler(req, res) {
  // Run the middleware
  await use(req, res, jwtAuth);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}

export default handler;
