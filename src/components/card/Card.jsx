import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import "./Card.scss";
import { AppContext } from "../../context/Context";
import { MoreVert } from "@mui/icons-material";
import { Typography } from "@mui/material";
import ClickOutHandler from "react-onclickout";

const Card = ({ card, index, columnId }) => {
  const [openTitle, setOpenTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [openDescription, setOpenDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(card.description);
  const [openOptions, setOpenOptions] = useState(false);
  const { removeCard, updateCardDetail } = useContext(AppContext);

  const handleOnBlur = (detail) => {
    updateCardDetail(
      detail,
      detail === "description" ? newDescription : newTitle,
      index,
      columnId
    );
    setOpenTitle(false);
    setOpenDescription(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="card-content">
            {openTitle ? (
              <TextareaAutosize
                type="text"
                className="input-card-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => handleOnBlur("title")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnBlur("title");
                  }
                  return;
                }}
                autoFocus
              />
            ) : openDescription ? (
              <TextareaAutosize
                type="text"
                placeholder="Description"
                className="input-card-title"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onBlur={() => handleOnBlur("description")}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnBlur("description");
                  }
                  return;
                }}
                autoFocus
              />
            ) : (
              <div className="card-details">
                <div className="card-title-container">
                  <Typography
                    variant="h6"
                    onClick={() => setOpenTitle(!openTitle)}
                  >
                    {card.title}
                  </Typography>
                  <button
                    className="card-button"
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
                            setOpenDescription(!openDescription);
                          }}
                        >
                          Change description
                        </li>
                        <li
                          onClick={() => {
                            updateCardDetail(
                              "status",
                              card.status === "open" ? "closed" : "open",
                              index,
                              columnId
                            );
                            setOpenOptions(!openOptions);
                          }}
                        >
                          Change status
                        </li>
                        <li
                          onClick={() => {
                            removeCard(index, columnId, card);
                            setOpenOptions(!openOptions);
                          }}
                        >
                          Archive card
                        </li>
                      </ul>
                    </ClickOutHandler>
                  ) : null}
                </div>
                <Typography variant="body2">
                  <b>Description:&nbsp;</b>
                  {card.description || "(empty)"}
                </Typography>
                <div className="card-title-container">
                  <Typography
                    variant="body2"
                    style={{
                      color:
                        card.status === "open" ? "var(--open)" : "var(--closed)"
                    }}
                  >
                    {card.status}
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: "right" }}>
                    {card.createdDate}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
