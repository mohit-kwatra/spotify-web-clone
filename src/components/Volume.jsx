import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../utils/StateProvider';
import axios from 'axios';

function Volume() {

  const [{token}] = useContext(StateContext)

  const changeVolume = async (event) => {
    await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
            params: {
                volume_percent: parseInt(event.target.value),
            },
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        }
    );
  }

  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(event) => changeVolume(event)}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;

export default Volume;
