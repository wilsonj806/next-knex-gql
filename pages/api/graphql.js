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

// knexClient.schema.hasTable('users').then(exists => {
//   if (!exists) {
//     knexClient.createTable('users', (table) => {
//       table.increments('id')
//       table.string('firstName')
//     })
//     .then(() => knexClient('users').insert([
//       {firstName: 'Wilson'},
//       {firstName: 'Calvin'}
//     ]))
//   } else {
//     return;
//   }
// })
// .catch(err => console.log(err));



const typeDefs = gql`
  type Query {
    users: [User!]!
    albums(first: Int = 25, skip: Int=0): [Album!]!
  }

  type Artist {
    id: Int!
    name: String!
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type User {
    id: Int!
    firstName: String
  }

  type Album {
    id: Int!
    name: String!
    year: Int!
    artist: Artist!
  }
`

const resolvers = {
  Query: {
    users: (parent, args, context, resolveInfo) => {
      // try {
        return knexClient.select('*').from('users')
      // } catch (err) {
      //   console.log(err)
      // }
    },
    albums: (parent, args, context) => {
      // try {
        return knexClient
        .select('*')
        .from('albums')
        .orderBy('year', 'asc')
        .limit(Math.min(args.first, 50))
        .offset(args.skip)
      // } catch (err) {
        // console.log(err)
      // }
    }
  },

  Album: {
    id: (album, args, context) => album.id,
    artist: (album, args, context) => {
      // try {
      return knexClient
        .select('*')
        .from('artists')
        .where({ id: album.artist_id})
        .first();
      // } catch (err) {
        // console.log(err)
      // }

    }
  },

  Artist: {
    id: (artist, _args, context) => artist.id,
    albums: (artist, args, context) => {
      // try {
      return knexClient
        .select('*')
        .from('albums')
        .where({ artist_id: artist.id })
        .orderBy('year', 'asc')
        .limit(Math.min(args.first, 50))
        .offset(args.skip)
      // } catch (err) {
        // console.log(err)
      // }

    }
  }
}


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({})
})

export const config = {
  api: { bodyParser: false }
}

export default apolloServer.createHandler({ path: '/api/graphql' })

