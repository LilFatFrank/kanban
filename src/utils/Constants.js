export const data = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "Test Column",
      cards: [
        {
          id: "1",
          title: "Test Card",
          description: "Test Description",
          status: "open",
          createdDate: new Date().toLocaleDateString()
        }
      ]
    }
  },
  columnIds: ["column-1"]
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
