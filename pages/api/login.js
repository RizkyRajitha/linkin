import { compare } from "bcrypt";
import { createUser } from "../../lib/dbfunc";

export default async function handler(req, res) {
  console.log(req.body);
  let data = await createUser();
  console.log(data);

  res.status(200).json({ name: "John Doe", data });
}
