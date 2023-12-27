import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  backgroundColor,
} from "@mui/material";
import React from "react";

const SearchBar = () => {
  return (
    <>
      
        <Typography marginBottom="10px" sx={{ textAlign: "center" }} variant="h6">
          Search a song
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item >
            <TextField
              id="outlined-basic"
              label="Type Here"
              variant="outlined"
            />
          </Grid>
          <Grid item >
            <Button variant="contained">Search</Button>
          </Grid>
        </Grid>
      
    </>
  );
};

export default SearchBar;
