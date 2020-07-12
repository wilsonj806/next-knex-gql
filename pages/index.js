import React from "react";
import UserInfo from '../components/UserInfo'
import AlbumInfo from '../components/AlbumInfo'

const Index = ({ data }) => {

  return (
    <div>
      <h1>My Example Knex, Next.js, Apollo, GraphQL App</h1>
      <UserInfo/>
      <AlbumInfo/>
    </div>
  )
};


export default Index;