import bcrypt from "bcrypt";

import { jwtAuth, use } from "../../../middleware/middleware";
import { changePassword, getUser } from "../../../lib/dbfuncprisma";

const saltRounds = 10;

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);
    let username = req.username;

    if (!req.body.currentPassword && !req.body.newPassword) {
      throw new Error("invalid parameters");
    }

    let user = await getUser(username);
    // console.log(user);
    let isCurrentPassTrue = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    // console.log(isCurrentPassTrue);

    if (!isCurrentPassTrue) {
      throw new Error("invalid password");
    }

    let salt = await bcrypt.genSalt(saltRounds);
    let newhashedpassword = await bcrypt.hash(req.body.newPassword, salt);

    await changePassword({ username, newhashedpassword });

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
