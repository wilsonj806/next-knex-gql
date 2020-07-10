import { ApolloServer, gql } from 'apollo-server-micro'
import knex from 'knex'

const knexClient = knex({
  client: "postgres",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

knexClient.schema.hasTable('users').then(exists => {
  if (!exists) {
    knexClient.createTable('users', (table) => {
      table.increments('id')
      table.string('firstName')
    })
    .then(() => knexClient('users').insert([
      {firstName: 'Wilson'},
      {firstName: 'Calvin'}
    ]))
  } else {
    return;
  }
})
.catch(err => console.log(err));



const typeDefs = gql`
  type Query {
    users: [User!]!
  },
  type User {
    id: Int!
    firstName: String
  }
`

// TODO integrate Knex into this for resolving shit
const resolvers = {
  Query: {
    async users(parent, args, context, resolveInfo) {
      try {
        const res  = await knexClient.select('*').from('users')
        return res;
      } catch (err) {
        console.log(err)
      }
    },
  },
}


const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: { bodyParser: false }
}

export default apolloServer.createHandler({ path: '/api/graphql' })

