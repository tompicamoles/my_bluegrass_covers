import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import TrackList from "./components/Tracklist";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import theme from "./Theme";
import {
  generateAccessToken,
  authentificate,
  fetchTracks,
  createPlaylist,
} from "./spotify_access_token";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [previewAudio, setPreviewAudio] = useState("");
  const [currentTimeout, setCurrentTimeout] = useState();


  const setTrackList = async (query) => {
    console.log(query);
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

    setTrackList("Come as you are");
  }, []);

  const playSample = async (previewUrl, track) => {
    const currentAudio = previewAudio;
    const audio = new Audio(previewUrl);

    // const resetPlayButton =  () => {
    //   let updatedArray =  [...tracks];
    //   updatedArray.map((track) => (track.isPlaying = false));
    //   setTracks(updatedArray);
    // }

    const resetAllPlayButtons =  () => {
       setTracks((prevTracks) => {
        const updatedArray = prevTracks.map((item) => ({
          
          ...item,
          isPlaying: false,
        }));
        console.log("tracks all back to non playing" ,updatedArray)
        return updatedArray;
      });
    };

    if (previewAudio) {
      // a song is currently playing
      currentAudio.pause();
    }

    if (currentAudio.src !== previewUrl) {
      // the song currently playing is not the one selected

      setTracks((prevTracks) => {
        const updatedArray = prevTracks.map((item) => ({
          
          ...item,
          isPlaying: item.Preview === track.Preview ? true : false,
        }));
        console.log("tracks all back to non playing" ,updatedArray)
        return updatedArray;
      });

        clearTimeout(currentTimeout);

        setCurrentTimeout(
          setTimeout(() => {
            resetAllPlayButtons();
          }, "30000")
        );
      

    

      setPreviewAudio(audio);
      audio.play();
    } else {
      
      setPreviewAudio("");
      resetAllPlayButtons();
    }
  };

  const updatePlaylist = (track) => {
    track.Added = true;
    track.isPlaying = "disabled";

    setPlaylist((prev) => {
      //let isIncluded = prev.some((t) => t.uri === track.uri);
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: "url('/background_horizontal.jpg')",
          backgroundRepeat: "repeat", // Adjust this to control the repetition
          backgroundSize: "cover", // Cover the entire container
          minHeight: "100vh", // Ensure the container takes full viewport height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto", // Allow scrolling within the container
        }}
      >
        <Grid container justifyContent={"center"} alignItems="flex-start">
          <Grid item>
            <Typography
              variant="h1"
              pt={10}
              pb={7}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {" "}
              My Bluegrass Playlist
            </Typography>
            <Typography
              variant="h4"
              pt={7}
              pb={4}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {" "}
              My Bluegrass Playlist
            </Typography>
          </Grid>
          {accessToken ? (
            <>
              <Grid item container p={5} justifyContent={"center"}>
                <SearchBar setTrackList={setTrackList} />

                <TrackList
                  tracks={tracks}
                  updateTrackList={updateTrackList}
                  playSample={playSample}
                />

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
            </>
          ) : (
            <>
              <Grid
                item
                container
                justifyContent={"center"}
                sx={{
                  maxHeight: 100,
                  border: "2px solid #000", // Add your border style
                  borderRadius: "8px", // Add border-radius if needed
                  padding: "16px",
                  width: "80%",
                }}
              >
                <Button variant="contained" onClick={authentificate}>
                  Log In
                </Button>
              </Grid>
              <Grid
                item
                container
                xs={12}
                id="banjo"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  sx={{
                    width: 400,
                    height: 400,
                    transition: "transform 0.3s ease-in-out", // Smooth transition for transform changes
                    "&:hover": {
                      transform: "rotate(10deg)", // Tilts the image 10 degrees to the right on hover
                    },
                  }}
                  component="img"
                  src={"/banjo.svg"}
                  alt={"banjo"}
                />
              </Grid>
            </>
          )}
        </Grid>{" "}
      </Box>
    </ThemeProvider>
  );
};

export default App;
