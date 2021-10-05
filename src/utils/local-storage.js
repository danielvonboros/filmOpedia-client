export const writeToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const readFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data === null) return null;
  return JSON.parse(data);
};

export const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
