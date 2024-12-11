export const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};
