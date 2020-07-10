import React from 'react'
// import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

function CustomApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql'
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps}/>
    </ApolloProvider>
  )
}

export default CustomApp

// class CustomAppComp extends App {
//   render() {
//     const client = new ApolloClient({
//       uri: 'http://localhost:3000/api/graphql'
//     })
//     return (
//       <ApolloProvider client={client}>

//       </ApolloProvider>
//     )
//   }
// }