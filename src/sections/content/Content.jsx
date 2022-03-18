import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { InputContainer, Column } from "../../components";
import { AppContext } from "../../context/Context";
import "./Content.scss";

const Content = () => {
  const { data, setData } = useContext(AppContext);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "column") {
      const newColumnIds = data?.columnIds;

      newColumnIds.splice(source.index, 1);
      newColumnIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnIds: newColumnIds
      };
      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));

      return;
    }

    const sourceColumn = data?.columns[source.droppableId];
    const destinationColumn = data?.columns[destination.droppableId];
    const draggingCard = sourceColumn.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceColumn.cards.splice(source.index, 1);
      destinationColumn.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        columns: {
          ...data?.columns,
          [sourceColumn.id]: destinationColumn
        }
      };
      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));
    } else {
      sourceColumn.cards.splice(source.index, 1);
      destinationColumn.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        columns: {
          ...data?.columns,
          [sourceColumn.id]: sourceColumn,
          [destinationColumn.id]: destinationColumn
        }
      };

      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" type="column" direction="horizontal">
        {(provided) => (
          <div
            className="wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data?.columnIds?.map((columnId, index) => {
              const column = data?.columns[columnId];

              return <Column column={column} key={columnId} index={index} />;
            })}
            <div>
              <InputContainer type="column" />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Content;
