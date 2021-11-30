import { parse } from "cookie";
import { parseSecureToken } from "../lib/crypto";

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ["GET", "HEAD", "POST"],
// });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function use(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function jwtAuth(req, res, next) {
  let cookie = req.headers?.cookie;

  if (!cookie) {
    res.status(403).json({ success: false, message: "no auth token found" });
    return;
  } else {
    let token = parse(cookie)["linkin.auth"];
    let decodedToken = parseSecureToken(token);

    if (!decodedToken) {
      res.status(500).json({ success: false, message: "auth token error" });
      return;
    }

    req.username = decodedToken.username;

    next();
  }
}

export function cookieValidate(req, res) {
  let cookie = req.headers?.cookie;

  // console.log("dashboard cookie");

  if (!cookie) {
    res.writeHead(302, {
      location: "/admin",
      "Content-Type": "text/html",
    });
    // res.setHeader("location", "/admin");
    // res.statusCode = 302;
    res.end();
    return new Error("cookie invalid");
  }

  let token = parse(cookie)["linkin.auth"];

  let decodedToken = parseSecureToken(token);

  if (!decodedToken) {
    res.writeHead(302, {
      location: "/admin",
      "Content-Type": "text/html",
    });
    // res.setHeader("location", "/admin");
    res.statusCode = 302;
    res.end();
    return new Error("cookie invalid");
  }

  return true;
}

export function cookieValidateLogin(req, res) {
  let cookie = req.headers?.cookie;

  let token = parse(cookie)["linkin.auth"];

  let decodedToken = parseSecureToken(token);

  if (decodedToken) {
    res.writeHead(302, {
      location: "/dashboard",
      "Content-Type": "text/html",
    });
    // res.setHeader("location", "/dashboard");
    // res.statusCode = 302;
    res.end();
  }
}
