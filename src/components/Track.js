import { Add } from "@mui/icons-material";
import { Divider, Grid, Typography,Box } from "@mui/material";
import React from "react";


let hardcodedTracks = [
    {
        Song: "North Country Blues",
        Artist: "Mighty Poplar",
        Added: true
    },
    {
        Song: "Hey Joe",
        Artist: "Caamp",
        Added: false

    }
]

const Track = () => {
  return (
    <>
    {hardcodedTracks.map((track) => (
        <Box marginBottom={2}>
        <Grid container>
        <Grid item xs={11}>
          <Typography variant="h6">{track.Song}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Add />
        </Grid>
      </Grid>

      <Typography variant="subtitle1">{track.Artist}</Typography>
      <Divider />
      </Box>
    ))}
      
    </>
  );
};

export default Track;
