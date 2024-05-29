import { Button, TextField, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Track from "./Track";

const Playlist = (props) => {
  const [uriArray, setUriArray] = useState([]);
  console.log("playlist length: ", props.playlist.length)

  useEffect(() => {
    const Array = props.playlist.map((track) => track.uri);
    setUriArray(Array);
  }, [props.playlist]);

  const resetAllAddedIcons =  () => {
    props.setTracks((prevTracks) => {
     const updatedArray = prevTracks.map((item) => ({
       
       ...item,
       Added: false,
     }));
     return updatedArray;
   });
 };

  const playlistCreation = (token, name, tracks) => {
    if (!name || tracks.length === 0) {
      if (!name) {
        alert("You must type a Playlist Name");
      } else {
        alert("No track selected in your playlist");
      }
    } else {
      props.createPlaylist(token, name, tracks);

      alert("This feature s under Spotify validation. Coming soon.");

      props.setPlaylistName("");
      props.setPlaylist([]);
      setUriArray([]);
    }

    resetAllAddedIcons()
  };

  console.log(uriArray);

  return (
    <Grid
    direction={"column"}
      xs={12}
      md={4}
      item
      container
      sx={{
        border: "2px solid #000", // Add your border style
        borderRadius: "8px", // Add border-radius if needed
        padding: "16px",

      }}
    >
      <TextField
        fullWidth={true}
        label="Your playlist Name"
        onChange={props.handleNameChange}
        value={props.playlistName}
        id="outilned-basic"
        variant="outlined"
      />

      {props.playlist.map((track, index) => (
        <Track
          key={index}
          track={track}
          Song={track.Song}
          Artist={track.Artist}
          Album={track.Album}
          Added={track.Added}
          isPlaying={track.isPlaying}
          updateTrackList={props.updateTrackList}
        />
      ))}
     {props.playlist.length > 0 && (<Box textAlign="center">
        <Button
          variant="contained"
          onClick={() => {
            playlistCreation(props.accessToken, props.playlistName, uriArray);
          }}
          sx={{ marginTop: 2, }}
        >
          {" "}
          Save  {!props.playlistName ? "Bluegrass Playlist" : props.playlistName} to Spotify
        </Button>
      </Box>)} 
    </Grid>
  );
};

export default Playlist;
