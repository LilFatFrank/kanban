import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  appBar: {
    boxShadow: "none !important",
    background: "#fff !important"
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export const theme = createTheme({
  typography: {
    allVariants: {
      color: "#000"
    }
  }
});
