import { ApolloServer, gql } from 'apollo-server-micro'
import knex from 'knex'
import Cors from 'micro-cors'
import DataLoader from 'dataloader'

const db = knex({
  client: "postgres",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

// db.schema.hasTable('users').then(exists => {
//   if (!exists) {
//     db.createTable('users', (table) => {
//       table.increments('id')
//       table.string('firstName')
//     })
//     .then(() => db('users').insert([
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
        return db.select('*').from('users')
      // } catch (err) {
      //   console.log(err)
      // }
    },
    albums: (parent, args, context) => {
      // try {
        return db
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
      return db
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
      return db
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

// Using Loader to avoid N+1 querying since GQL resolves queries serially
// - i.e resolves one field/ node after another
const loader = {
  artist: new DataLoader(ids =>
    db
    .select('*')
    .from('artists')
    .whereIn('id', ids)
    .then(rows => ids.map(id => rows.find(row => row.id === id)))
  )
}

const cors = Cors({
  allowMethods: ['GET', 'POST', 'OPTIONS']
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ loader })
})

export const config = {
  api: { bodyParser: false }
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default cors(handler)

