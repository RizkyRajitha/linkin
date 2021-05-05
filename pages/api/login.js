const bcrypt = require("bcrypt");

const { getUser } = require("../../lib/dbfunc");
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  console.log(req.body);

  let { username, password } = req.body;

  let data = await getUser(username);

  console.log(data);

  if (!data) {
    res.status(401).json({ success: false, message: "invalid_credential" });
    return;
  }

  let pass = bcrypt.compareSync(password, data.password);

  if (!pass) {
    res.status(401).json({ success: false, message: "invalid_credential" });
    return;
  }

  console.log(data);
  console.log(pass);

  res.status(200).json({ success: pass });
}
