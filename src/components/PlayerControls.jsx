import React, { useContext } from 'react';
import styled from 'styled-components';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import { StateContext } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/constants';

function PlayerControls() {

  const [{ playerState, token }, dispatch] = useContext(StateContext);

  const changeTrack = async (type) => {
    await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
    );
    
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
    } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  }

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
    );
    
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
  }

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle/>
      </div>
      <div className="previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev/>
      </div>
      <div className="state">
        {
            playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill onClick={changeState}/> 
        }
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <CgPlayTrackNext/>
      </div>
      <div className="repeat">
        <FiRepeat/>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        color: white;
    }
  }
  .state {
    svg {
        color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

export default PlayerControls;
