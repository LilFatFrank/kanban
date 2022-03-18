import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { initialState, initialArchivedState } from "../utils/Constants";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(initialState());
  const [archivedCards, setArchivedCards] = useState(initialArchivedState());

  const addMoreCard = (title, columnId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
      description: "",
      status: "open",
      createdDate: new Date().toLocaleDateString()
    };

    const column = data?.columns[columnId];
    column.cards = [newCard, ...column.cards];

    const newState = {
      ...data,
      columns: {
        ...data?.columns,
        [columnId]: column
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const removeCard = (index, columnId, card) => {
    const column = data?.columns[columnId];

    column.cards.splice(index, 1);

    const newState = {
      ...data,
      columns: {
        ...data?.columns,
        [columnId]: column
      }
    };

    const archivedState = [
      {
        ...card,
        column: data?.columns[columnId]?.title
      },
      ...archivedCards
    ];

    setArchivedCards(archivedState);
    localStorage.setItem("archivedDataKanban", JSON.stringify(archivedState));
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateCardDetail = (detail, val, index, columnId) => {
    const column = data?.columns[columnId];
    column.cards[index][detail] = val;

    const newState = {
      ...data,
      columns: {
        ...data?.columns,
        [columnId]: column
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const addMoreColumn = (title) => {
    if (!title) {
      return;
    }

    const newColumnId = uuid();
    const newColumn = {
      id: newColumnId,
      title,
      cards: []
    };
    const newState = {
      columnIds: [...data?.columnIds || [], newColumnId],
      columns: {
        ...data?.columns || {},
        [newColumnId]: newColumn
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateColumnTitle = (title, columnId) => {
    const column = data?.columns[columnId];
    column.title = title;

    const newState = {
      ...data,
      columns: {
        ...data?.columns,
        [columnId]: column
      }
    };

    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const deleteColumn = (columnId) => {
    const columns = data?.columns;
    const columnIds = data?.columnIds;

    delete columns[columnId];

    columnIds.splice(columnIds.indexOf(columnId), 1);

    const newState = {
      columns: columns,
      columnIds: columnIds
    };

    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const providerValue = {
    addMoreCard,
    addMoreColumn,
    updateColumnTitle,
    removeCard,
    updateCardDetail,
    deleteColumn,
    data,
    setData,
    archivedCards
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
