# Next GQL Knex
## Overview
This is a quick tutorial project that runs a Next.js universal React app with Apoolo GraphQL/ Knex as the data layer of the app.

Code is based on the below:
- [example repo](https://github.com/bengrunfeld/nextjs-apollo-app)
- [Log Rocket article](https://blog.logrocket.com/building-a-graphql-server-in-next-js)

## Local Development
You will need Node v12+ to run the app as well as a recent version of PostgreSQL. Docker is also recommended as you can take advantage of Docker Compose.

If you have Docker, then you can run `docker-compose up` to run the app locally.

You'll also need to run the migrations for the database so run the below:
```
  docker container exec -i $(docker container ls -q -f "ancestor=next-knex-gql_nextjs") bash

  npm run db:dev
```

If you don't have Docker, then you'll need to make some changes.