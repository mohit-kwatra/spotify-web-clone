import React, { useEffect, useContext } from 'react';
import Login from './components/Login';
import Spotify from './components/Spotify';
import { StateContext } from './utils/StateProvider';
import { reducerCases } from './utils/constants';

function App() {

  const [ {token}, dispatch ] = useContext(StateContext)

  useEffect(
    () => {
      const hash = window.location.hash
      if(hash)
      {
        const token = hash.substring(1).split('&')[0].split('=')[1]
        dispatch({ type: reducerCases.SET_TOKEN, token })
      }
    },
    [token, dispatch]
  );

  return (
    <div>
      { (token) ? <Spotify/> : <Login/> }
    </div>
  )
}

export default App;
