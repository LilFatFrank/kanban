import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { initialState, initialArchivedState } from "../utils/Constants";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(initialState());
  const [archivedCards, setArchivedCards] = useState(initialArchivedState());

  const addMoreCard = (title, listId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title
    };

    const list = data?.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data?.lists,
        [listId]: list
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const removeCard = (index, listId, card) => {
    const list = data?.lists[listId];

    list.cards.splice(index, 1);

    const newState = {
      ...data,
      lists: {
        ...data?.lists,
        [listId]: list
      }
    };

    const archivedState = [
      ...archivedCards,
      {
        ...card,
        listId
      }
    ];

    setArchivedCards(archivedState);
    localStorage.setItem("archivedDataKanban", JSON.stringify(archivedState));
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateCardTitle = (title, index, listId) => {
    const list = data?.lists[listId];
    list.cards[index].title = title;

    const newState = {
      ...data,
      lists: {
        ...data?.lists,
        [listId]: list
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const addMoreList = (title) => {
    if (!title) {
      return;
    }

    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: []
    };
    const newState = {
      listIds: [...data?.listIds, newListId],
      lists: {
        ...data?.lists,
        [newListId]: newList
      }
    };
    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const updateListTitle = (title, listId) => {
    const list = data?.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data?.lists,
        [listId]: list
      }
    };

    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const deleteList = (listId) => {
    const lists = data?.lists;
    const listIds = data?.listIds;

    delete lists[listId];

    listIds.splice(listIds.indexOf(listId), 1);

    const newState = {
      lists: lists,
      listIds: listIds
    };

    setData(newState);
    localStorage.setItem("dataKanban", JSON.stringify(newState));
  };

  const providerValue = {
    addMoreCard,
    addMoreList,
    updateListTitle,
    removeCard,
    updateCardTitle,
    deleteList,
    data,
    setData,
    archivedCards,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
