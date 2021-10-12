-- CreateTable
CREATE TABLE "socialdata" (
    "id" SERIAL NOT NULL,
    "pagedataid" INTEGER,
    "iconClass" VARCHAR,
    "linkUrl" VARCHAR,
    "bgColor" VARCHAR,
    "borderRadius" VARCHAR,
    "accentColor" VARCHAR,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "socialdata" ADD FOREIGN KEY ("pagedataid") REFERENCES "pagedata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
