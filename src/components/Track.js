import { Add, Remove } from "@mui/icons-material";
import { Divider, Grid, Typography, Box } from "@mui/material";

const Track = (props) => {
  return (
    <>
      <Box key={props.key} marginBottom={2}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h6">{props.Song}</Typography>
          </Grid>
          <Grid item xs={1}>
            {(props.Added === true ? 
            <Remove onClick={() => props.updateTrackList(props.track)}/> : 
            <Add onClick={() => props.updateTrackList(props.track)} />)}
          </Grid>
        </Grid>

        <Typography variant="subtitle1">{props.Artist}</Typography>
        <Divider />
      </Box>
    </>
  );
};

export default Track;
