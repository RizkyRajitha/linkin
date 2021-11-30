const path = require("path");

// load dotenv if not in production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.join(__dirname, "../", ".env"),
  });
}

const PrismaClient = require("@prisma/client").PrismaClient;
const Prisma = new PrismaClient();

async function seed() {
  try {
    console.log("seeding initialized");

    let existingUser = await Prisma.users.findMany({
      where: { username: "admin" },
      select: { username: true },
    });
    console.log(existingUser);

    // abort if database is seeded on the first run
    if (existingUser.length) {
      console.log("database is seeded . aborting...");
      return;
    }

    await Prisma.users.create({
      data: {
        username: "admin",
        password:
          "$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG",
      },
    });

    await Prisma.pagedata.create({
      data: {
        id: 1,
        handlerText: "LinkIn",
        avatarUrl:
          "https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png",
        avatarBorderColor: "#ffffff",
        bgColor: "#7ea2ff",
        accentColor: "#bdd7ff",
        handlerFontSize: "20",
        handlerFontColor: "#ffffff",
        avatarwidth: "50",
        footerBgColor: "#7ea2ff",
        footerTextSize: "12",
        footerText: "Powered by Linkin",
        footerTextColor: "#ffffff",
        handlerDescription:
          "Linkin is a customizable self hosted link tree platform",
        handlerDescriptionFontColor: "#ffffff",
        linktreeWidth: "320",
        linkdata: {
          create: {
            bgColor: "#2C6BED",
            textColor: "#ffffff",
            displayText: "Welcome to Linkin",
            iconClass: "fas fa-link",
            linkUrl: "https://github.com/RizkyRajitha/linkin",
          },
        },
        socialdata: {
          create: {
            iconClass: "fab fa-github",
            linkUrl: "https://github.com/RizkyRajitha/linkin",
            bgColor: "#2C6BED",
            borderRadius: "5",
          },
        },
      },
    });

    await Prisma.$disconnect();
    console.log("disconnected from database");
    console.log("seeding ran successfully");

    return;
  } catch (e) {
    console.log(e);
    console.error("error occured \ncould not run seeding successfully");
    console.log(e.message);
    process.exit(1);
  }
}

seed()
  .then(() => process.exit())
  .catch((err) => console.error(err));
