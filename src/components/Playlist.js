import { Button, Container, Typography } from "@mui/material";
import React from "react";
import Track from "./Track";

const Playlist = () => {
  return (
    <>
      <Container 
        sx={{

          border: 1,
          padding: "10px",
          textAlign:"center"
        }}
      >
        <Typography sx={{paddingBottom:2}} variant="h4">Your playlist</Typography>

        <Track />

        <Button variant="contained"> Save playlist</Button>
      </Container>
    </>
  );
};

export default Playlist;
