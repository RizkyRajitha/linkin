<p align="center">
  <img width="400" height="400" alt="Linkin logo" src="https://user-images.githubusercontent.com/38534289/119221855-0522c380-bb0f-11eb-8fee-c335fd0ff67c.png">
</p>

# Linkin &middot; [![DeepScan grade](https://deepscan.io/api/teams/14086/projects/17178/branches/386441/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14086&pid=17178&bid=386441) [![codecov](https://codecov.io/gh/RizkyRajitha/linkin/branch/master/graph/badge.svg?token=DPE3YVUYUW)](https://codecov.io/gh/RizkyRajitha/linkin) ![license](https://img.shields.io/github/license/rizkyrajitha/linkin??style=plastic) ![Github Actions](https://github.com/rizkyrajitha/linkin/workflows/Code-Coverage/badge.svg)

## Linkin is a customizable self-hosted link tree application.

### Free and Open Source 💯

### Self Hosted, you own your data 💽

### Customize your link tree with few clicks using a feature-rich dashboard 🤖

### SEO friendly design built using Next js 🕸️

### Supports one-click deploy using multiple cloud providers 🚀

<br>

[View Demo](http://linkindemo.vercel.app/)
<br>
[Demo Admin](http://linkindemo.vercel.app/admin)
`http://linkindemo.vercel.app/admin`
<br>

- Demo username = `admin`
- Demo password = `linkin123`

<br>

<img src="https://res.cloudinary.com/dijjqfsto/image/upload/v1632930278/linkin/linkin_yrgr3k.gif" alt="linkin gif" width="100%"  />

<!-- ![linkin gif](https://res.cloudinary.com/dijjqfsto/image/upload/v1632930278/linkin/linkin_yrgr3k.gif) -->

<br>

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRizkyRajitha%2Flinkin&env=DATABASE_URL,HASHSALT,NODE_ENV&demo-title=Linkin&demo-description=Linkin%20is%20a%20customizable%20self%20hosted%20link%20tree%application%20%2C%20And%20we%20are%20ready%20to%20roll)

## Deploy with Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RizkyRajitha/linkin)

## Deploy with Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FRizkyRajitha%2Flinkin&plugins=postgresql&envs=HASHSALT%2CPORT%2CRAILWAY&HASHSALTDesc=Random+secret+HASHSALT+for+JWT+and+password+encryption&PORTDesc=Exposed+Port+in+Dockerfile&RAILWAYDesc=migrate+and+seed+the+database+in+railway+.+done+in+docker+image+build+time&PORTDefault=3000&RAILWAYDefault=1)

![Screenshot_2021-05-22 LinkIn's Link tree Page](https://user-images.githubusercontent.com/38534289/119221911-4ca94f80-bb0f-11eb-94ff-31f1c3a51d06.png)

![Screenshot_2021-05-22 Linkin Dashboard](https://user-images.githubusercontent.com/38534289/119221942-7d898480-bb0f-11eb-9175-5e139fa57f0a.png)

![Screenshot_2021-05-22 Linkin Dashboard](https://user-images.githubusercontent.com/38534289/119221939-7c585780-bb0f-11eb-944f-514beb5573b7.png)

## Getting started

- Deploy in Vercel
  - set environment variables
    - `DATABASE_URL` - **Postgres** database url
    - `HASHSALT` - random secret key
    - `NODE_ENV` - set NODE_ENV to `production`
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.

<br>
<br>

- Deploy in Heroku
  - set environment variables
    - `DATABASE_URL` - **Postgres** database url
    - `HASHSALT` - random secret key
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.
    <br>

<br>
<br>

- Deploy in Railway
  - set environment variables
    - `HASHSALT` - random secret key
    - `PORT` - 3000
    - `RAILWAY` - Set to `1` to run migrations and seeding in docker build stage . set `0` to avoid migrations and seeding in docker build stage
    - `DATABASE_URL` - **Postgres** database url . use this variable **if you are not using** railway postgres plugin
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.
    <br>

## Running with docker

- build the docker image using `docker build . -t linkin` command
- Run the docker image `docker run -d -p 3000:3000 -e DATABASE_URL='postgres://linkin:123@localhost:5432/linkin' -e HASHSALT='123' linkin`. make sure you specified `DATABASE_URL` and `HASHSALT` environment varaibles.

### Database connection

- if the postgres database is behind pgbounce use `pgbouncer=true` parameter in `DATABASE_URL` ex - `postgres://xx:xxx@xxxx:5432/xxxx?pgbouncer=true`

## Developing locally

#### Requirements

- Node.js 14.x or newer
- Postgresql

#### Clone and install dependencies

```bash
git clone https://github.com/RizkyRajitha/linkin.git
cd linkin
npm i
```

<!-- Setup local environmrnt variables in [config.js](configs/config.js) -->

Setup local environmrnt variables in `.env`

example `.env` file

```
DATABASE_URL=postgres://linkin:123@localhost:5432/linkin
HASHSALT=123
```

#### Database migration

create database relations with prisma migration

**you must have Postgres database setup locally**

```bash
npx prisma migrate dev
```

#### Database Seeding

Addign Initial data to the database to get you started

```bash
npm run seed
```

#### Run

```
npm run dev
```

### Build with

- [Next.Js](https://nextjs.org/) .
- [Postgres](https://www.postgresql.org/) .
- [Prisma](https://www.prisma.io/) .

### Currently supported hosting in

- [Vercel](https://vercel.com/) .
- [Heroku](https://heroku.com/) .
- [railway](https://railway.app/) .

### Community

Join our discord community for questions and updates

https://discord.gg/Jsmc5Dm9wg

<!--
https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap
https://res.cloudinary.com/dijjqfsto/image/upload/v1621257334/af1fcce7-deb9-4834-965e-4fed59ef6c08_z2l3yf.jpg
'Source Code Pro', monospace
 -->
