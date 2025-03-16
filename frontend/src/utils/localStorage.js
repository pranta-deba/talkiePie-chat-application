export const setDataIntoLocalStorage = (data) => {
  localStorage.setItem("chatAppUser", JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  const user = localStorage.getItem("chatAppUser");
  if (user) return JSON.parse(user);
  return null;
};

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem("chatAppUser");
};
