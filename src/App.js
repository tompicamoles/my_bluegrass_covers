import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import TrackList from "./components/Tracklist";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import theme from "./Theme";
import {
  generateAccessToken,
  authentificate,
  fetchTracks,
  createPlaylist,
} from "./spotify_access_token";
import { Preview } from "@mui/icons-material";

let hardcodedTracks = [
  {
    Id: 1,
    Song: "North Country Blues",
    Artist: "Mighty Poplar",
    Album: "Love",
    Added: false,
    uri: "test.com",
  },
  {
    Id: 2,
    Song: "Hey Joe",
    Artist: "Caamp",
    Album: "Folk",
    Added: false,
    uri: "test-2.com",
  },
];

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [previewAudio, setPreviewAudio] = useState("");

  const setTrackList = async (query) => {
    const trackList = await fetchTracks(query);
    console.log("tracks in app", trackList);
    setTracks(trackList);
  };

  useEffect(() => {
    const fetchData = async () => {
      const spotifyToken = await generateAccessToken();
      console.log("App.js monted. there is a token", spotifyToken);
      setAccessToken(spotifyToken);
      
    };
    fetchData();

    setTrackList("Blues");

    console.log(tracks)
  }, []);

  const playSample = (previewUrl, track) => {
    if (previewAudio) {
      console.log("song currently playig");
      const audio = previewAudio;
      audio.pause();
    }

    const objectIndex = tracks.findIndex((obj) => obj.uri === track.uri);
    const updateState = () => {
      let updatedArray = tracks.map(track => track.isPlaying = false)
      const updatedObject = {
        ...tracks[objectIndex],
        isPlaying: true,
      }
      updatedArray = [...tracks]
      updatedArray[objectIndex] = updatedObject;
      
      setTracks(updatedArray)
      console.log(updatedArray)
      console.log(tracks)
    }

    updateState()

    const audio = new Audio(previewUrl);
    setPreviewAudio(audio);
    audio.play();
    console.log(`audio : ${audio}, state = ${previewAudio}`);
  };

  const updatePlaylist = (track) => {
    track.Added = true;

    setPlaylist((prev) => {
      let isIncluded = prev.some((t) => t.uri === track.uri);
      if (prev.some((t) => t.uri === track.uri)) {
        return prev.filter((t) => t.uri !== track.uri);
      } else {
        return [...prev, track];
      }
    });
  };

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setPlaylistName(value);
  };

  const updateTrackList = (track) => {
    const objectIndex = tracks.findIndex((obj) => obj.uri === track.uri);
    const updateState = (value) => {
      const updatedObject = {
        ...tracks[objectIndex],
        Added: value,
      };
      const updatedArray = [...tracks];

      updatedArray[objectIndex] = updatedObject;
      setTracks(updatedArray);
    };

    if (track.Added === true) {
      updateState(false);
    } else {
      updateState(true);
    }

    updatePlaylist(track);

    console.log(playlist);
  };

  if (accessToken) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="sm"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            <SearchBar setTrackList={setTrackList} />
          </Container>
          <Container sx={{ border: "none" }}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={8}>
                <TrackList
                  tracks={tracks}
                  updateTrackList={updateTrackList}
                  playSample={playSample}
                />
              </Grid>
              <Grid item xs={4}>
                <Playlist
                  playlistName={playlistName}
                  setPlaylistName={setPlaylistName}
                  handleNameChange={handleNameChange}
                  playlist={playlist}
                  setPlaylist={setPlaylist}
                  updateTrackList={updateTrackList}
                  createPlaylist={createPlaylist}
                  accessToken={accessToken}
                />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="sm"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            <Button variant="contained" onClick={authentificate}>
              Log Into Spotify
            </Button>
          </Container>
        </ThemeProvider>
      </>
    );
  }
};

export default App;
