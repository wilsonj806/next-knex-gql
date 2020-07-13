import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import UserInfo from '../components/UserInfo'
import AlbumInfo from '../components/AlbumInfo'

import { increment, decrement } from './_app'

const Index = ({ data }) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>My Example Knex, Next.js, Apollo, GraphQL App</h1>
      <UserInfo/>
      <AlbumInfo/>
      <p>{state }</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
};


export default Index;