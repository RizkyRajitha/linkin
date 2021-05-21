CREATE TABLE IF NOT EXISTS  "users" (
    "id" serial primary key,
    "username" varchar(255) unique not null,
    "password" varchar(60) not null,
    "created_at" timestamp with time zone default current_timestamp
);

insert into users (username, password) values ('admin', '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa') ON CONFLICT (username) DO NOTHING;


CREATE TABLE IF NOT EXISTS  "pagedata" (
    "id" int primary key,
    "avatarUrl" varchar,
    "avatarheight" varchar,
    "avatarwidth" varchar,
    "bgColor" varchar,
    "accentColor" varchar,
    "handlerText" varchar,
    "handlerLink" varchar,
    "footerText" varchar,
    "bgImgUrl" varchar,
    "handlerFontSize" varchar,
    "handlerFontColor" varchar,    
    "active" boolean DEFAULT TRUE,
    "fontFamily" varchar,
    "fontUrl" varchar,
    "created_at" timestamp with time zone default current_timestamp
);

insert into pagedata ("id", "handlerText" , "avatarUrl" ) values (1 , 'linkin' , 'https://pbs.twimg.com/profile_images/1372981799366713351/bzCQoygt_400x400.jpg') ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS  "linkdata" (
    "id" serial primary key,
    "pagedataid" int REFERENCES pagedata (id) ON UPDATE CASCADE ,
    "iconClass" varchar,
    "displayText" varchar,
    "linkUrl" varchar,
    "bgColor" varchar,
    "active" boolean DEFAULT TRUE,
    "created_at" timestamp with time zone default current_timestamp
);

-- ALTER TABLE "pagedata" ADD COLUMN IF NOT EXISTS "fontFamily" varchar , ADD COLUMN IF NOT EXISTS "fontUrl" varchar;

-- ALTER TABLE "linkdata" ADD COLUMN IF NOT EXISTS "active" boolean DEFAULT TRUE;
-- ALTER TABLE users  ADD COLUMN "priv_user" BOOLEAN NOT NULL DEFAULT FALSE;