import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const updateQuery = ({ target }) => {
    const { value } = target;
    setQuery(value);
  };

  return (
    <Grid
      xs={12}
      item
      container
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{
        border: "2px solid #000", // Add your border style
        borderRadius: "8px", // Add border-radius if needed
        padding: "16px",
        marginBottom: 4,
      }}
    >
      <Grid
        item
        container
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
          height:100,
          transition: "transform 0.3s ease-in-out", // Smooth transition for transform changes
          "&:hover": {
            transform: "rotate(10deg)", // Tilts the image 10 degrees to the right on hover
          },
        }}
        component="img"
        src={"/banjo_logo_reversed.svg"}
        alt={"banjo"}
      />
      <Grid
        xs={12}
        md={6}
        item
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <Typography
            marginBottom="10px"
            sx={{ textAlign: "center" }}
            variant="h6"
          >
            Search bluegrass covers {query && `for ${query}`}
          </Typography>
        </Grid>

        <Grid
          xs={12}
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            justifyContent={"center"}
            container
            xs={12}
            sm="auto"
            item
            sx={{ pr: { xs: 0, sm: 2 }, pb: { xs: 1, sm: 0 } }}
          >
            <TextField
              id="outlined-basic"
              label="Type Here"
              variant="outlined"
              onChange={updateQuery}
            />
          </Grid>
          <Grid
            item
            container
            sx={{ pl: { xs: 0, sm: 2 }, width: { xs: "100%", sm: "auto" } }}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              onClick={() =>
                props.setTrackList(!query ? "Come as you are" : query)
              }
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
          height:100,
          transition: "transform 0.3s ease-in-out", // Smooth transition for transform changes
          "&:hover": {
            transform: "rotate(10deg)", // Tilts the image 10 degrees to the right on hover
          },
        }}
        component="img"
        src={"/violin_logo.svg"}
        alt={"violin"}
      />
    </Grid>
  );
};

export default SearchBar;
