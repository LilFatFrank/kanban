import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import "./Title.scss";

const Title = ({ title, columnId, noOfCards }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [openDialog, setOpenDialog] = useState(false);
  const { updateColumnTitle, deleteColumn } = useContext(AppContext);

  const handleOnBlur = () => {
    updateColumnTitle(newTitle, columnId);
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <div>
          <input
            type="text"
            className="input-title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onBlur={handleOnBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnBlur();
              }
              return;
            }}
            autoFocus
          />
        </div>
      ) : (
        <div className="editable-title-container">
          <h2 onClick={() => setOpen(!open)} className="editable-title">
            <span>{noOfCards}</span>
            {title}
          </h2>
          <button
            className="column-button"
            onClick={() =>
              noOfCards ? setOpenDialog(true) : deleteColumn(columnId)
            }
          >
            <Delete />
          </button>
        </div>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all column data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button
            onClick={() => deleteColumn(columnId)}
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Title;
