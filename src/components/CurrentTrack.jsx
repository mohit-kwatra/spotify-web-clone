import React, { useContext, useEffect } from 'react';
import { StateContext } from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/constants';
import { styled } from 'styled-components';

function CurrentTrack() {

  const [{ token, currentlyPlaying }, dispatch] = useContext(StateContext);

  useEffect(() => {

    const getCurrentlyPlaying = async () => {
        const { data } = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            }
        );

        if(data) {
            const currentlyPlaying = {
                id: data.item.id,
                name: data.item.name,
                artists: data.item.artists.map(({ name }) => name),
                image: data.item.album.images[2].url,
            }
            
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        }
    }
    getCurrentlyPlaying();

  }, [token, dispatch]);

  return (
    <Container>
      {
        currentlyPlaying && (
            <div className="track">
                <div className="track__image">
                    <img src={currentlyPlaying.image} alt="Current Track" />
                </div>
                <div className="track__info">
                    <h4>{currentlyPlaying.name}</h4>
                    <h6>{currentlyPlaying.artists.join(", ")}</h6>
                </div>
            </div>
        )
      }
    </Container>
  );
};

const Container = styled.div`

  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        h4 {
            color: white;
        }
        h6 {
            color: #b3b3b3;
        }
    }
  }

`;

export default CurrentTrack;
