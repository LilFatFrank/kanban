export const archivedStorage = JSON.parse(
  localStorage.getItem("archivedDataKanban")
);
export const dataStorage = JSON.parse(localStorage.getItem("dataKanban"));

export const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    return {};
  }
};

export const initialArchivedState = () => {
  if (archivedStorage) {
    return archivedStorage;
  } else {
    return [];
  }
};
