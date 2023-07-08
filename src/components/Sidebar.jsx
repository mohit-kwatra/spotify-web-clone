import React from 'react';
import styled from 'styled-components';
import SpotifyLogo from '../assets/images/spotify_logo_white.png'
import { IoLibrary } from 'react-icons/io5'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import Playlists from './Playlists';

function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
        <img src={SpotifyLogo} alt="Spotify_Logo" />
        </div>
        <ul>
            <li>
              <MdHomeFilled/>
              <span>Home</span>
            </li>
            <li>
              <MdSearch/>
              <span>Search</span>
            </li>
            <li>
              <IoLibrary/>
              <span>Your Library</span>
            </li>
        </ul>
      </div>
      <Playlists/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

export default Sidebar;
