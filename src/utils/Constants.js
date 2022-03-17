export const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Test List",
      cards: [
        {
          id: "1",
          title: "Test Card"
        }
      ]
    }
  },
  listIds: ["list-1"]
};

export const archivedStorage = JSON.parse(
  localStorage.getItem("archivedDataKanban")
);
export const dataStorage = JSON.parse(localStorage.getItem("dataKanban"));

export const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    localStorage.setItem("dataKanban", JSON.stringify(data));
    return data;
  }
};

export const initialArchivedState = () => {
  if (archivedStorage) {
    return archivedStorage;
  } else {
    return [];
  }
};
