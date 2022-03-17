import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { InputContainer, List } from "../../components";
import { AppContext } from "../../context/Context";
import "./Content.scss";

const Content = () => {
  const { data, setData } = useContext(AppContext);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data?.listIds;

      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listIds: newListIds
      };
      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));

      return;
    }

    const sourceList = data?.lists[source.droppableId];
    const destinationList = data?.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data?.lists,
          [sourceList.id]: destinationList
        }
      };
      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data?.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      };

      setData(newState);
      localStorage.setItem("dataKanban", JSON.stringify(newState));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data?.listIds.map((listId, index) => {
              const list = data?.lists[listId];

              return <List list={list} key={listId} index={index} />;
            })}
            <div>
              <InputContainer type="list" />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Content;
