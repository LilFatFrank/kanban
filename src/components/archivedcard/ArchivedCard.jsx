import { Box, Typography } from "@mui/material";
import "./ArchivedCards.scss";

const ArchivedCard = ({ title, listId }) => {
  return (
    <Box component="div" className="card">
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2">
        <b>From list: </b>
        {listId}
      </Typography>
    </Box>
  );
};

export default ArchivedCard;
