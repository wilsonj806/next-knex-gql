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

// FIXME use hasTable instead of createTableIfNotExists
knexClient.schema.createTableIfNotExists('users', (table) => {
  table.increments('id')
  table.string('firstName')
}).then(() => knexClient('users').insert([
  {firstName: 'Wilson'},
  {firstName: 'Calvin'}
]))
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
    users(parent, args, context, resolveInfo) {
      return knexClient.select('*').from('users')
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = { api: { bodyParser: false }}

export default apolloServer.createHandler({ path: '/api/graphql' })

