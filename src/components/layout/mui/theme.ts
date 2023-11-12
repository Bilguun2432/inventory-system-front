import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3f50b5",
      main: "#00007c",
      dark: "#030044",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffd042",
      main: "#fdb713",
      dark: "#de8509",
      contrastText: "#000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
