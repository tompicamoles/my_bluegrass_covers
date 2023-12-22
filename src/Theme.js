import { Theme } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { deepOrange, deepPurple, orange, yellow } from "@mui/material/colors";


const theme = createTheme({
    palette:{
      primary: {
        main: deepOrange[800],
        dark: deepOrange[100],
      },
      secondary:yellow,
    },
    components:{
      MuiButton: {
        defaultProps:{
          disableRipple: true,
          disableElevation : true,
        },
        styleOverrides:{
          root:{
            width:"100%",
            
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          container: {
            background: deepPurple[500], // Set your background color for Grid containers
          },
        },
      },
    }

  });

export default theme