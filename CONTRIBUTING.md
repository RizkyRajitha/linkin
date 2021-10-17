# Contributing

Welcome to Linkin contribution guidelines. Linkin highly appreciates your support making it better in any order of magnitude.

## Code of Conduct

Help us keep Linkin open and inclusive. Please read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## Community

If you any clarifications or any feedback on Linkin please reach on discord https://discord.gg/Jsmc5Dm9wg

## Linkin Build with

- [Next.Js](https://nextjs.org/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Bootstrap](https://getbootstrap.com/)

## Developing locally

#### Requirements

- Node.js 12.x or newer
- Postgresql database (docker or otherwise)

#### Clone and install dependencies

```bash
git clone https://github.com/RizkyRajitha/linkin.git
cd linkin
npm i
```

<!-- Setup local environmrnt variables in [config.js](configs/config.js) -->

Setup local environment variables in `.env`

example `.env` file

```
DATABASE_URL=postgres://linkin:123@localhost:5432/linkin
HASHSALT=123
```

#### Database migration

create database relations with prisma migration. please refer to [prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate) for further migration info (`npx prisma migrate dev` you will need permission to create databases if such problem occurs use docker Postgres instance ).

**you must have Postgres database setup locally**

```bash
npx prisma migrate dev
```

#### Database Seeding

Adding initial data to the database to get you started

```bash
npm run seed
```

#### Run

```
npm run dev
```

## Branching Strategy

Linkin has 2 main branches

1. [master](https://github.com/RizkyRajitha/linkin/tree/master) branch - will have the code from the latest release. only updates on a release.
2. [dev](https://github.com/RizkyRajitha/linkin/tree/dev) branch - all the development carries out in this branch. the latest code will be available in this branch, **all the pull requests should be made to dev branch** since prs could be tested and modified for the final release phase.
   other than the above branches there can feature specific branches for the continence.

## Making pull request

when making a pull request please create your feature branch using the **[dev](https://github.com/RizkyRajitha/linkin/tree/dev)** branch (`checkout using dev branch`), and develop in it locally. avoid installing additional dependencies unless clarified through a maintainer. make the pr to the **[dev](https://github.com/RizkyRajitha/linkin/tree/dev)** branch.

## File Structure

```
├── app.json
|   (React components)
├── components
│   ├── alert.js
│   ├── colorform.js
│   ├── context
│   │   └── state.js
│   ├── fontform.js
│   ├── footerform.js
│   ├── formwrapper.js
│   ├── genaralform.js
│   ├── linkcard.js
│   ├── linkinthebiopage.js
│   ├── linksform.js
│   ├── passwordchangeform.js
│   └── toast.js
├── configs
│   └── config.js
├── CONTRIBUTING.md
|   (Database connection)
├── db
│   └── dbconprisma.js
├── docker-compose.yml
├── Dockerfile
├── hashgen.js
├── jest.config.js
|   (Lib for all the database operations , and utilities)
├── lib
│   ├── crypto.js
│   ├── dbfuncprisma.js
│   └── side.js
├── LICENSE
├── loadtest.sh
|   (all the API middlewares)
├── middleware
│   └── middleware.js
├── next.config.js
├── package.json
├── package-lock.json
|   (Nextjs pages , APIs)
├── pages
│   ├── admin.js
│   ├── api
│   │   ├── changepassword.js
│   │   ├── deletepagelink.js
│   │   ├── insertpagelinks.js
│   │   ├── login.js
│   │   ├── logout.js
│   │   ├── reorderlinks.js
│   │   ├── updatepagedata.js
│   │   ├── updatepagelinks.js
│   │   └── view.js
│   ├── _app.js
│   ├── dashboard.js
│   └── index.js
|   (Prisma migrations and schemas)
├── prisma
│   ├── migrations
│   │   ├── 20210701133353_init
│   │   │   └── migration.sql
│   │   ├── 20210701134107_added_text_color_attribute
│   │   │   └── migration.sql
│   │   ├── 20210703151237_add_footer_data
│   │   │   └── migration.sql
│   │   ├── 20210707070241_add_description_feild
│   │   │   └── migration.sql
│   │   ├── 20210707070312_add_accent_color_to_link
│   │   │   └── migration.sql
│   │   ├── 20210707095411_add_footer_enable
│   │   │   └── migration.sql
│   │   ├── 20210707111847_add_link_borderradius
│   │   │   └── migration.sql
│   │   ├── 20210729134704_add_reorder_links
│   │   │   └── migration.sql
│   │   ├── 20210917091814_added_avatar_border_color
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── Procfile
├── public
│   ├── favicon.ico
│   ├── fontawesome
│   ├── images
│   │   ├── avatar.jpg
│   │   ├── keiraknightley400.png
│   │   └── logo.jpg
│   ├── vercel.svg
│   └── webfonts
├── railwaymigrate.sh
├── README.md
|   (scripts for seeding , db-migrate.sql , db-migrate-test.sql is out-dated and soon will be removed)
├── scripts
│   ├── db-migrate.sql
│   ├── db-migrate-test.sql
│   └── seed.js
|   (css styles for react components)
├── styles
│   ├── boostrap.min.css
│   ├── dashboard.module.css
│   ├── form.module.css
│   ├── formwrapper.module.css
│   ├── global.css
│   ├── homeview.module.css
│   ├── landing.module.css
│   ├── login.module.css
│   └── utils.module.css
|   (test cases for database operations)
└── __tests__
    ├── prismalinkdata.test.js
    ├── prismapagedata.test.js
    ├── prismausers.test.js
    └── side.test.js
```

## Frontend components layout

Frontend consists of 3 main components

1. admin page `/admin`

2. dashboard `/dashboard`

3. index page (actual link tree) `/`

### admin page

admin page is the login page for the admin. it will `post` the login credentials to the API and validated the user.

![admin page](https://res.cloudinary.com/dijjqfsto/image/upload/v1632202406/linkin/Screenshot_2021-09-20_at_15-52-18_Admin_Login_slb6lo.png)

### dashboard page

the dashboard allows user to modify their link tree appearance.

it has 3 main parts

1. Formwrapper
2. Forms
3. preview

![dashboard page](https://res.cloudinary.com/dijjqfsto/image/upload/v1632919738/linkin/Untitled_Diagram.drawio_1_zrildi.png)

#### Formwrapper

Formwrapper is the wrapper element around the actual forms. this component will conditionally render the inner forms based on the selected form.
it is responsible for the data inserting and updating that the inner forms submit. this wrapper holds the toast container for the toast messages.

#### Forms

there are 6 forms inside the `Formwrapper`.form has been divided into this manner to make every form more specific to the use case, and also making the navigation possible.

1. General Details (a form that holds general details) [genaralform.js](./components/genaralform.js)
2. Footer Details (a form that holds footer details) [footerform.js](./components/footerform.js)
3. Colors (form that holds color details) [colorform.js](./components/colorform.js)
4. Fonts (form that holds font details) [fontform.js](./components/fontform.js)
5. Link Data (a form that configures links and their respective details, this form have it's how API posing to facilitate live refresh in links) [linksform.js](./components/linksform.js)
6. Social Data (a form that configures **social** links and their respective details, this form have it's how API posing to facilitate live refresh in links) [socialform.js](./components/socialform.js)
7. Updated Password (a form that updates the password) [passwordchangeform.js](./components/passwordchangeform.js)

#### Preview

This component updates (real-time on links form) based on the form data modifications. this is [linkinthebiopage.js](./components/linkinthebiopage.js), the same component that is rendered in the `index` page but with less width.

### index page

the linkin tree component that is visible to the users.

![index page](https://res.cloudinary.com/dijjqfsto/image/upload/v1632202539/linkin/Screenshot_2021-09-21_at_11-05-24_LinkIn_s_Link_tree_Page_isgsez.png)

## API

Linkin levarages next js built-in [api-routes](https://nextjs.org/docs/api-routes/introduction).
this removes the requirement of additional API deployment, making Linkin cleaner and easier to deploy.
all the API routes live in [/pages/api/](./pages/api/) directory.

Linkin has 12 API routes:

1. login [login.js](./pages/api/login.js)
2. logout [logout.js](./pages/api/logout.js)
3. changepassword [changepassword.js](./pages/api/changepassword.js)
4. updatepagedata [updatepagedata.js](./pages/api/updatepagedata.js)
5. insertlinks
   - For pages form: [insertlinks.js](./pages/api/pages/insertlinks.js)
   - For social form: [insertlinks.js](./pages/api/social/insertlinks.js)
6. updatelinks
   - For pages form: [updatelinks.js](./pages/api/pages/updatelinks.js)
   - For social form: [updatelinks.js](./pages/api/social/updatelinks.js)
7. deletelink
   - For pages form: [deletelink.js](./pages/api/pages/deletelink.js)
   - For social form: [deletelink.js](./pages/api/social/deletelink.js)
8. reorderlinks
   - For pages form [reorderlinks.js](./pages/api/pages/reorderlinks.js)
   - For social form [reorderlinks.js](./pages/api/social/reorderlinks.js)

| API             | method | data                                                                                                                    | response                                                                                                                               |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| login           | post   | `{username: "username",password: "password"}`                                                                           | `200` `{ success : true }` <br> `401` invalid_credential <br> `500` errasasasasassasor                                                 |
| logout          | get    |                                                                                                                         | `200` `{ success : true , message : "logout" }`                                                                                        |
| changepassword  | post   | `{currentPassword: "password", newPassword: "newpassword"}`                                                             | `200` `{ success : true }` <br> `500` error                                                                                            |
| updatepagedata  | post   | `{"id":1,...}`                                                                                                          | `400` method not allowed <br> `200` `{ success: true, updatedPageData:{...}}`<br> `500` `{ success: false, message: "error.message" }` |
| insertpagelinks | post   | {...}                                                                                                                   | `400` method not allowed <br> `200` `{ success: true, updatedLinkData:{...}}`<br> `500` `{ success: false, message: "error.message" }` |
| updatepagelinks | post   | `{"id":1,...}`                                                                                                          | `400` method not allowed <br> `200` `{ success: true, updatedLinkData:{...}}`<br> `500` `{ success: false, message: "error.message" }` |
| deletepagelink  | post   | {id:"1"}                                                                                                                | `400` method not allowed <br> `200` `{ success: true }` <br> `500` `{ success: false, message: "error.message" }`                      |
| reorderlinks    | post   | `{"orderData":[{"id":3,"name":"","orderIndex":0},{"id":1,"name":"","orderIndex":1},{"id":2,"name":"","orderIndex":2}]}` | `400` method not allowed <br> `200` `{ success: true }` <br> `500` `{ success: false, message: "error.message" }`                      |

## Testing

Linkin implemented tetsing using [jest](https://jestjs.io/).test cases live in [**test** dir](./__tests__/) . currently all the database manipulation functions are being tested in the pragmatic flow.
