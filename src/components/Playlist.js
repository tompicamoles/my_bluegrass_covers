import { Button, Container, Typography, Box } from "@mui/material";
import React from "react";
import Track from "./Track";

const Playlist = (props) => {
  return (
    <>
      <Container>
        <Typography sx={{ paddingBottom: 2 }} variant="h4">
          Your playlist
        </Typography>

        {props.playlistTracks.map((track) => (
          <Track
            track={track}
            Song={track.Song}
            Artist={track.Artist}
            Added={track.Added}
            updatePlaylist={props.updatePlaylist}
          />
        ))}

        <Button variant="contained"> Save playlist</Button>
      </Container>
    </>
  );
};

export default Playlist;
