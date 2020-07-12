import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_ALBUMS = gql`
  query {
    albums {
      id
      name
      artist {
        name
      }
    }
  }
`

const AlbumInfo = () => {
  const { loading, error, data } = useQuery(GET_ALBUMS)
  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>error</p>
  }
  const ToMap = data.albums.map(album => (
    <div key={album.name}>
      <h1>{album.name}</h1>
      <p>{album.artist.name}</p>
    </div>
  ))
  return (
    <div>
      { ToMap }
    </div>
  )
}

export default AlbumInfo