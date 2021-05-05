CREATE TABLE IF NOT EXISTS  "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "active" boolean,
  "source" varchar,
  "avatarUrl" varchar,
  "userType" varchar
);
