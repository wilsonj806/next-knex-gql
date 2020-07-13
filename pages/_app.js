import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

// import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

const store = configureStore({
  reducer: counter.reducer
})

function CustomApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql'
  })

  return (
    <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <Component {...pageProps}/>
    </ApolloProvider>
    </ReduxProvider>
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
export const { increment, decrement } = counter.actions