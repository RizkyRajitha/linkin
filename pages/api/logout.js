import { serialize } from "cookie";

export default async (req, res) => {
  const cookie = serialize("linkin.auth", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", [cookie]);
  res.status(200).json({ success: true, message: "logout" });
};
