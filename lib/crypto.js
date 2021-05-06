import { JWT, JWE } from "jose";

const KEY =
  process.env.NODE_ENV === "production"
    ? process.env.KEY
    : require("../configs/config").KEY;

export function createSecureToken(payload) {
  let jwttoken = JWT.sign(payload, KEY);
  let encryttedToken = JWE.encrypt(jwttoken, KEY);
  console.log(encryttedToken);
  return encryttedToken;
}

export function parseSecureToken(token) {
  try {
    const decryptedToken = JWE.decrypt(token, KEY);
    const decodedToken = JWT.verify(decryptedToken.toString(), KEY);
    return decodedToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}
