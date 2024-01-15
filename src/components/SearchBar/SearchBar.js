import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  backgroundColor,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const SearchBar = (props) => {
  const [query, setQuery] = useState("Blues");

  const updateQuery = ({target}) => {
   const {value} = target;
   setQuery(value)
  }

  return (
    <>
      <Typography marginBottom="10px" sx={{ textAlign: "center" }} variant="h6">
        Search songs {query}
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <TextField id="outlined-basic" label="Type Here" variant="outlined"  onChange={updateQuery} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => props.setTrackList(!query ? "blues" : query)} >Search</Button>
        </Grid>
        
      </Grid>
    </>
  );
};

export default SearchBar;
