import { createTheme } from "@mui/material/styles";
import { deepOrange, deepPurple, orange, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00897b",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    
    
    MuiContainer: {
      styleOverrides: {
        root: {
          border: "2px solid #000", // Add your border style
          borderRadius: "8px", // Add border-radius if needed
          padding: "16px", // Add padding if needed

          justifyContent: "center", // Center content horizontally
        },
      },
    },
  },
});

export default theme;
