import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Body from './Body';
import Navbar from './Navbar';
import Footer from './Footer';
import { StateContext } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/constants';

function Spotify() {

  const [{ token }, dispatch] = useContext(StateContext)
  const bodyRef = useRef()

  const [navBackground, setNavBackground] = useState(false)
  const [headerBackground, setHeaderBackground] = useState(false)

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 
    ? setNavBackground(true) 
    : setNavBackground(false);
    bodyRef.current.scrollTop >= 268 
    ? setHeaderBackground(true) 
    : setHeaderBackground(false);
  }

  useEffect(() => {

    const getUserInfo = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        }
      );

      const userInfo = {
        userID: data.id,
        userName: data.display_name,
        userEmail: data.email
      }
      dispatch({ type: reducerCases.SET_USER, userInfo })
    }
    getUserInfo()

  }, [token, dispatch])

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}/>
          <div className="body__contents">
            <Body headerBackground={headerBackground}/>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 15vw 85vw;
    background: linear-gradient(transparent, rgba(0,0,0,1));
    background-color: rgb(32,87,100);
    .body {
      width: 100%;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
            background-color: rgba(255,255,255,0.6);
        }
      }
    }
  }
`;

export default Spotify
