const bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = "linkin123";

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
console.log(hash);

