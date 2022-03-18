import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Title, InputContainer, Card } from "..";
import "./Column.scss";

const Column = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="column-cards" {...provided.dragHandleProps}>
            <div className="title-column">
              <Title
                title={column.title}
                columnId={column.id}
                noOfCards={column.cards?.length}
              />
            </div>
            <div className="container-cards">
              <Droppable droppableId={column.id} type="task">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-container"
                  >
                    {column.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        columnId={column.id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer columnId={column.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
