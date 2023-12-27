import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
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


let hardcodedTracks = [
  {
    Song: "North Country Blues",
    Artist: "Mighty Poplar",
    Added: false,
  },
  {
    Song: "Hey Joe",
    Artist: "Caamp",
    Added: false,
  },
];

const App = () => {
  

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const updatePlaylist = (track) => {
    setPlaylistTracks  ((prev) => {
      if (prev.includes(track)) {
        // filter the clicked topping out of state
        
        
        
        return prev.filter(t => t !== track);
      } else {
        // add the clicked topping to our state
        
        return [track, ...prev];
      }

    })
  }

  
  
    const [tracks, setTracks] = useState([]);
  
    useEffect(() => {
      setTracks(hardcodedTracks);
    }, []);



  return (
    <>
      <ThemeProvider theme={theme}>
     
        
        
          <Container maxWidth="sm" style={{ marginTop: "100px", marginBottom:"100px" }}>
            <SearchBar />
          </Container>
          <Container sx={{border:"none"}}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={8}>
                <TrackList tracks={tracks} updatePlaylist={updatePlaylist}/>
              </Grid>
              <Grid item xs={4}>
                <Playlist  playlistTracks={playlistTracks} updatePlaylist={updatePlaylist}/>
              </Grid>
            </Grid>
          </Container>
        
      </ThemeProvider>
    </>
  );
};

export default App;
