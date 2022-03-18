import { MoreVert } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import ClickOutHandler from "react-onclickout";
import { AppContext } from "../../context/Context";
import "./Title.scss";

const Title = ({ title, columnId, noOfCards }) => {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
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
            onClick={() => setOpenOptions(!openOptions)}
          >
            <MoreVert />
          </button>
          {openOptions ? (
            <ClickOutHandler
              onClickOut={(e) => {
                setOpenOptions(!openOptions);
              }}
            >
              <ul className="menu-card">
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    deleteColumn(columnId);
                  }}
                >
                  Delete column
                </li>
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpen(!open);
                  }}
                >
                  Edit column title
                </li>
              </ul>
            </ClickOutHandler>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Title;
