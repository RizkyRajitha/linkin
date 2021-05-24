import { JWT, JWE } from "jose";
import { SECRETKEY } from "../configs/config";

const KEY = process.env.NODE_ENV === "production" ? process.env.KEY : SECRETKEY;

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
