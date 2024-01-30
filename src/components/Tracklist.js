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
        {props.tracks.map((track,index) => (
          <Track
            key={index}
            track={track}
            Song={track.Song}
            Artist={track.Artist}
            Album={track.Album}
            Added={track.Added}
            Preview= {track.Preview}
            isPlaying={track.isPlaying}
            updateTrackList={props.updateTrackList}
            playSample={props.playSample}
           
          />
        ))}
      </Container>
    </>
  );
};

export default TrackList;
