let stringtets =
  "is this working 📱📱📱📱📱📱📱 \n\n \t adadad ![screenshot](http://res.cloudinary.com/***/image/upload/v1637910362/linkin/linkin-ci-ss/index-Index%20iphone%2012%7C13%20390X844-1637910355817.png-1637910361986.png) ";

let buffstr = new Buffer.from(stringtets).toString("base64");

console.log(buffstr);

let bufftostr = new Buffer.from(buffstr, "base64").toString("utf8");

console.log(bufftostr);
