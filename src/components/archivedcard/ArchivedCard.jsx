import { Box, Typography } from "@mui/material";
import "./ArchivedCards.scss";

const ArchivedCard = ({ title, description, columnId }) => {
  return (
    <Box component="div" className="card">
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="body2">
        <b>From column: </b>
        {columnId}
      </Typography>
    </Box>
  );
};

export default ArchivedCard;
