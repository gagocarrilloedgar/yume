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

This command will analyze the changes in your Prisma schema and generate a new migration file. If you've only added th
`Favorite` model and not modified existing models, the migration should include the creation of the `Favorite` table.

3. **Review the Migration:**

- Open the generated migration file (located in the `prisma/migrations` directory) and review the SQL statements to ensure they align with your expectations.

4. **Apply the Migration:**

- Run the following command to apply the migration and update your database on PlanetScale:

```bash
npx prisma migrate up --experimental
```

This command executes the migration and applies the changes to your database.


