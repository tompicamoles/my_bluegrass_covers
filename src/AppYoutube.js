//import './App.css';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  styled,
  cardActionAreaClasses,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createElement } from "react";
import { deepOrange, deepPurple, orange } from "@mui/material/colors";
import theme from "./Theme";







function App() {

  
  
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <PhotoCamera />
            <Typography variant="h6">Photo Album</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div>
            <Container
              maxWidth="sm"
              style={{ marginTop: "100px" }}
              
            >
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Photo Album
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Hello world bla bla bla bla
              </Typography>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item>
                  <Button variant="contained" color="primary">
                    See my photos
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Buy
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
