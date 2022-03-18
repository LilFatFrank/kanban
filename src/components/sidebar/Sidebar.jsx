import { Box, Drawer, Typography } from "@mui/material";
import { useContext } from "react";
import { Sprite, ArchivedCard } from "..";
import { AppContext } from "../../context/Context";
import "./Sidebar.scss";

const Sidebar = ({ open, onClose }) => {
  const { archivedCards } = useContext(AppContext);

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
        <div className="cards">
          {archivedCards?.length ? (
            archivedCards?.map((card) => (
              <ArchivedCard
                key={card.id}
                description={card.description}
                title={card.title}
                columnId={card.column}
              />
            ))
          ) : (
            <Typography variant="body2">
              Currently, no archived cards.
            </Typography>
          )}
        </div>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
