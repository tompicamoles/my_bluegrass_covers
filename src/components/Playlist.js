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
import { createPlaylist } from "../spotify_access_token";

const Playlist = (props) => {
  const [uriArray, setUriArray] = useState([]);

  useEffect(() => {
    const Array = props.playlist.map((track) => track.uri);
    setUriArray(Array);
  }, [props.playlist]);

  const playlistCreation = (token, name, tracks) => {
    if (!name || tracks.length === 0) {
      if (!name) {
        alert("You must type a Playlist Name");
      } else {
        alert("No track selected in your playlist");
      }
    } else {
      props.createPlaylist(token, name, tracks);

      alert("Success! Your playlist was created");

      props.setPlaylistName("");
      props.setPlaylist([]);
      setUriArray([]);
    }
  };

  console.log(uriArray);

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

        <Button
          variant="contained"
          onClick={() => {
            playlistCreation(props.accessToken, props.playlistName, uriArray);
          }}
          sx={{ marginTop: 2 }}
        >
          {" "}
          Save {!props.playlistName ? "Playlist" : props.playlistName}
        </Button>
      </Container>
    </>
  );
};

export default Playlist;
