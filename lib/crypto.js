import { JWT, JWE } from "jose";
// import { SECRETKEY } from "../configs/config";

const HASHSALT = process.env.HASHSALT;

// const HASHSALT = process.env.NODE_ENV === "production" ? process.env.HASHSALT : SECRETKEY;

export function createSecureToken(payload) {
  let jwttoken = JWT.sign(payload, HASHSALT);
  let encryttedToken = JWE.encrypt(jwttoken, HASHSALT);
  // console.log(encryttedToken);
  return encryttedToken;
}

export function parseSecureToken(token) {
  try {
    const decryptedToken = JWE.decrypt(token, HASHSALT);
    const decodedToken = JWT.verify(decryptedToken.toString(), HASHSALT);
    return decodedToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}
