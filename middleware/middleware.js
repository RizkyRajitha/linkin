// import Cors from "cors";

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
  // console.log(req);
  console.log(req.headers);

  // console.log(req.cookie);
  let cookie = req.headers?.cookie;
  console.log(cookie);

  if (!cookie) {
    // next(new Error("no token"));
    res.status(403).json({ success: false, message: "no auth token found" });
    return;
    // throw new Error("no token");
  } else {
    let token = parse(cookie)["linkin.auth"];
    let decodedToken = parseSecureToken(token);

    if (!decodedToken) {
      res.status(500).json({ success: false, message: "auth token error" });
      return;
    }

    req.username = decodedToken.username;

    console.log(decodedToken.username);
    // console.log(tk);

    console.log("middleware ok");

    next();
  }
}

// export const jwtMiddleare = use(jwtAuth);

// export const useAuth = use(async (req, res, next) => {
//   let token;

//   try {
//     token = await verifyAuthToken(req);
//   } catch (e) {
//     return serverError(res, e.message);
//   }

//   if (!token) {
//     return unauthorized(res);
//   }

//   req.auth = token;
//   next();
// });
