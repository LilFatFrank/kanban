import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Sprite } from "../../components";
import { useStyles } from "../../styles/styles";
import "./Header.scss";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={"terra-logo.png"} alt={"Terra Logo"} width={40} height={40} />
        <Box component="div" className="filter">
          <Sprite id="hamburg" width={18} height={18} />
          <Typography variant={"subtitle1"}>Menu</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
