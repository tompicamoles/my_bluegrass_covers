import { Add, PlayArrow, Remove, StopCircle } from "@mui/icons-material";
import { Divider, Grid, Typography, Box } from "@mui/material";

const Track = (props) => {
  return (
    <>
      <Box marginBottom={2}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h6">{props.Song}</Typography>
          </Grid>

          {props.isPlaying === "disabled" ? <></> :(<Grid item xs={1}>
            {props.isPlaying === false ? (
              <PlayArrow
                onClick={() => props.playSample(props.Preview, props.track)}
              ></PlayArrow>
            ) : (
              <StopCircle
                onClick={() => props.playSample(props.Preview, props.track)}
              ></StopCircle>
            )}
          </Grid>) }

          

          <Grid item xs={1}>
            {props.Added === true ? (
              <Remove onClick={() => props.updateTrackList(props.track)} />
            ) : (
              <Add onClick={() => props.updateTrackList(props.track)} />
            )}
          </Grid>
        </Grid>

        <Typography variant="subtitle1">
          {props.Artist} | {props.Album}
        </Typography>
        <Divider />
      </Box>
    </>
  );
};

export default Track;
