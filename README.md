# Yume - milista.xyz

<div align="center">
  <img align="center"  width="auto" height="auto" src="/public/mstile-150x150.png" />
  <br/>

  <div id="user-content-toc">
    <ul>
      <summary>
      <h1 style="display: inline-block;">Yume</h1>
      <br/>
      <h3 style="display: inline-block;">The AI-powered collaborative wish-list platform</h3>
      </summary>
    </ul>
  </div>
</div>

Yume is a user-friendly platform that helps people store, organize, and share their wish lists with friends and family, allowing them to easily keep track of their desired items and receive thoughtful gifts on special occasions.

Yume has been created as a learning project and it is intented to be kept that way. It is an open-source project that intends to make it easier to try-out new technologies using best-practices and production-ready configurations outside your main job.

Even if it is an open-source project Yume was born out of a product idea and in order to provide the best learning and growing experience should be treated as a product.

## Mision, Vision & Values

### Mission

To help people achieve their dreams by providing an easy and fun way to create and share wish lists with loved ones.

### Vision

To become the go-to platform for creating and sharing wish lists, inspiring people to dream big and connect with those who matter most.

### Values

- **Empowerment**: We believe in empowering people to pursue their dreams and share them with others.
- **Simplicity**: We strive for simplicity in everything we do, making it easy for people to use our platform and achieve their goals.
- **Creativity**: We encourage creativity and imagination, inspiring people to dream big and think outside the box.
- **Community**: We value the importance of community and connection, fostering meaningful relationships and helping people share their dreams with loved ones.

## Desings

- [Figma](https://www.figma.com/file/3Tm1i44PFQszJSw6zuqUvJ/Yume?t=nGhnaFVzGtX5pKHk-1)

## Getting Started

Clone the project

```sh
git clone https://github.com/gagocarrilloedgar/yume
```

Install the dependencies

```sh
pnpm install
```

Copy the .env file and add the variables if needed

```sh
cp .env.example .env
```

## Using conventional commits

The Conventional Commits specification is a lightweight convention on top of commit messages. If you want to read more about it: [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

This repository is created using [husky](https://www.npmjs.com/package/husky), [commitlint](https://commitlint.js.org/#/) and [lint-staged](https://www.npmjs.com/package/lint-staged) so the convectional commits is always applied before pushing to a branch.

Then the only thing you need to do is commit your work following the **conventional commit specification**. If you don't follow the specification don't worry, a prompt will appear telling you the correct way to create your commit.

The tipical categories are:

- _feat_ is for adding a new feature
- _fix_ is for fixing a bug
- _refactor_ is for changing code for peformance or convenience purpose (e.g. readibility)
- _chore_ is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)
- _docs_ is to add documentation (readme, swagger, storybook, etc).

If you even wan to add more semantic to the commit you add a scope:

```sh
git commit <category(scope): description>
```

One example could be (taking into account you are developing something related to the layout and its a new feature).

```sh
git commit <feat(layout): sidenav redirection added>
```

## Migrations

1. **Make sure to be loggedin in Planetscale**

```bash
pscale auth login
```

2. **Create a Migration:**

Run the following command to create a new migration:

```bash
 npx prisma db push
```

Unlike the `prisma migrate dev` command, it will not create a migrations folder containing a SQL file with the SQL used to update the schema in your PlanetScale database. PlanetScale will be tracking your migrations in this workflow.

Also make sure that if **safe migrations** are enabled the datasource should point to the same connection (branch)

```PRISMA
datasource db {
  provider     = "mysql"
  url          = env("DEV_DATABASE_URL")
  relationMode = "prisma"
}
```

## Seeds
