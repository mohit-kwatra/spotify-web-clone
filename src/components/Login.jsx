import React from 'react';
import styled from 'styled-components';
import SpotifyLogo from '../assets/images/spotify_logo.png'

function Login() {

  const buttonClickHandler = () => {
    const clientID = process.env.SPOTIFY_API_CLIENT_ID;
    const redirectURL = "http://localhost:3000/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scopes = [
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played"
    ]

    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scopes.join(' ')}&response_type=token&show_dialog=true`;
  }

  return (
    <div>
      <Container>
        <FlexContainer>
            <img src={SpotifyLogo} alt="Spotify_Logo" />
            <button onClick={buttonClickHandler}>Connect</button>
        </FlexContainer>
      </Container>
    </div>
  )
}

const Container = styled.div`

max-width: 100%;
height: 100vh;
background: #1db954;

`;

const FlexContainer = styled.div`

position: absolute;
top: 15%;
left: 15%;
right: 15%;
bottom: 15%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: rgba(255,255,255,0.15);
gap: 5rem;
border-radius: 1rem;
border: 1px solid rgba(255,255,255,0.18);
backdrop-filter: blur(3px);
box-shadow: 0 8px 32px 0 rgba(0,0,0,0.1);

img {
    height: 20vh;
    user-select: none;
}

button {
    position: relative;
    border: none;
    padding: 1rem 5rem;
    border-radius: 2rem;
    background: #000;
    color: #49f585;
    -webkit-font-smoothing: antialiased;
    font-size: 18px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.3s;
}

button::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -25%;
    right: 110%;
    bottom: -20px;
    background: rgba(255,255,255,0.75);
    transform: skew(-30deg);
}

button:hover {
    transform: translateY(-3px);
}

button:hover::before {
    animation: animateButton 0.5s ease-out 0s 1 both;
}

@keyframes animateButton {
    0% {
        left: -25%;
        right: 110%;
    }
    100% {
        left: 110%;
        right: -25%;
    }
}

`;

export default Login;
