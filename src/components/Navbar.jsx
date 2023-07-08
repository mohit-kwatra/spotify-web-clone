import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { StateContext } from '../utils/StateProvider';

function Navbar({ navBackground }) {

  const [{ userInfo }] = useContext(StateContext)

  return (
    <Container $navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch/>
        <input type="text" placeholder="Artists, songs, or podcasts"/>
      </div>
      <div className="avatar">
        <a>
          <CgProfile/>
          <span>{ userInfo?.userName }</span>
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${props => props.$navBackground ? "rgba(0,0,0,0.7)" : "none" };
  .search__bar {
    background: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      width: 100%;
      height: 2rem;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background: #000;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;

// background: linear-gradient();
// background-color: #color;

// max-inline-size: ;
// block-size: auto;

// gap: ;

export default Navbar;
