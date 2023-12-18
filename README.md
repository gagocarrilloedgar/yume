# Yume - milista.xyz

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

