CREATE TABLE IF NOT EXISTS  "users" (
    "id" serial primary key,
    "username" varchar(255) unique not null,
    "password" varchar(60) not null,
    "created_at" timestamp with time zone default current_timestamp
);

insert into users (username, password) values ('admin', '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa') ON CONFLICT (did) DO NOTHING;