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
import { generateAccessToken, authentificate } from "./spotify_access_token";

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
  const [accessToken, setAccessToken] = useState("");
  
  

  useEffect(() => {

    setTracks(hardcodedTracks);

    const fetchData = async () => {
      const spotifyToken = await generateAccessToken();
      console.log("App.js monted. there is a token" , spotifyToken)
      setAccessToken(spotifyToken);

    };
    
    fetchData();
    
    
  }, []);

  const updateTrackList = (track) => {
    const objectIndex = tracks.findIndex((obj) => obj.Id === track.Id);

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
  };
  
  if (accessToken) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="sm"
            style={{ marginTop: "100px", marginBottom: "100px" }}
          >
            <SearchBar />
          </Container>
          <Container sx={{ border: "none" }}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={8}>
                <TrackList tracks={tracks} updateTrackList={updateTrackList} />
              </Grid>
              <Grid item xs={4}>
                <Playlist tracks={tracks} updateTrackList={updateTrackList} />
              </Grid>
            </Grid>
            <Box>Token : {accessToken}</Box>
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
