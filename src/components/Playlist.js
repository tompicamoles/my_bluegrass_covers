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
  const [playlistName, setPlaylistName] = useState("");

  const [playlistTracks, setPlaylistTracks] = useState([]);


  useEffect(() => {


    setPlaylistTracks(props.tracks.filter((track) => track.Added === true));
  }, [props.tracks]);


  const handleTextChange = ({ target }) => {
    const { value } = target;
    setPlaylistName(value);
  };

  const [uriArray, setUriArray] = useState([]);

  useEffect(() => {
    const Array = playlistTracks.map((track) => track.uri);
    setUriArray(Array);
    

  },[playlistTracks]);

  console.log(uriArray)

  return (
    <>
      <Container>
        <TextField
          fullWidth={true}
          label="Your playlist"
          onChange={handleTextChange}
          value={playlistName}
          id="outilned-basic"
          variant="outlined"
        />

        {playlistTracks.map((track, index) => (
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
          Save playlist
        </Button>
      </Container>
    </>
  );
};

export default Playlist;
