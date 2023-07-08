import React, { useContext, useEffect } from 'react';
import { StateContext } from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/constants';
import styled from 'styled-components';

function Playlists() {

  const [{ token, playlists }, dispatch] = useContext(StateContext)

  useEffect(() => {
    
    const getPlaylistData = async () => {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );
        
        const items = response.data.items
        const playlists = items.map(({ name, id }) => {
            return { name, id }
        })

        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistID: playlists[0] ? playlists[0].id : null })
        dispatch({type: reducerCases.SET_PLAYLISTS, playlists})
    }
    getPlaylistData();

  }, [token, dispatch])

  const changeSelectedPlaylistID = (id) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistID: id })
  }

  return (
    <Container>
      <ul>
        {
            playlists.map(({name, id}) => {
                return <li key={id} onClick={() => changeSelectedPlaylistID(id)}>{name}</li>;
            })
        }
      </ul>
    </Container>
  );
}

const Container = styled.div`

max-width: 100%;
height: 100%;
overflow: hidden;

ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 42vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
            background-color: rgba(255,255,255,0.6);
        }
    }
    li {
      cursor: pointer;
      transition: 0.3s ease-in-out;
      word-wrap: break-word;
      &:hover {
        color: white;
      }
    }
}

`;

export default Playlists;
