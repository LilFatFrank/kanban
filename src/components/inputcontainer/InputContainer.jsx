import React, { useState } from "react";
import { Collapse } from "@mui/material";
import "./InputContainer.scss";
import { InputCard } from "..";

const InputContainer = ({ columnId, type }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="input-container">
      <Collapse in={open}>
        <InputCard setOpen={setOpen} columnId={columnId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <div className="input-content">
          <button onClick={() => setOpen(!open)}>
            {type === "card" ? "+ Add Card" : "+ Add Column"}
          </button>
        </div>
      </Collapse>
    </div>
  );
};

export default InputContainer;
