// import Cors from "cors";

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
  console.log(req.cookie);
  let token = req.cookie;
  if (!token) {
    // next(new Error("no token"));
    res.status(403).json({ success: false, message: "no auth token found" });
    // throw new Error("no token");
  } else {
    console.log("ok");
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
