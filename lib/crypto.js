import { JWT, JWE, JWK } from "jose";
// const JWT = require("jose").default
// const jose = require("jose");
// import {  } from "jose";
// const a = require('jose')

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

export async function parseSecureToken(token) {
  try {
    const result = await JWE.decrypt(token, KEY);

    return parseToken(result.toString());
  } catch {
    return null;
  }
}
