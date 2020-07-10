# Postgres notes
## References
Some references via the official docs:
- [Data definition/ creating tables and etc](https://www.postgresql.org/docs/12/ddl.html)
- [Data manipulation](https://www.postgresql.org/docs/12/dml.html)
- [Queries](https://www.postgresql.org/docs/12/queries.html)
- [Data Types](https://www.postgresql.org/docs/12/datatype.html)

## Commands
Here's a couple of handy commands for Postgres.
- `\c my_db_name` to use a database
- `\dt` to list tables in a database
- `\d my_table_name` to list table columns

## Diffs to MySQL
Instead of `AUTO_INCREMENT` we use `SERIAL` for auto incrementing data types.
```sql
  create table albums (
    id serial,
    name varchar(255)
  )
```