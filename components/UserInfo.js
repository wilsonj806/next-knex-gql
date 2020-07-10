import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_USERS = gql`
  query {
    users {
      id
      firstName
    }
  }
`

const UserInfo = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>error</p>
  }
  console.log(data)
  return (
    <div>
      <h1>These are users</h1>
      { data.users.map(user => <p key={user.firstName}>{user.firstName}</p>) }
    </div>
  )
}

export default UserInfo;