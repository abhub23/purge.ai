# Parallel Drizzle database representation

`schema/` organizes the Drizzle models by domain: Better Auth tables in
`auth.ts`, application tables in `application.ts`, and ORM relations in
`relations.ts`. `schema/index.ts` re-exports the models, while `index.ts`
exports the configured database instance. This matches the current PostgreSQL
schema represented by `server/prisma/schema.prisma`.

`migrations/` starts a new Drizzle migration history with a baseline for this
current schema. The old Prisma migration history is not included.

No database has been connected to or migrated as part of this setup. Do not
apply the Drizzle baseline to a database that already contains these tables.
An existing database must be safely baselined against Drizzle's migration
journal before Drizzle migrations are used.

Drizzle Kit scans the schema directory recursively, as documented in the
[Drizzle schema organization guide](https://orm.drizzle.team/docs/sql-schema-declaration).
The `db` workspace owns Drizzle dependencies, configuration, and scripts. Run
these commands from the repository root:

```sh
bun --filter db generate
bun --filter db check
```

Other available scripts are `migrate`, `push`, `pull`, `studio`, `up`, and
`export` (for example, `bun --filter db migrate`). Database commands require
`DATABASE_URL`. `migrate` and `push` change the target database; do not use
them against an existing database until its Drizzle migration history has
been safely baselined.

Start a local PostgreSQL database from the repository root with
`bun run db:up`. It is available at
`postgresql://postgres:postgres@localhost:5432/purgeai` and persists data in a
Docker volume. This starts the database only; it does not apply migrations.

Run `bun run db:seed` to insert sample development rows into every database
table. Apply the schema to the target database first; the seed script does not
create tables. The seed script is idempotent and requires `DATABASE_URL`.
