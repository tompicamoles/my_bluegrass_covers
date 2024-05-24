import React from "react";
import Track from "./Track";
import { Grid, Typography } from "@mui/material";

const TrackList = (props) => {
  return (
    <Grid xs={12} md={8} item container sx={{pr : { md: 4}, pb:{xs: 4, md: 0}}}>
      <Grid
        item
        container
        id="borders"
        direction={"column"}
        sx={{
          border: "2px solid #000", // Add your border style
          borderRadius: "8px", // Add border-radius if needed
          padding: "16px",
        }}
      >
        <Typography sx={{ paddingBottom: 2 }} variant="h4">
          Available tracks
        </Typography>
        {props.tracks.map((track, index) => (
          <Track
            key={index}
            track={track}
            Song={track.Song}
            Artist={track.Artist}
            Album={track.Album}
            Added={track.Added}
            Preview={track.Preview}
            isPlaying={track.isPlaying}
            updateTrackList={props.updateTrackList}
            playSample={props.playSample}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default TrackList;
