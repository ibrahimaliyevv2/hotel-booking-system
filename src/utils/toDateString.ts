export const toDateString = (date: string, dayIndex: number) => {
const startDate = new Date(date);
  const currentDate = new Date(date);
  currentDate.setDate(startDate.getDate() + dayIndex);
  const dayNum = currentDate.getDate();
  const month = currentDate.toLocaleString("en", { month: "short" });
  const year = currentDate.getFullYear();
  const dateString = `${dayNum} ${month} ${year}`;
  return dateString;
}

export const specificDate = (date: string) => {
  const startDate = new Date(date);
  const dayNum = startDate.getDate();
  const month = startDate.toLocaleString("en", { month: "short" });
  const year = startDate.getFullYear();
  const dateString = `${dayNum} ${month} ${year}`;
  return dateString;
}