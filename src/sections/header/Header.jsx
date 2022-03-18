import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Sidebar, Sprite } from "../../components";
import { useStyles } from "../../styles/styles";
import "./Header.scss";

const Header = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={"terra-logo.png"}
            alt={"Terra Logo"}
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
            onClick={() => window.open("https://terra.money", "_blank")}
          />
          <Box
            component="div"
            className="filter"
            onClick={() => setOpenMenu(true)}
          >
            <Sprite id="hamburg" width={18} height={18} />
            <Typography variant={"subtitle1"}>Archived Cards</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
};

export default Header;
