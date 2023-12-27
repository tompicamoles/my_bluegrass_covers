import React, { useEffect, useState } from "react";
import Track from "./Track";
import { Container, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const TrackList = (props) => {
  return (
    <>
      <Container>
        <Typography sx={{ paddingBottom: 2 }} variant="h4">
          Available tracks
        </Typography>
        {props.tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            Song={track.Song}
            Artist={track.Artist}
            Added={track.Added}
            updateTrackList={props.updateTrackList}
          />
        ))}
      </Container>
    </>
  );
};

export default TrackList;
