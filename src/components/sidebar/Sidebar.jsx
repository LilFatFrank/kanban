import { Box, Drawer, Typography } from "@mui/material";
import { useContext } from "react";
import { Sprite, ArchivedCard } from "..";
import { AppContext } from "../../context/Context";
import "./Sidebar.scss";

const Sidebar = ({ open, onClose }) => {
  const { data, archivedCards } = useContext(AppContext);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={300} role="presentation" className="sidebar">
        <Sprite
          id="back"
          width={25}
          height={25}
          style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          onClick={onClose}
        />
        <Typography variant="h5">Archived Cards</Typography>
        <div className="cards">
          {archivedCards.map((card) => (
            <ArchivedCard
              key={card.id}
              title={card.title}
              listId={data?.lists[card.listId]?.title}
            />
          ))}
        </div>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
