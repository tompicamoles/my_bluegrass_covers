import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Track from "./Track";

const Playlist = (props) => {
  

  const [uriArray, setUriArray] = useState([]);

  useEffect(() => {
    const Array = props.playlist.map((track) => track.uri);
    setUriArray(Array);
    

  },[props.playlist]);

  console.log(uriArray)

  return (
    <>
      <Container>
        <TextField
          fullWidth={true}
          label="Name"
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
            updateTrackList={props.updateTrackList}
          />
        ))}

        <Button variant="contained" sx={{ marginTop: 2 }}>
          {" "}
          Save {!props.playlistName ? "Playlist" : props.playlistName}
        </Button>
      </Container>
    </>
  );
};

export default Playlist;
