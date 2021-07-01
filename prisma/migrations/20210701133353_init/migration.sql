-- CreateTable
CREATE TABLE "linkdata" (
    "id" SERIAL NOT NULL,
    "pagedataid" INTEGER,
    "iconClass" VARCHAR,
    "displayText" VARCHAR,
    "linkUrl" VARCHAR,
    "bgColor" VARCHAR,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagedata" (
    "id" INTEGER NOT NULL,
    "avatarUrl" VARCHAR,
    "avatarheight" VARCHAR,
    "avatarwidth" VARCHAR,
    "bgColor" VARCHAR,
    "accentColor" VARCHAR,
    "handlerText" VARCHAR,
    "handlerLink" VARCHAR,
    "footerText" VARCHAR,
    "bgImgUrl" VARCHAR,
    "handlerFontSize" VARCHAR,
    "handlerFontColor" VARCHAR,
    "active" BOOLEAN DEFAULT true,
    "fontFamily" VARCHAR,
    "fontUrl" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");

-- AddForeignKey
ALTER TABLE "linkdata" ADD FOREIGN KEY ("pagedataid") REFERENCES "pagedata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
