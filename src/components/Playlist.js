import { Button, Container, Typography, Box } from "@mui/material";
import React from "react";
import Track from "./Track";

const Playlist = (props) => {
  const playlistTracks = props.tracks.filter((track) => track.Added === true);

  return (
    <>
      <Container>
        <Typography sx={{ paddingBottom: 2 }} variant="h4">
          Your playlist
        </Typography>

        {playlistTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            Song={track.Song}
            Artist={track.Artist}
            Added={track.Added}
            updateTrackList={props.updateTrackList}
          />
        ))}

        <Button variant="contained"> Save playlist</Button>
      </Container>
    </>
  );
};

export default Playlist;
