CREATE TABLE IF NOT EXISTS  "users" (
    "id" serial primary key,
    "username" varchar(255) unique not null,
    "password" varchar(60) not null,
    "created_at" timestamp with time zone default current_timestamp
);

insert into users (username, password) values ('admin', '$2b$10$gKoU.xdV9vrGY2wEW0KAnuBmQeYxOUgXRHS9f8Sgx40m7kxpejddG') ON CONFLICT (username) DO NOTHING;


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

insert into pagedata ("id", "handlerText" , "avatarUrl" , "bgColor" , "accentColor" , "handlerFontSize" , "handlerFontColor" , "avatarwidth") values (1 , 'LinkIn' , 'https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png' , '#7ea2ff',	'#bdd7ff' , '20' , '#ffffff' , '50' ) ON CONFLICT (id) DO NOTHING;

-- 1	https://res.cloudinary.com/dijjqfsto/image/upload/v1621666671/linkin_logo_1_jcuvr3.png				LinkIn					#ffffff	true	font-family: 'Poppins', sans-serif;	https://fonts.googleapis.com/css2?family=Poppins&display=swap	2021-05-21 19:11:06

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

insert into linkdata ("id", "pagedataid" , "iconClass" , "displayText" , "linkUrl" , "bgColor" ) values (1 , 1 , 'fab fa-github' , 'GitHub', 'https://github.com/RizkyRajitha/linkin' , '#2c6bed' ) ON CONFLICT (id) DO NOTHING;


-- ALTER TABLE "pagedata" ADD COLUMN IF NOT EXISTS "fontFamily" varchar , ADD COLUMN IF NOT EXISTS "fontUrl" varchar;

-- ALTER TABLE "linkdata" ADD COLUMN IF NOT EXISTS "active" boolean DEFAULT TRUE;
-- ALTER TABLE users  ADD COLUMN "priv_user" BOOLEAN NOT NULL DEFAULT FALSE;