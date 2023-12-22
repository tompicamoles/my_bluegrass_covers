import React from "react";
import theme from "./Theme";
import { ThemeProvider } from "styled-components";
import TrackList from "./components/Tracklist";
import { Box, Container, Grid } from "@mui/material";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box alignContent="center">
        <Container maxWidth="sm" style={{ marginTop: "100px" }}>
          <SearchBar />
        </Container>
        <Container>
          <Grid container spacing={2} alignContent="center">
            <Grid item xs={8}>
              <TrackList />
            </Grid>
            <Grid item xs={4}>
              <Playlist />
            </Grid>
          </Grid>
        </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
