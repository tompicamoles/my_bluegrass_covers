import React from "react";
import Track from "./Track";
import { Container, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const TrackList = () => {
  return (
    <>
      <Container
        sx={{
          borderColor: purple[400],
          border: 1,
          padding: "10px",
        }}
      >
        <Typography sx={{paddingBottom:2}} variant="h4">Available tracks</Typography>

        <Track />
      </Container>
    </>
  );
};

export default TrackList;
