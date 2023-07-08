import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { StateContext } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/constants' 
import { AiFillClockCircle } from 'react-icons/ai'

function getTimeFromMilliseconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000) % 60;
  let minutes = Math.floor(milliseconds / (1000 * 60)) % 60;

  let timeString = padNumber(minutes) + ":" + padNumber(seconds);
  return timeString;
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

function Body({ headerBackground }) {

  const [{ token, selectedPlaylistID, selectedPlaylist }, dispatch] = useContext(StateContext);

  useEffect(() => {
    const getInitialPlaylist = async () => {
      if(selectedPlaylistID)
      {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistID}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            }
          }
        );

        const selectedPlaylist = {
          id: data.id,
          name: data.name,
          description: data.description.startsWith("<a")
          ? ""
          : data.description,
          image: data.images[0].url,
          tracks: data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            artists: track.artists.map(({ name }) => name),
            image: track.album.images[2].url,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number
          })),
        }

        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
      }
    }
    getInitialPlaylist();
  }, [token, selectedPlaylistID, dispatch]);

  const playTrack = async (id, name, image, artists, context_uri, track_number) => {
   const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      }
    );

    if(response.status === 204)
    {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      }

      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  }

  return (
    <Container $headerBackground={headerBackground}>
      {
        selectedPlaylist && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={selectedPlaylist.image} alt="Playlist" />
              </div>
              <div className="details">
                <span className="type">PLAYLIST</span>
                <h1 className="title">{selectedPlaylist.name}</h1>
                {
                  (selectedPlaylist.description.length > 0) && (
                    <p className="description">{selectedPlaylist.description}</p>
                  )
                }
              </div>
            </div>
            <div className="list">
              <div className="header__row">
                <div className="col"><span>#</span></div>
                <div className="col"><span>TITLE</span></div>
                <div className="col"><span>ALBUM</span></div>
                <div className="col"><span><AiFillClockCircle/></span></div>
              </div>
              <div className="tracks">
                {
                  selectedPlaylist.tracks.map(({ id, name, image, album, artists, duration, context_uri, track_number }, index) => 
                  {
                    return (
                      <div className="row" key={ id } onClick={() => playTrack(id, name, image, artists, context_uri, track_number)}>
                        <div className="col">
                          <span>{ index+1 }</span>
                        </div>
                        <div className="col detail">
                          <div className="image">
                            <img src={ image } alt="Track" />
                          </div>
                          <div className="info">
                            <span className="name">{ name }</span>
                            <span>{ artists }</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{ album }</span>
                        </div>
                        <div className="col">
                          <span>{ getTimeFromMilliseconds(duration) }</span>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </Container>
  );
}

const Container = styled.div`

  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 3rem;
        margin: 0;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin-top: 1rem;
      padding: 1rem 3rem;
      color: #dddcdc;
      transition: 0.3s ease-in-out;
      position: sticky;
      top: 15vh;
      background-color: ${props => props.$headerBackground ? "#000000dc" : "none" };
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 1.95fr 0.1fr;
        transition: 0.2s ease;
        border-radius: 0.5rem;
        cursor: pointer;
        &:hover {
          background-color: rgba(0,0,0,0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
            .name {
              font-weight: bold;
            }
          }
        }
      }
    }
  }

`;

export default Body;
