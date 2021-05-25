// import { JWT, JWE, JWK } from "jose";
// const JWT = require("jose").JWT;
const bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = "linkin123";

// Technique 1 (generate a salt and hash on separate function calls):
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
console.log(hash);

// let tl = JWT.sign({ adaa: "sasa" }, "saa");
// console.log(tl);
