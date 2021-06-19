<p align="center">
  <img width="400" height="400" alt="Linkin logo" src="https://user-images.githubusercontent.com/38534289/119221855-0522c380-bb0f-11eb-8fee-c335fd0ff67c.png">
</p>

# Linkin &middot; [![DeepScan grade](https://deepscan.io/api/teams/14086/projects/17178/branches/386441/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=14086&pid=17178&bid=386441) [![codecov](https://codecov.io/gh/RizkyRajitha/linkin/branch/master/graph/badge.svg?token=DPE3YVUYUW)](https://codecov.io/gh/RizkyRajitha/linkin) ![license](https://img.shields.io/github/license/rizkyrajitha/linkin??style=plastic) ![Github Actions](https://github.com/rizkyrajitha/linkin/workflows/Code-Coverage/badge.svg)

## Linkin is a customizable self-hosted link tree platform.

<br>

[Visit Demo](http://linkindemo.vercel.app/)

- Demo username = `admin`
- Demo password = `linkin123`

<br>
<br>

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRizkyRajitha%2Flinkin&env=DBURL,KEY,NODE_ENV&demo-title=Linkin&demo-description=Linkin%20is%20a%20customizable%20self%20hosted%20link%20tree%20platform%20%2C%20And%20we%20are%20ready%20to%20roll)

## Deploy with Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RizkyRajitha/linkin)

![Screenshot_2021-05-22 LinkIn's Link tree Page](https://user-images.githubusercontent.com/38534289/119221911-4ca94f80-bb0f-11eb-94ff-31f1c3a51d06.png)

![Screenshot_2021-05-22 Linkin Dashboard](https://user-images.githubusercontent.com/38534289/119221942-7d898480-bb0f-11eb-9175-5e139fa57f0a.png)

![Screenshot_2021-05-22 Linkin Dashboard](https://user-images.githubusercontent.com/38534289/119221939-7c585780-bb0f-11eb-944f-514beb5573b7.png)

### Getting started

- Deploy in Vercel
  - set environment variables
    - `DBURL` - **Postgres** database url
    - `KEY` - random secret key
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
    - `DBURL` - **Postgres** database url
    - `KEY` - random secret key
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.

<br>

### Developing locally

#### Requirements

- Node.js 10.13 or newer
- Postgresql

Setup local environmrnt variables in [config.js](configs/config.js)

example

```
exports.DBURLLOCAL = "postgres://linkin:123@localhost:5432/linkin";
exports.SECRETKEY = "123";
```

#### Clone and install dependencies

```
git clone https://github.com/RizkyRajitha/linkin.git
cd linkin
npm i
```

#### Database migration

**you must have Postgres database setup locally**

```
node scripts/migrate.js
```

#### Run

```
npm run dev
```

### Build with

- [Next.Js](https://nextjs.org/) .
- [Postgres](https://www.postgresql.org/) .

### Currently supported hosting in

- [Vercel](https://vercel.com/) .
- [Heroku](https://heroku.com/) .


### Community

Join our discord community for questions and updates

https://discord.gg/Jsmc5Dm9wg


<!-- 
https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap
https://res.cloudinary.com/dijjqfsto/image/upload/v1621257334/af1fcce7-deb9-4834-965e-4fed59ef6c08_z2l3yf.jpg
'Source Code Pro', monospace
 -->
